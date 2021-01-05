import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import BackIcon from "../images/BackIcon";
import Header from "../Header/Header";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";

export default function UserPromote({ navigation }) {
  const [search, setSearch] = useState("");

  const bool = {};

  const QUERY = gql`
    query usuarios($where: JSON) {
      usuarios(where: $where) {
        nombre
        apellido
        especialidad
        laboratorio
        imagen
        _id
        rol
        email
      }
    }
  `;
  const MUTATION = gql`
    mutation updateUsuario($input: UsuarioInput) {
      updateUsuario(input: $input) {
        nombre
        apellido
        rol
      }
    }
  `;

  const { loading, data, refetch } = useQuery(QUERY, {
    variables: {
      where: {
        $or: [{ rol: "User" }, { rol: "Mod" }],
        nombre: { $regex: `.*${search}.*` },
      },
    },
  });

  const [updateUsuario, {}] = useMutation(MUTATION);

  let mutation = (value, id) => {
    updateUsuario({
      variables: {
        input: {
          _id: id,
          rol: value,
        },
      },
    }).catch((err) => alert(err));
  };

  const handleValueChange = (id) => {
    bool[id] == true ? mutation("User", id) : mutation("Mod", id);
    refetch();
  };

  return (
    <>
      <View>
        <Header></Header>
        <Text style={styles.title}>Rol de Usuarios</Text>
        <View style={styles.inputCont}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.goBack()}
          >
            <BackIcon name="back" color="grey" size="24" />
          </TouchableOpacity>
          <TextInput
            placeholder="Buscar..."
            onChangeText={(search) => setSearch(search)}
            value={search}
            style={{
              height: 35,
              borderColor: "#c4c4c4",
              borderRadius: 20,
              borderWidth: 1,
              flex: 7,
              color: "#c4c4c4",
              paddingLeft: 20,
              marginBottom: 50,
            }}
          />
        </View>
        <View style={styles.container}>
          <ScrollView style={styles.scroll2}>
            {data && data.usuarios
              ? data.usuarios.map((usuario) => (
                  <View key={usuario._id}>
                    {(bool[usuario._id] = usuario.rol === "Mod")}
                    <View style={styles.eventContainer}>
                      <View style={styles.imgContainer}>
                        <Image
                          source={usuario.imagen}
                          style={styles.image}
                        ></Image>
                      </View>

                      <View style={styles.eventDetail}>
                        <Text style={styles.titulo}>
                          {usuario.nombre + " " + usuario.apellido}
                        </Text>

                        <Text style={styles.text}>
                          {usuario.especialidad + " - " + usuario.laboratorio}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.text2}>{usuario.rol}</Text>

                        <Switch
                          value={bool[usuario._id]}
                          style={{ marginRight: 13, marginBottom: 8 }}
                          onValueChange={() => handleValueChange(usuario._id)}
                        />
                      </View>
                    </View>
                  </View>
                ))
              : null}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "96%",
    display: "flex",
    borderWidth: 1,
    borderColor: "#f5f2f2",
    borderRadius: 20,
    marginTop: 10,
    marginLeft: "2%",
    marginRight: "2%",
    lineHeight: 800,
  },
  inputCont: {
    marginTop: 30,
    marginLeft: "10%",
    marginRight: "10%",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    marginTop: 5,
  },
  scroll2: {
    width: "96%",
    height: "65%",
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: 30,
    padding: 17,
    marginTop: 10,
  },
  iconContainer: {
    justifyContent: "center",
    flex: 1,
    width: 30,
    height: 30,
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
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
    color: "white",
    flex: 1,
  },
  text: {
    fontFamily: "Roboto_100Thin",
    width: "100%",
    color: "white",
    fontSize: 10,
    flex: 2,
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
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 25,
    color: "grey",
    marginLeft: 20,
    marginTop: 20,
  },
});
