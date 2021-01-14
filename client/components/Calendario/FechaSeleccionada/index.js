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
  let array = [...data.congresos, ...data.tareas, ...data.fechasImportantes];
  let { dateString } = fecha;
  let arreglo = [];
  array.map((fecha) =>
    fecha.fecha.map(
      (dia) => dia.split("T")[0] === dateString && arreglo.push(fecha)
    )
  );

  let key = 0;
  function setId() {
    key = key + 1;
    return key;
  }
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
      <View style={styles.contTareas}>
        <ScrollView>
          {arreglo.map((congreso) => (
            <View key={setId()}>
              {congreso.__typename === "Tarea" ? (
                <View style={styles.card2}>
                  <View style={styles.column}>
                    <Text style={styles.titulo}>{congreso.titulo}</Text>
                    <Text style={styles.descripcion}>
                      {congreso.descripcion}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.tacho}
                    onPress={() => borrarTarea(congreso._id)}
                  >
                    <BinIcon name="new" color="grey" size="32" />
                  </TouchableOpacity>
                </View>
              ) : congreso.__typename === "FechasImportantes" ? (
                <TouchableOpacity
                  style={styles.card1}
                  onPress={() =>
                    navigation.navigate("FechasImportantesCard", {
                      id: congreso._id,
                      titulo: congreso.titulo,
                      fecha: congreso.fecha,
                      descripcion: congreso.descripcion,
                      imagen: congreso.imagen,
                    })
                  }
                >
                  <View style={styles.column}>
                    <Text style={styles.titulo}>{congreso.titulo}</Text>
                    <Text style={styles.descripcion}>
                      {congreso.descripcion}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("Detail", { id: congreso._id })
                  }
                >
                  <View style={styles.column}>
                    <Text style={styles.titulo}>{congreso.titulo}</Text>
                    <Text style={styles.descripcion}>
                      {congreso.descripcion}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
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
