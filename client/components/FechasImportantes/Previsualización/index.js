import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import meses from "../CrearFechaImportante/meses";
import CompartirIcon from "../../images/CompartirIcon";
import styles from "./style";

export default function Previsualizacion({ show, close, state }) {
  const handleClose = () => {
    close && close();
  };
  if (!show) return null;
  return (
    <View style={styles.contcont}>
      <View style={styles.container}>
        <View style={styles.imgCont}>
          <Image
            style={styles.imagen}
            source={{ uri: state.imagenSeleccionada }}
          />
        </View>
        <TouchableOpacity style={styles.icon}>
          <CompartirIcon height="20" width="20" fill="lightblue" />
        </TouchableOpacity>
        <View style={styles.fechaCont}>
          <Text style={styles.fecha}>{meses(state.fecharender)}</Text>
        </View>
        <View style={styles.tituloCont}>
          <Text style={styles.titulo}>{state.titulo}</Text>
        </View>

        <View style={styles.descCont}>
          <ScrollView>
            <Text style={styles.descripcion}>{state.descripcion}</Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.contBotones}
          onPress={() => handleClose()}
        >
          <Text style={styles.text}>{"Volver"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
