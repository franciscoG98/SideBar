import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import setMeses from "./meses";
import BinIcon from "../../images/BinIcon";
import { gql, useMutation } from "@apollo/client";
import styles from "./style";

const MUTATION = gql`
  mutation deleteTarea($input: TareaInput) {
    deleteTarea(input: $input) {
      titulo
    }
  }
`;

const FechaSeleccionada = ({ route, navigation }) => {
  const [deleteTarea] = useMutation(MUTATION);
  let { data, fecha } = route.params;
  let array = [...data.congresos, ...data.tareas];
  let { dateString } = fecha;
  let arreglo = [];
  array.map((fecha) =>
    fecha.fecha.map(
      (dia) => dia.split("T")[0] === dateString && arreglo.push(fecha)
    )
  );

  function borrarTarea(id) {
    deleteTarea({
      variables: {
        input: {
          _id: id,
        },
      },
    })
      .then(() => alert("Tarea eliminada"))
      .then(() => navigation.goBack())
      .catch(() => alert("No se pudo eliminar la tarea"));
  }

  return (
    <View style={styles.cont}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{setMeses(fecha)}</Text>
      </View>
      <ScrollView>
        {arreglo.map((congreso) => (
          <>
            {congreso.__typename === "Tarea" ? (
              <View key={congreso._id} style={styles.card2}>
                <View style={styles.column}>
                  <Text style={styles.titulo}>{congreso.titulo}</Text>
                  <Text style={styles.descripcion}>{congreso.descripcion}</Text>
                </View>
                <TouchableOpacity
                  style={styles.tacho}
                  onPress={() => borrarTarea(congreso._id)}
                >
                  <BinIcon name="new" color="grey" size="32" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                key={congreso._id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("Detail", { id: congreso._id })
                }
              >
                <View style={styles.column}>
                  <Text style={styles.titulo}>{congreso.titulo}</Text>
                  <Text style={styles.descripcion}>{congreso.descripcion}</Text>
                </View>
              </TouchableOpacity>
            )}
          </>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.agregarTarea}
        onPress={() => navigation.navigate("AgregarTarea", { fecha: fecha })}
      >
        <Text style={styles.textoAdd}>Agregar Tarea</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FechaSeleccionada;
