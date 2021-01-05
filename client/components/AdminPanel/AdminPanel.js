import React from "react";
import styled from "styled-components/native";
import { View, Text, StyleSheet } from "react-native";
import Header from "../Header/Header";

const Boton = styled.TouchableOpacity`
  border-radius: 20px;
  color: palevioletred;
  text-align: center;
  background-color: white;
  margin: 5px;
  margin-right: 5%;
  margin-left: 5%;
  width: 90%;
  height: 50px;
`;

export default function AdminPanel({ navigation }) {
  return (
    <View>
      <Header />
      <Text style={styles.titulo}> Administrador </Text>
      <View style={styles.container}>
        <Boton onPress={() => navigation.navigate("UserPromote")}>
          <Text style={styles.text}>Cambiar rol de usuarios</Text>
        </Boton>

        <Boton onPress={() => navigation.navigate("CreateEvent")}>
          <Text style={styles.text}>Crear congreso</Text>
        </Boton>

        <Boton onPress={() => navigation.navigate("DeleteEditEvent")}>
          <Text style={styles.text}>Eliminar/Editar Congresos</Text>
        </Boton>

        <Boton onPress={() => navigation.navigate("createLinks")}>
          <Text style={styles.text}>Crear links</Text>
        </Boton>

        <Boton
          onPress={() => navigation.navigate("InterestLinks", { admin: true })}
        >
          <Text style={styles.text}>Eliminar/Editar Links</Text>
        </Boton>

        {/* <Answers  onPress={() => navigation.navigate("UserPromote")} >
        <Text style={styles.text}>Respuestas</Text>
      </Answers> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "96%",
    height: "75%",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
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
    /* backgroundColor: "blue",*/

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
    color: "grey",
    fontSize: 15,
    flex: 2,
    textAlign: "center",
    textAlignVertical: "center",
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
