import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AppLoading } from "expo";
import { Formik } from "formik";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { getImagen, takeImagen } from "../../pickImage/pick";
import Header from "../../Header/Header";
import BackIcon from "../../images/BackIcon";

const MUTATION = gql`
  mutation updateCongreso($input: CongresoInput) {
    updateCongreso(input: $input) {
      titulo
    }
  }
`;
const QUERY = gql`
  query congreso($id: JSON) {
    congreso(id: $id) {
      _id
      titulo
      fecha
      ubicacion
      descripcion
      imagen
      especialidad
    }
  }
`;
export default function EditEvent({ navigation, route }) {
  const [editCongreso] = useMutation(MUTATION);

  const { loading, data, error, refetch } = useQuery(QUERY, {
    variables: route.params,
  });

  let cargaImagen;
  let mutation = (values) => {
    editCongreso({
      variables: {
        input: {
          _id: route.params.id,
          titulo: values.titulo,
          descripcion: values.descripcion,
          ubicacion: values.ubicacion,
          fecha: [values.fecha],
          especialidad: [values.especialidad],
          imagen: cargaImagen,
          publicado: true,
        },
      },
    })
      .then(() => {
        alert("Cambios realizados");
      })
      .then(() => navigation.goBack())
      .catch((err) => alert(err));
  };
  function cargarImagen() {
    let result = getImagen();
    result.then((res) => {
      cargaImagen = res;
    });
  }

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
          <Text style={styles.title}> Editar congreso </Text>
        </View>
        <View style={styles.container}>
          <Formik
            initialValues={{
              titulo: data.congreso.titulo,
              descripcion: data.congreso.descripcion,
              ubicacion: data.congreso.ubicacion,
              especialidad: data.congreso.especialidad[0],
              fecha: data.congreso.fecha[0],
            }}
            onSubmit={(values) => mutation(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <ScrollView style={styles.scroll}>
                <View style={styles.inputGroup}>
                  <Text>Titulo</Text>
                  <TextInput
                    style={styles.texto2}
                    onChangeText={handleChange("titulo")}
                    onBlur={handleBlur("titulo")}
                    value={values.titulo}
                    placeholder="Título"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text>Descripción</Text>
                  <TextInput
                    style={styles.texto2}
                    onChangeText={handleChange("descripcion")}
                    onBlur={handleBlur("descripcion")}
                    value={values.descripcion}
                    placeholder="Descripción"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text>Ubicacion</Text>
                  <TextInput
                    style={styles.texto2}
                    onChangeText={handleChange("ubicacion")}
                    onBlur={handleBlur("ubicacion")}
                    value={values.ubicacion}
                    placeholder="Ubicación"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text>Especialidad</Text>
                  <TextInput
                    style={styles.texto2}
                    onChangeText={handleChange("especialidad")}
                    onBlur={handleBlur("especialidad")}
                    value={values.especialidad}
                    placeholder="Especialidad"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text>Fechas</Text>
                  <TextInput
                    style={styles.texto2}
                    onChangeText={handleChange("fecha")}
                    onBlur={handleBlur("fecha")}
                    value={values.fecha}
                    placeholder="Fechas"
                  />
                </View>
                <View style={styles.buttonCont}>
                  <TouchableOpacity
                    onPress={cargarImagen}
                    style={styles.buttonText1}
                  >
                    <Text style={styles.texto}>Cambiar foto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonText1}
                    onPress={(e) => handleSubmit(e)}
                  >
                    <Text style={styles.texto}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </Formik>
        </View>
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
    fontSize: 15,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
    color: "#7C88D5",
  },
  inputGroup: {
    padding: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    height: 60,
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
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 25,
    color: "grey",
    marginLeft: 20,
  },
  buttonCont: {
    display: "flex",
    flexDirection: "row",
  },
  buttonText1: {
    fontFamily: "Roboto_500Medium",
    backgroundColor: "#7C88D5",
    padding: 5,
    width: 150,
    textAlign: "center",
    borderRadius: 10,
    height: 30,
    textAlign: "center",
    flex: 1,
    margin: 10,
  },
  texto: {
    color: "white",
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
    textAlign: "center",
  },
  texto2: {
    fontFamily: "Roboto_100Thin",
    color: "grey",
  },
});
