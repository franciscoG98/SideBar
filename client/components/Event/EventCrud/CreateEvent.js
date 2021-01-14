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
  Platform,
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
import DateTimePicker from "@react-native-community/datetimepicker";

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
    horaInicio: false,
    horaFinal: false,
    render: {},
  });

  const time = (event, selectedDate) => {
    let currentDate = selectedDate;
    setState({ ...state, reloj: Platform.OS === "ios" });
    return setState({
      ...state,
      horaInicio: String(currentDate).slice(16, 21),
      reloj: false,
    });
  };

  const time2 = (event, selectedDate) => {
    let currentDate = selectedDate;
    setState({ ...state, reloj2: Platform.OS === "ios" });
    return setState({
      ...state,
      horaFinal: String(currentDate).slice(16, 21),
      reloj2: false,
    });
  };

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
      .then(() => navigation.navigate("Event"))
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
          <Text style={styles.title}> Crear congreso </Text>
        </View>
        <ScrollView style={styles.scroll}>
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
                  <Text style={styles.text}>Título</Text>
                  <TextInput
                    onChangeText={handleChange("titulo")}
                    onBlur={handleBlur("titulo")}
                    value={values.titulo}
                    placeholder="Título"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.text}>Descripción</Text>
                  <TextInput
                    onChangeText={handleChange("descripcion")}
                    onBlur={handleBlur("descripcion")}
                    value={values.descripcion}
                    placeholder="Descripción"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.text}>Ubicación</Text>
                  <TextInput
                    onChangeText={handleChange("ubicacion")}
                    onBlur={handleBlur("ubicacion")}
                    value={values.ubicacion}
                    placeholder="Ubicación"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.text}>Especialidad</Text>
                  <TextInput
                    onChangeText={handleChange("especialidad")}
                    onBlur={handleBlur("especialidad")}
                    value={values.especialidad[0]}
                    placeholder="Especialidad"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setState({ ...state, reloj: true })}
                >
                  <View style={styles.horaCont}>
                    <Text style={styles.textHora}>Hora Inicio</Text>
                    <Text style={styles.textHora}>{state.horaInicio}</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  {state.reloj && (
                    <View>
                      <DateTimePicker
                        value={new Date()}
                        mode={"time"}
                        onChange={time}
                        display="default"
                      />
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => setState({ ...state, reloj2: true })}
                >
                  <View style={styles.horaCont}>
                    <Text style={styles.textHora}>Hora de finalización</Text>
                    <Text style={styles.textHora}>{state.horaFinal}</Text>
                  </View>
                </TouchableOpacity>
                <View>
                  {state.reloj2 && (
                    <View>
                      <DateTimePicker
                        value={new Date()}
                        mode={"time"}
                        onChange={time2}
                        display="default"
                      />
                    </View>
                  )}
                </View>
                <View style={styles.inputGroup2}>
                  <Calendar
                    style={{ width: "100%" }}
                    placeholder="Fechas"
                    markingType={"period"}
                    onDayPress={(e) =>
                      setState({
                        ...state,
                        fecha: state.fecha.includes(
                          `${e.dateString}T${state.horaInicio}T${state.horaFinal}`
                        )
                          ? state.fecha.filter(
                              (dia) =>
                                dia !==
                                `${e.dateString}T${state.horaInicio}T${state.horaFinal}`
                            )
                          : [
                              ...state.fecha,
                              `${e.dateString}T${state.horaInicio}T${state.horaFinal}`,
                            ],
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
                    style={styles.picker}
                    onValueChange={handleChange("modalidad")}
                  >
                    <Picker.Item
                      style={styles.picked}
                      value=""
                      label="Selecciona modalidad"
                    />
                    <Picker.Item
                      style={styles.picked}
                      label="Presencial"
                      value="presencial"
                    />
                    <Picker.Item
                      style={styles.picked}
                      label="Virtual"
                      value="virtual"
                    />
                  </Picker>
                </View>
                <View style={styles.buttonCont}>
                  <TouchableOpacity
                    onPress={cargarImagen}
                    style={styles.buttonText1}
                  >
                    <Text style={styles.texto}>Cargar una foto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(e) => handleSubmit(e)}
                    style={styles.buttonText1}
                  >
                    <Text style={styles.texto}>Crear</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
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
    paddingBottom: 25,
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
    /*flex: 1,*/
    padding: 5,
    /*marginLeft: 5,
    marginRight: 5,*/
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
  },
  inputGroup2: {
    padding: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    height: 350,
  },
  horaCont: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "#d9d9d9",
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textHora: {
    marginLeft: 2,
    fontSize: 14,
    color: "grey",
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
    marginBottom: 25,
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
  picker: {
    paddingTop: 30,
    paddingBottom: 30,
    height: 50,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    color: "grey",
  },
  picked: {
    width: "100%",
    height: 50,
  },
  text: {
    marginBottom: 10,
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    color: "#7C88D5",
  },
});
