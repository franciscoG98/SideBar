import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CalendarList } from "react-native-calendars";
import { gql, useQuery } from "@apollo/client";
import { LocaleConfig } from "react-native-calendars";
import idioma from "./idioma";

LocaleConfig.locales["es"] = idioma;
LocaleConfig.defaultLocale = "es";

export default function Calendario({ navigation }) {
  const QUERY = gql`
    query congresos {
      congresos(where: { publicado: true }) {
        _id
        titulo
        fecha
        descripcion
      }
      tareas {
        titulo
        _id
        fecha
        color
        descripcion
      }
    }
  `;
  const [tareas, setTareas] = useState({});
  const obj = {};
  let obj2;

  const fetching = () => {
    const { data, error, refetch } = useQuery(QUERY);
    refetch();
    if (error) return error;
    if (data) {
      obj2 = data;

      data.tareas.map((tareas) => {
        tareas.fecha.map((dias, i) => {
          let [dia, hora] = dias.split("T");
          obj[dia] = {
            ...obj[dia],
            hora,
            items: [tareas.titulo],
            marked: true,
            dotColor: tareas.color || "red",
          };
        });
      });
      data.congresos.map((congreso) => {
        congreso.fecha.map((dias, i) => {
          let [dia, hora] = dias.split("T");
          obj[dia] = {
            ...obj[dia],
            hora,
            color: "lightblue",
            items: [congreso.titulo],
            startingDay: i === 0,
            endingDay: i === congreso.fecha.length - 1,
          };
        });
      });
    }
  };
  fetching();

  const seteo = (dia) => {
    return navigation.navigate("FechaSeleccionada", {
      data: obj2,
      fecha: dia,
    });
  };
  return (
    <>
      <CalendarList
        onDayPress={(e) => seteo(e)}
        hideExtraDays={true}
        onDayLongPress={(e) =>
          navigation.navigate("AgregarTarea", { fecha: e })
        }
        selected={Date()}
        items={tareas}
        markingType={"period"}
        markedDates={obj}
        theme={{
          calendarBackground: "white",
          agendaKnobColor: "#7C88D5",
          selectedDayTextColor: "#7C88D5",
          dayTextColor: "black",
        }}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          height: "97%",
        }}
        theme={{
          todayTextColor: "#00adf5",
        }}
      />
    </>
  );
}
