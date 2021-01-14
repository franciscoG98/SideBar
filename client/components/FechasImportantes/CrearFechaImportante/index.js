import React, { useState } from "react";
import meses from "./meses";
import Previsualizacion from "../Previsualización";
import styles from "./style";

import {
  Text,
  View,
  TextInput,
  TextField,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { getImagen, takeImagen } from "../../pickImage/pick";
import { gql, useMutation } from "@apollo/client";

export default function fecharendersImportantes({ navigation }) {
  const MUTATION = gql`
    mutation addFechasImportantes($input: FechasImportantesInput) {
      addFechasImportantes(input: $input) {
        titulo
        _id
      }
    }
  `;
  const [createTarea] = useMutation(MUTATION);
  const submit = () => {
    createTarea({
      variables: {
        input: {
          titulo: state.titulo,
          descripcion: state.descripcion,
          fecha: [`${state.fecharender}T09:00`],
          imagen: state.imagenSeleccionada,
        },
      },
    })
      .then(() => alert("Tarea Creada"))
      .then(() => navigation.navigate("FechasImportantesContainer"))
      .catch(() => alert("No se pudo crear la tarea"));
  };
  const [state, setState] = useState({
    titulo: "",
    descripcion: "",
    calendario: false,
    fecharender: "",
    imagenSeleccionada: false,
    previsualizacion: false,
  });
  function cargarImagen() {
    let result = getImagen();
    result.then((ans) => {
      return setState({
        ...state,
        imagenSeleccionada: ans,
      });
    });
  }

  return (
    <>
      {state.previsualizacion && (
        <View style={{ height: "100%", width: "100%" }}>
          <Previsualizacion
            state={state}
            close={() => setState({ ...state, previsualizacion: false })}
            show={state.previsualizacion}
          />
        </View>
      )}
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Efemérides</Text>

          <TouchableOpacity
            style={styles.boton}
            onPress={() =>
              setState({ ...state, calendario: !state.calendario })
            }
          >
            <Text style={styles.textoBoton}>
              {state.fecharender
                ? ` ${meses(state.fecharender)} `
                : "Seleccione la fecha"}
            </Text>
          </TouchableOpacity>
          {state.calendario && (
            <View style={styles.contCalendario}>
              <Calendar
                style={{ width: "100%" }}
                onDayPress={(e) =>
                  setState({
                    ...state,
                    fecharender: e.dateString,
                  })
                }
                hideExtraDays={true}
                selectedDay={state.fecharender.dateString}
                markedDates={{
                  [state.fecharender]: {
                    selected: true,
                    selectedColor: "orange",
                  },
                }}
              />
            </View>
          )}
          <View style={styles.contLabel}>
            <Text style={styles.label}>{state.titulo && "Titulo"}</Text>
          </View>
          <TextInput
            onChangeText={(e) => setState({ ...state, titulo: e })}
            placeholder="Ingrese un nombre para la fecha"
            style={styles.input}
          />
          <View style={styles.contLabel}>
            <Text style={styles.label}>
              {state.descripcion && "Descripción"}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(e) => setState({ ...state, descripcion: e })}
            numberOfLines={4}
            placeholder="Ingrese una descripción"
          />
          <TouchableOpacity style={styles.boton} onPress={cargarImagen}>
            <Text style={styles.textoBoton}>
              {state.imagenSeleccionada
                ? `Imagen seleccionada`
                : "Selecciona una imagen"}
            </Text>
          </TouchableOpacity>
          {state.imagenSeleccionada && (
            <Image
              style={styles.imagen}
              source={{
                uri: state.imagenSeleccionada,
              }}
            />
          )}
          <View style={styles.contBotones}>
            <TouchableOpacity
              style={
                !state.imagenSeleccionada ||
                !state.descripcion ||
                !state.titulo ||
                !state.fecharender
                  ? styles.botonesFinales2
                  : styles.botonesFinales
              }
              disabled={
                !state.imagenSeleccionada ||
                !state.descripcion ||
                !state.titulo ||
                !state.fecharender
              }
              onPress={() => setState({ ...state, previsualizacion: true })}
            >
              <Text style={styles.textoBoton}>Previsualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                !state.imagenSeleccionada ||
                !state.descripcion ||
                !state.titulo ||
                !state.fecharender
                  ? styles.botonesFinales2
                  : styles.botonesFinales
              }
              disabled={
                !state.imagenSeleccionada ||
                !state.descripcion ||
                !state.titulo ||
                !state.fecharender
              }
              onPress={() => submit()}
            >
              <Text style={styles.textoBoton}>Crear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
