import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { AppLoading } from "expo";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import Header from "../../Header/Header";
import BackIcon from "../../images/BackIcon";
import BinIcon from "../../images/BinIcon";
import NewIcon from "../../images/NewIcon";

const QUERY = gql`
  query congresos {
    congresos(where: { publicado: true }) {
      _id
      titulo
      fecha
      ubicacion
      descripcion
      imagen
    }
  }
`;

const MUTATION = gql`
  mutation deleteCongreso($input: CongresoInput) {
    deleteCongreso(input: $input) {
      titulo
    }
  }
`;

export default function DeleteEvent({ navigation }) {
  const { loading, data, error, refetch } = useQuery(QUERY);

  const [deleteEvent] = useMutation(MUTATION);

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else if (loading) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <Header></Header>
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.buttonSend}
            onPress={() => navigation.goBack()}
          >
            <BackIcon color="grey" size="32" />
          </TouchableOpacity>
          <Text style={styles.title}> Eliminar/Editar Congreso </Text>
        </View>
        <ScrollView style={styles.scroll}>
          {data.congresos.map((congreso) => (
            <View key={congreso._id} style={styles.container}>
              <View>
                <Text style={styles.titulo}>{congreso.titulo}</Text>
              </View>
              <View style={styles.buttonCont}>
                <TouchableOpacity
                  style={styles.buttonSend}
                  onPress={async () => {
                    await deleteEvent({
                      variables: {
                        input: {
                          _id: congreso._id,
                        },
                      },
                    })
                      .then((ans) => alert("Congreso eliminado"))
                      .catch((err) => alert(err));
                    refetch();
                  }}
                >
                  <BinIcon
                    name="new"
                    color="grey"
                    size="32"
                    style={{
                      marginLeft: 40,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonSend}
                  onPress={() => {
                    navigation.navigate("EditEvent", { id: congreso._id });
                  }}
                >
                  <NewIcon
                    name="new"
                    color="grey"
                    size="32"
                    style={{
                      marginLeft: 40,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
  },
  scroll: {
    width: "96%",
    height: "70%",
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: 30,
    padding: 17,
  },
  buttonText1: {
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
    color: "#7C88D5",
  },
  titulo1: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    marginBottom: 10,
    color: "#dedede",
  },
  titulo: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    marginBottom: 10,
    color: "#454444",
  },
  titulo2: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
    color: "#7C88D5",
  },
  text: {
    fontFamily: "Roboto_100Thin",
    width: "100%",
    color: "#454444",
  },
  buttonCont: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "powderblue",
    borderRadius: 45,
    height: 28,
    width: 28,
    marginTop: 5,
    marginBottom: 25,
    display: "flex",
    marginLeft: "40%",
    textAlign: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginLeft: 10,
    marginBottom: 15,
    fontFamily: "Roboto_500Medium",
    backgroundColor: "#7C88D5",
    color: "white",
    padding: 5,
    width: 80,
    textAlign: "center",
    borderRadius: 10,
  },
  container: {
    fontFamily: "Roboto_500Medium",
    flex: 1,
    padding: 15,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    borderColor: "#f5f2f2",
    borderWidth: 1,
    margin: 5,
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 25,
    color: "grey",
  },
});
