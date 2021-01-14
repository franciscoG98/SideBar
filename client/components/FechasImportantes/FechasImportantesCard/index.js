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

export default function FechasImportantesCard({ navigation, route }) {
  const { id, titulo, fecha, descripcion, imagen } = route.params;
  return (
    <View style={styles.contcont}>
      <View style={styles.container}>
        <View style={styles.imgCont}>
          <Image style={styles.imagen} source={{ uri: imagen }} />
        </View>
        <View style={styles.fechaCont}>
          <Text style={styles.fecha}>{meses(fecha[0].split("T")[0])}</Text>
        </View>
        <View style={styles.tituloCont}>
          <Text style={styles.titulo}>{titulo}</Text>
        </View>
        <View style={styles.descCont}>
          <ScrollView>
            <Text style={styles.descripcion}>{descripcion}</Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.contBotones}
          onPress={() => navigation.goBack()}
        >
          <CompartirIcon height="20" width="20" fill="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
