import React, { useEffect, useState } from "react";
import meses from "./meses";
import Previsualizacion from "../Previsualización";
import styles from "./style";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Loading,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { getImagen, takeImagen } from "../../pickImage/pick";
import { gql, useMutation, useQuery } from "@apollo/client";

const MUTATION = gql`
  mutation updateFechasImportantes($input: FechasImportantesInput) {
    updateFechasImportantes(input: $input) {
      titulo
    }
  }
`;
export default function EditFechasImportantes({ navigation, route }) {
  const [dataState, setDataState] = useState({ gabi: "" });
  const [updateFechasImportantes] = useMutation(MUTATION);
  const { id, titulo, fecha, descripcion, imagen } = route.params;

  /*   const QUERY = gql`
    query fechasImportantes($id: JSON) {
      fechasImportantes(where: { _id: $id }) {
        titulo
        descripcion
        fecha
        imagen
      }
    }
  `;

  const { data, loading, refetch } = useQuery(QUERY, {
    variables: { id: id },
  }); */
  useEffect(() => {
    setDataState({
      calendario: false,
      imagenSeleccionada: imagen,
      previsualizacion: false,
      titulo: titulo,
      descripcion: descripcion,
      fecha: fecha,
      imagen: imagen,
      fecharender: fecha[0].split("T")[0],
    });
  }, []);

  function cargarImagen() {
    let result = getImagen();
    result.then((ans) => {
      return setDataState({
        ...dataState,
        imagenSeleccionada: ans,
      });
    });
  }
  return (
    <>
      {dataState.previsualizacion && (
        <View style={{ height: "100%", width: "100%" }}>
          <Previsualizacion
            state={dataState}
            close={() =>
              setDataState({ ...dataState, previsualizacion: false })
            }
            show={dataState.previsualizacion}
          />
        </View>
      )}
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Efemérides</Text>

          <TouchableOpacity
            style={styles.boton}
            onPress={() =>
              setDataState({ ...dataState, calendario: !dataState.calendario })
            }
          >
            <Text style={styles.textoBoton}>
              {dataState.fecharender
                ? ` ${meses(dataState.fecharender)} `
                : "Seleccione la fecha"}
            </Text>
          </TouchableOpacity>
          {dataState.calendario && (
            <View style={styles.contCalendario}>
              <Calendar
                style={{ width: "100%" }}
                onDayPress={(e) =>
                  setDataState({
                    ...dataState,
                    fecharender: e.dateString,
                  })
                }
                hideExtraDays={true}
                selectedDay={dataState.fecharender.dateString}
                markedDates={{
                  [dataState.fecharender]: {
                    selected: true,
                    selectedColor: "orange",
                  },
                }}
              />
            </View>
          )}
          <View style={styles.contLabel}>
            <Text style={styles.label}>{dataState.titulo && "Titulo"}</Text>
          </View>
          <TextInput
            onChangeText={(e) => setDataState({ ...dataState, titulo: e })}
            placeholder="Ingrese un nombre para la fecha"
            value={dataState.titulo}
            style={styles.input}
          />
          <View style={styles.contLabel}>
            <Text style={styles.label}>
              {dataState.descripcion && "Descripción"}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            value={dataState.descripcion}
            onChangeText={(e) => setDataState({ ...dataState, descripcion: e })}
            numberOfLines={4}
            placeholder="Ingrese una descripción"
          />
          <TouchableOpacity style={styles.boton} onPress={cargarImagen}>
            <Text style={styles.textoBoton}>
              {dataState.imagenSeleccionada
                ? `Imagen seleccionada`
                : "Selecciona una imagen"}
            </Text>
          </TouchableOpacity>
          {dataState.imagenSeleccionada && (
            <Image
              style={styles.imagen}
              source={{
                uri: dataState.imagenSeleccionada,
              }}
            />
          )}
          <View style={styles.contBotones}>
            <TouchableOpacity
              style={
                !dataState.imagenSeleccionada ||
                !dataState.descripcion ||
                !dataState.titulo ||
                !dataState.fecharender
                  ? styles.botonesFinales2
                  : styles.botonesFinales
              }
              disabled={
                !dataState.imagenSeleccionada ||
                !dataState.descripcion ||
                !dataState.titulo ||
                !dataState.fecharender
              }
              onPress={() =>
                setDataState({ ...dataState, previsualizacion: true })
              }
            >
              <Text style={styles.textoBoton}>Previsualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                !dataState.imagenSeleccionada ||
                !dataState.descripcion ||
                !dataState.titulo ||
                !dataState.fecharender
                  ? styles.botonesFinales2
                  : styles.botonesFinales
              }
              disabled={
                !dataState.imagenSeleccionada ||
                !dataState.descripcion ||
                !dataState.titulo ||
                !dataState.fecharender
              }
              onPress={() =>
                updateFechasImportantes({
                  variables: {
                    input: {
                      _id: id,
                      titulo: dataState.titulo,
                      descripcion: dataState.descripcion,
                      fecha: [`${dataState.fecharender}T09:00`],
                      imagen: dataState.imagenSeleccionada,
                    },
                  },
                })
                  .then(() => setDataState(""))
                  .then(() => alert("Editado"))
                  .then(() => navigation.goBack())
              }
            >
              <Text style={styles.textoBoton}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
