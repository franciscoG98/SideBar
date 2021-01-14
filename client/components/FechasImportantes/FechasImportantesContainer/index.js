import React, { useState } from "react";
import styles from "./style";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { AppLoading } from "expo";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { gql, useQuery, useMutation } from "@apollo/client";
import meses from "../CrearFechaImportante/meses";
import NewIcon from "../../images/NewIcon";
import BinIcon from "../../images/BinIcon";
import Pencil from "../../images/Pencil";
import { QUERY, MUTATION, IMAGE } from "./constantes";

const FechasImportantesContainer = ({ navigation }) => {
  let contenido;
  let ref;
  function fetching() {
    const { data, refetch } = useQuery(QUERY);
    refetch();
    ref = refetch();
    return (contenido = data);
  }
  fetching();

  const [deleteFechasImportantes, {}] = useMutation(MUTATION);
  function deleteFecha(id) {
    deleteFechasImportantes({
      variables: {
        input: {
          _id: id,
        },
      },
    })
      .then(() => alert("Borrado"))
      .then(() => ref())
      .catch(() => alert("No se pudo borrar"));
  }

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <View style={styles.total}>
        <View style={styles.row}>
          <Text style={styles.title}>Efemérides</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CrearFechaImportante")}
          >
            <Pencil style={styles.title} color="lightblue" size="30" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.contFechas}>
            {contenido &&
              contenido.fechasImportantes.map((fechaImp) => (
                <View key={fechaImp._id} style={styles.tarjeta}>
                  <View style={styles.botones}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("EditarFechaImportante", {
                          id: fechaImp._id,
                          titulo: fechaImp.titulo,
                          fecha: fechaImp.fecha,
                          descripcion: fechaImp.descripcion,
                          imagen: fechaImp.imagen,
                        })
                      }
                    >
                      <NewIcon color="grey" size="28" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        deleteFecha(fechaImp._id);
                      }}
                    >
                      <BinIcon color="grey" size="28" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("FechasImportantesCard", {
                        id: fechaImp._id,
                        titulo: fechaImp.titulo,
                        fecha: fechaImp.fecha,
                        descripcion: fechaImp.descripcion,
                        imagen: fechaImp.imagen,
                      })
                    }
                    style={styles.eventContainer}
                  >
                    <View style={styles.eventDetail}>
                      <Text style={styles.text}>
                        {meses(fechaImp.fecha[0].split("T")[0])}
                      </Text>
                      <Text style={styles.titulo}>{fechaImp.titulo}</Text>
                      <Text style={styles.text}>
                        {`${fechaImp.descripcion.slice(0, 30)}...`}
                      </Text>
                    </View>
                    <View style={styles.eventImg}>
                      <Image
                        style={styles.image}
                        source={
                          fechaImp.imagen
                            ? { uri: `${fechaImp.imagen} ` }
                            : IMAGE
                        }
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    );
};

export default FechasImportantesContainer;
