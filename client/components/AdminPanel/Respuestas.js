import React, { useState } from "react";
import { AppLoading } from "expo";
import { gql, useQuery, useMutation } from "@apollo/client";
import BackIcon from "../images/BackIcon";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import scroll from "../../styles/scroll";
import Header from "../Header/Header";
import MyTabs from "../MenuBar/TabBar";

const image = {
  uri:
    "https://www.hqts.com/wp-content/uploads/2020/04/Pharmaceutical-Materials-no-logo-01-1110x550.jpg",
};

export default function Respuestas({ route, navigation }) {
  const [answer, setAnswer] = useState(false);
  const [value, setValue] = useState({
    pregunta: "",
    congresoId: "",
    resupuesta: "",
  });

  const [respuesta, setRespuesta] = useState({
    _id: "",
    resupuesta: "",
  });

  const QUERY = gql`
    query congresos {
      congresos {
        titulo
        preguntas {
          _id
          pregunta
          resupuesta
        }
      }
    }
  `;

  const { loading, data, error, refetch } = useQuery(QUERY, {});
  const RESPUESTA = gql`
    mutation congreso($input: PreguntaInput) {
      updatePregunta(input: $input) {
        resupuesta
      }
    }
  `;
  const [updaterespuesta, {}] = useMutation(RESPUESTA);

  const handleRespuesta = (e) => {
    setRespuesta({
      ...respuesta,
      resupuesta: e,
    });
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
    const congresosArr = data.congresos;
    return (
      <View>
        <Header />
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.goBack()}
          >
            <BackIcon name="back" color="grey" size="32" />
          </TouchableOpacity>
          <Text style={styles.title}> Responder Consultas </Text>
        </View>
        <ScrollView style={styles.container}>
          {congresosArr.map((c) =>
            c.preguntas.length &&
            c.preguntas.some((preg) => !preg.resupuesta) ? (
              <View key={c._id} style={styles.eventContainer}>
                <View>
                  <Text style={styles.titulo}>{c.titulo}</Text>
                </View>

                {c.preguntas.map((p) =>
                  !p.resupuesta ? (
                    <View key={p._id}>
                      <Text style={styles.texto}>Pregunta: {p.pregunta}</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Escribí tu respuesta"
                        onChangeText={handleRespuesta}
                      />
                      <TouchableOpacity
                        style={styles.buttonSend}
                        onPress={async () => {
                          respuesta._id = p._id;
                          /* console.log(respuesta); */
                          await updaterespuesta({
                            variables: { input: respuesta },
                          });
                          refetch();
                        }}
                      >
                        <Text style={styles.buttonText}>Responder</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null
                )}
              </View>
            ) : null
          )}
          <Text style={styles.text}>No hay más preguntas por responder</Text>
        </ScrollView>
        {/*<MyTabs></MyTabs>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroll,
  scroll2: {
    width: "96%",
    height: "68%",
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: 10,
    padding: 2,
  },
  container: {
    height: 500,

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
  eventContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingBottom: 30,
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 25,
    color: "grey",
  },
  view: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
  },
  detail: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },

  titulo: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    marginBottom: 20,
    color: "#7C88D5",
  },
  text: {
    fontFamily: "Roboto_400Regular",
    width: "100%",
    fontSize: 15,
    marginBottom: 15,
    color: "#67686b",
    textAlign: "center",
  },

  buttonCont: {
    display: "flex",
    flexDirection: "row",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    textAlign: "center",
  },
  buttonSend: {
    flex: 1,
    backgroundColor: "#7C88D5",
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 200,
    padding: 5,
    width: 100,
    height: 35,
  },
  buttonResp: {
    flex: 1,
    backgroundColor: "#7C88D5",
    borderRadius: 10,
    padding: 5,
    width: 70,
  },
  texto: {
    fontFamily: "Roboto_400Regular",
    width: "100%",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 20,
    color: "#67686b",
  },
  details: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    fontFamily: "Roboto_400Regular",
    color: "#67686b",
    paddingBottom: 10,
  },
});
