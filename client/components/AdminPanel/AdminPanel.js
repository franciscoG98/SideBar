import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../Header/Header";
import useUser from "../Users/useUser";
import firebase from "firebase/app";
import "firebase/auth";

const Boton = styled.TouchableOpacity`
  border-radius: 20px;
  color: palevioletred;
  text-align: center;
  background-color: white;
  margin: 5px;
  margin-right: 5%;
  margin-left: 5%;
  margin-bottom: 1%;
  width: 90%;
  height: 50px;
`;
const Bot = styled.TouchableOpacity`
  border-radius: 20px;
  color: palevioletred;
  text-align: center;
  background-color: transparent;
  margin: 5px;
  margin-right: 5%;
  margin-left: 5%;
  margin-bottom: 1%;
  width: 90%;
  height: 50px;
`;

export default function AdminPanel({ navigation }) {
  const { user, setUser, setUserDB, userDB } = useUser();

  useEffect(() => {
    const unsuscribe = firebase
      .auth()
      .onAuthStateChanged((user) => setUser(user));
    return () => unsuscribe();
  }, [setUser]);

  /* console.log("Administrador", userDB); */
  return (userDB && userDB.usuarios[0].rol === "Owner") ||
    (userDB && userDB.usuarios[0].rol === "Mod") ? (
    <View>
      <Header />
      <Text style={styles.titulo}> Menu de Administrador </Text>
      <ScrollView style={styles.container}>
        <Boton onPress={() => navigation.navigate("UserPromote")}>
          <Text style={styles.text}>Cambiar rol de usuarios</Text>
        </Boton>
        <Boton onPress={() => navigation.navigate("EditUser")}>
          <Text style={styles.text}>Cambiar mis datos</Text>
        </Boton>
        <Boton onPress={() => navigation.navigate("EditLogin")}>
          <Text style={styles.text}>Cambiar mi password</Text>
        </Boton>
        <Boton onPress={() => navigation.navigate("CreateEvent")}>
          <Text style={styles.text}>Crear congreso</Text>
        </Boton>

        <Boton onPress={() => navigation.navigate("DeleteEditEvent")}>
          <Text style={styles.text}>Eliminar/Editar Congresos</Text>
        </Boton>

        <Boton onPress={() => navigation.navigate("createLinks")}>
          <Text style={styles.text}>Crear Links</Text>
        </Boton>
        <Boton
          onPress={() =>
            navigation.navigate("FechasImportantesContainer", { admin: true })
          }
        >
          <Text style={styles.text}>Efemérides</Text>
        </Boton>
        <Boton
          onPress={() => navigation.navigate("InterestLinks", { admin: true })}
        >
          <Text style={styles.text}>Eliminar Links</Text>
        </Boton>
        <Boton
          onPress={() => navigation.navigate("Respuestas", { admin: true })}
        >
          <Text style={styles.text}>Responder Consultas</Text>
        </Boton>
        <Boton
          onPress={() => {
            setUser(undefined);
            setUserDB(undefined);
            firebase.auth().signOut();
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.text}>Cerrar Sesión</Text>
        </Boton>
        <Bot></Bot>
      </ScrollView>
    </View>
  ) : (
    <View>
      <Header />
      <Text style={styles.titulo}> Menu de Usuario </Text>
      <View style={styles.container}>
        <Boton onPress={() => navigation.navigate("EditUser")}>
          <Text style={styles.text}>Cambiar mis datos</Text>
        </Boton>
        <Boton onPress={() => navigation.navigate("EditLogin")}>
          <Text style={styles.text}>Cambiar mi password</Text>
        </Boton>
        <Boton
          onPress={() => {
            setUser(undefined);
            setUserDB(undefined);
            firebase.auth().signOut();
          }}
        >
          <Text style={styles.text}>Cerrar Sesión</Text>
        </Boton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "96%",
    height: "71%",
    display: "flex",
    borderWidth: 1,
    borderColor: "#f5f2f2",
    borderRadius: 20,
    marginTop: 10,
    paddingTop: 20,
    marginLeft: "2%",
    marginRight: "2%",
    lineHeight: 800,
    textAlign: "center",
    backgroundColor: "#7C88D5",
    paddingBottom: 100,
    paddingTop: 30,
  },

  scroll2: {
    width: "96%",
    height: 470,
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: 30,
    padding: 17,
  },
  iconContainer: {
    justifyContent: "center",
    flex: 1,
  },
  eventContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#f5f2f2",
    borderRadius: 20,
    backgroundColor: "#7C88D5",
  },
  eventDetail: {
    flex: 4,
    flexWrap: "wrap",
    paddingTop: 10,
    paddingLeft: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexWrap: "wrap",
    paddingRight: 10,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    height: 40,
    width: 40,
    borderRadius: 70,
    marginRight: 15,
    margin: 7,
  },
  titulo: {
    fontFamily: "Roboto_500Medium",
    fontSize: 28,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    color: "grey",
  },
  text: {
    fontFamily: "Roboto_400Regular",
    width: "100%",
    color: "#7C88D5",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    padding: 10,
  },
  text2: {
    fontFamily: "Roboto_100Thin",
    width: "100%",
    color: "white",
    fontSize: 10,
    flex: 1,
    marginTop: 9,
    marginRight: 5,
  },
});
