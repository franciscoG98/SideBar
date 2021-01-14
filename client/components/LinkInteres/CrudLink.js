import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import { gql, useMutation } from "@apollo/client";
import Header from "../Header/Header";
import BackIcon from "../images/BackIcon";
import { ScrollView } from "react-native-gesture-handler";

const MUTATION = gql`
  mutation addLink($input: LinkInput) {
    addLink(input: $input) {
      link
      titulo
      descripcion
    }
  }
`;

export default function createLinks({ navigation }) {
  const [createLink, { loading, data, error, refetch }] = useMutation(MUTATION);
  let mutation = (values) => {
    console.log(values);
    createLink({
      variables: {
        input: {
          titulo: values.titulo,
          descripcion: values.descripcion,
          link: values.link,
        },
      },
    })
      .then((ans) => {
        alert("Link creado");
      })
      .catch((err) => alert(err));
  };

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon color="grey" size="32" />
          </TouchableOpacity>
          <Text style={styles.title}> Crear Link </Text>
        </View>

        <Formik
          initialValues={{
            titulo: "",
            descripcion: "",
            link: "",
          }}
          onSubmit={(values) => mutation(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>
              <View style={styles.inputGroup}>
                <Text style={styles.titulo}>Título</Text>
                <TextInput
                  placeholder="Título"
                  name="titulo"
                  onBlur={handleBlur("titulo")}
                  onChangeText={handleChange("titulo")}
                  value={values.titulo}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.titulo}>Descripción</Text>
                <TextInput
                  placeholder="Descripción"
                  name="descripcion"
                  onBlur={handleBlur("descripcion")}
                  onChangeText={handleChange("descripcion")}
                  value={values.descripcion}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.titulo}>URL Link</Text>
                <TextInput
                  placeholder="Url Link"
                  name="link"
                  onBlur={handleBlur("link")}
                  onChangeText={handleChange("link")}
                  value={values.link}
                />
              </View>
              <View style={styles.div}>
                <TouchableOpacity
                  style={styles.buttonText1}
                  onPress={(e) => handleSubmit(e)}
                >
                  <Text style={styles.texto}>Crear</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
  },
  container: {
    height: "70%",
    fontFamily: "Roboto_400Regular",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#f5f2f2",
    borderRadius: 20,
  },

  titulo: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: "#7C88D5",
  },

  inputGroup: {
    /*flex: 1,*/
    padding: 5,
    /*marginLeft: 5,
    marginRight: 5,*/
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
  },

  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 25,
    color: "grey",
  },
  buttonText1: {
    fontFamily: "Roboto_500Medium",
    backgroundColor: "#7C88D5",
    padding: 8,
    width: 150,
    textAlign: "center",
    borderRadius: 10,
    height: 35,
    textAlign: "center",
    margin: 10,
  },
  texto: {
    color: "white",
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    textAlign: "center",
  },
  div: {
    alignItems: "center",
  },
});
