import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Calendar } from "react-native-calendars";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { gql, useMutation } from "@apollo/client";
import { AppLoading } from "expo";
import { Formik } from "formik";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { getImagen } from "../../pickImage/pick";
import { QUERY } from "../EventCard";
import BackIcon from "../../images/BackIcon";
import Header from "../../Header/Header";

const MUTATION = gql`
  mutation addCongreso($input: CongresoInput) {
    addCongreso(input: $input) {
      titulo
    }
  }
`;
export default function CreateEvent({ navigation }) {
  const [createCongreso, { loading, data, error, refetch }] = useMutation(
    MUTATION
  );
  const [state, setState] = useState({
    fecha: [],
    render: {},
  });

  let cargaImagen;
  let mutation = (values) => {
    createCongreso({
      variables: {
        input: {
          titulo: values.titulo,
          descripcion: values.descripcion,
          ubicacion: values.ubicacion,
          fecha: state.fecha,
          especialidad: [values.especialidad],
          imagen: cargaImagen,
          publicado: true,
          modalidad: values.modalidad,
        },
        refetchQueries: [{ query: QUERY }],
      },
    })
      .then((ans) => {
        alert("Congreso creado");
      })
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
      <ScrollView style={styles.scroll}>
        <Text style={styles.titulo}> Crear congreso </Text>
        <TouchableOpacity
          style={styles.buttonSend}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>

        <Formik
          initialValues={{
            titulo: "",
            descripcion: "",
            ubicacion: "",
            especialidad: [""],
            imagen: [""],
            fecha: "",
            modalidad: "",
          }}
          onSubmit={(values) => mutation(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>
              <View style={styles.inputGroup}>
                <TextInput
                  onChangeText={handleChange("titulo")}
                  onBlur={handleBlur("titulo")}
                  value={values.titulo}
                  placeholder="Título"
                />
              </View>

              <View style={styles.inputGroup}>
                <TextInput
                  onChangeText={handleChange("descripcion")}
                  onBlur={handleBlur("descripcion")}
                  value={values.descripcion}
                  placeholder="Descripción"
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  onChangeText={handleChange("ubicacion")}
                  onBlur={handleBlur("ubicacion")}
                  value={values.ubicacion}
                  placeholder="Ubicación"
                />
              </View>
              <View style={styles.inputGroup}>
                <TextInput
                  onChangeText={handleChange("especialidad")}
                  onBlur={handleBlur("especialidad")}
                  value={values.especialidad}
                  placeholder="Especialidad"
                />
              </View>
              <View style={styles.inputGroup2}>
                <Calendar
                  style={{ width: "100%" }}
                  placeholder="Fechas"
                  markingType={"period"}
                  onDayPress={(e) =>
                    setState({
                      ...state,
                      fecha: state.fecha.includes(e.dateString)
                        ? state.fecha.filter((dia) => dia !== e.dateString)
                        : [...state.fecha, e.dateString],
                      render: !!state.render[e.dateString]
                        ? {
                            ...state.render,
                            [e.dateString]: "",
                          }
                        : {
                            ...state.render,
                            [e.dateString]: { color: "lightblue" },
                          },
                    })
                  }
                  markedDates={state.render}
                />
              </View>
              <View style={styles.inputGroup}>
                <Picker
                  selectedValue={values.modalidad}
                  style={{ height: 50, width: 100 }}
                  onValueChange={handleChange("modalidad")}
                >
                  <Picker.Item label="Presencial" value="presencial" />
                  <Picker.Item label="Virtual" value="virtual" />
                </Picker>
              </View>
              <View>
                <Button
                  color="#7C88D5"
                  borderRadius="20"
                  padding="10"
                  title="Agregar una foto"
                  onPress={cargarImagen}
                />
                <Button
                  color="#7C88D5"
                  borderRadius="20"
                  padding="10"
                  title="Crear"
                  onPress={(e) => handleSubmit(e)}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
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
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
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
  inputGroup2: {
    padding: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    height: 350,
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
  buttonSend: {
    margin: 10,
    padding: 10,
    fontFamily: "Roboto_500Medium",
    backgroundColor: "#7C88D5",
    padding: 5,
    width: 100,
    textAlign: "center",
    borderRadius: 10,
    height: 30,
    textAlign: "center",
  },
  texto: {
    color: "white",
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
    textAlign: "center",
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 25,
    color: "grey",
  },
});
