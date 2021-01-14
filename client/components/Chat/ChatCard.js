import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import useUser from "../Users/useUser";
import { gql, useQuery, useSubscription } from "@apollo/client";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import NewIcon from "../images/NewIcon";
import BinIcon from "../images/BinIcon";
import { TextInput } from "react-native-gesture-handler";
import SearchIcon from "../images/SearchIcon";
import Header from "../Header/Header";
import Spinner from "react-native-loading-spinner-overlay";
import UsersList from "./UsersList";

const CHATS = gql`
  query chats($where: JSON) {
    chats(where: $where) {
      remitenteId
      remitente {
        nombre
        apellido
        imagen
      }
      destinatarioId
      destinatario {
        nombre
        apellido
        imagen
      }
      mensaje
    }
  }
`;

let image = require("../images/bag.png");

export default function ChatCard({ navigation }) {
  const [idUsuarios, setIdUsuarios] = useState([]);
  const [message, setMessage] = useState([]);
  const [chatNuevo, setChatNuevo] = useState("");
  const [flag, setFlag] = useState(false);
  const [search, setSearch] = useState("");

  const { userDB } = useUser();

  const { subscribeToMore, loading, data, error, refetch } = useQuery(CHATS, {
    variables: {
      where: {
        $or: [
          { remitenteId: userDB.usuarios[0]._id },
          { destinatarioId: userDB.usuarios[0]._id },
        ],
      },
    },
  });
  useEffect(() => {
    subscribeToNewToDos();
  }, []);

  const MYCHAT = gql`
    subscription myChat($id: String) {
      myChat(_id: $id) {
        mensaje
        destinatarioId
        remitenteId
        remitente {
          nombre
          apellido
          imagen
          expoToken
        }
        destinatario {
          nombre
          apellido
          imagen
          expoToken
        }
      }
    }
  `;
  let filtrado = (array, id) => {
    let arreglo = [];
    array.map((lugar) => {
      arreglo.push(lugar.remitenteId);
      arreglo.push(lugar.destinatarioId);
    });

    let idUnicos = arreglo.filter((res) => res !== id);

    const dataArr = new Set(idUnicos);

    let result = [...dataArr];

    return result;
  };

  let ultimoMsj = () => {
    let mensajes = [];
    let chates;
    /* console.log("++++++++++++++++++++", data); */
    if (data && data.chats.length) {
      /* console.log("entreeeee", data); */
      chates = data.chats;
    }
    let nuevo;
    if (chatNuevo) {
      nuevo = chates.concat(chatNuevo);
    }
    if (nuevo) {
      for (let i = 0; i < idUsuarios.length; i++) {
        let flag = false;
        let indices = [];
        for (let j = nuevo.length - 1; j > -1; j--) {
          if (
            !flag &&
            (nuevo[j].destinatarioId === idUsuarios[i] ||
              nuevo[j].remitenteId === idUsuarios[i])
          ) {
            mensajes.push(nuevo[j]);
            flag = true;
          }
        }
      }
    } else {
      for (let i = 0; i < idUsuarios.length; i++) {
        let flag = false;
        let indices = [];
        for (let j = chates.length - 1; j > -1; j--) {
          if (
            !flag &&
            (chates[j].destinatarioId === idUsuarios[i] ||
              chates[j].remitenteId === idUsuarios[i])
          ) {
            mensajes.push(chates[j]);
            flag = true;
          }
        }
      }
    }
    setFlag(!flag);
    setMessage(mensajes);
  };
  data &&
    data.chats.length &&
    !idUsuarios.length &&
    setIdUsuarios(filtrado(data.chats, userDB.usuarios[0]._id));

  useEffect(() => {
    ultimoMsj();
  }, [idUsuarios]);

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_500Medium,
  });
  const subscribeToNewToDos = () =>
    subscribeToMore({
      document: MYCHAT, // the gql subscription operation
      // How do we update our ToDos data when subscription data comes through.
      variables: { id: userDB.usuarios[0]._id },
      updateQuery: (chats, { subscriptionData }) => {
        if (!subscriptionData.data) return chats;
        const newToDo = subscriptionData.data.myChat;
        const result = chats.chats.concat(newToDo);
        setChatNuevo(result[result.length - 1]);
        setIdUsuarios(filtrado(result, userDB.usuarios[0]._id));
        return { chats: result };
      },
    });

  if (loading) {
    return (
      <Spinner
        visible={true}
        textContent={"Cargando chats..."}
        textStyle={styles.spinnerTextStyle}
      />
    );
  } else {
    return (
      <View>
        <Header></Header>
        <View style={styles.bar}>
          <Text style={styles.title}>Chat</Text>
          <TouchableOpacity onPress={() => navigation.navigate("UsersList")}>
            <NewIcon
              name="search"
              color="grey"
              style={{
                flex: 1,
                marginTop: 20,
                marginLeft: 20,
                justifyContent: "center",
              }}
              size="32"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.goBack()}
          >
            {/*  <Text>
              <BinIcon name="new" color="grey" size="32" />
            </Text>*/}
          </TouchableOpacity>
          <View style={styles.inputCont}>
            {/*<TextInput
              placeholder={"Buscar..."}
              onChangeText={(search) => setSearch(search)}
              value={search}
              style={{
                height: 35,
                borderColor: "#c4c4c4",
                borderRadius: 20,
                borderWidth: 1,
                flex: 7,
                marginTop: 8,
                marginBottom: 15,
                color: "#c4c4c4",

                paddingLeft: 20,
              }}
            ></TextInput>*/}
          </View>
          <TouchableOpacity
            style={styles.iconContainerLeft}
            onPress={() => navigation.navigate("UsersList")}
          >
            <View>
              {/* <Text>Iniciar nuevo chat</Text> */}
              <Text style={styles.text2}>
                {/*<SearchIcon
                  name="search"
                  color="#c4c4c4"
                  style={{
                    flex: 1,
                    marginTop: 10,
                    marginLeft: 5,
                    justifyContent: "center",
                  }}
                  size="22"
                />*/}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <ScrollView style={styles.scroll2}>
            {message.length ? (
              message.reverse().map((chat, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    navigation.navigate("ChatDetail", {
                      id:
                        userDB.usuarios[0]._id === chat.remitenteId
                          ? chat.destinatarioId
                          : chat.remitenteId,
                      imagen:
                        userDB.usuarios[0]._id === chat.remitenteId
                          ? chat.destinatario.imagen
                          : chat.remitente.imagen,
                      nombre:
                        userDB.usuarios[0]._id === chat.remitenteId
                          ? chat.destinatario.nombre +
                            " " +
                            chat.destinatario.apellido
                          : chat.remitente.nombre +
                            " " +
                            chat.remitente.apellido,
                      expoToken:
                        userDB.usuarios[0]._id === chat.remitenteId
                          ? chat.destinatario.expoToken
                          : chat.remitente.expoToken,
                    })
                  }
                >
                  <View style={styles.eventContainer}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={
                          userDB.usuarios[0]._id === chat.remitenteId
                            ? chat.destinatario.imagen
                              ? { uri: chat.destinatario.imagen }
                              : image
                            : chat.remitente.imagen
                            ? { uri: chat.remitente.imagen }
                            : image
                        }
                        style={styles.image}
                      ></Image>
                    </View>
                    <View style={styles.eventDetail}>
                      <Text style={styles.titulo}>
                        {userDB.usuarios[0]._id === chat.remitenteId
                          ? chat.destinatario.nombre +
                            " " +
                            chat.destinatario.apellido
                          : chat.remitente.nombre +
                            " " +
                            chat.remitente.apellido}
                      </Text>

                      <Text style={styles.text}>{chat.mensaje}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <TouchableOpacity
                style={styles.iconContainerLeft}
                onPress={() => navigation.navigate("UsersList")}
              >
                <Text style={styles.editar}>Comienza a chatear!</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
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
  bar: {
    height: 70,
    display: "flex",
    flexDirection: "row",
    alignContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  iconContainer: {
    flex: 1,
    margin: 10,
  },
  inputCont: {
    display: "flex",
    flexDirection: "row",
    flex: 3,
    marginBottom: 5,
  },
  iconContainerLeft: {
    flex: 1,
    textAlign: "right",
    margin: 10,
  },
  scroll2: {
    width: "96%",
    height: "62%",
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: 30,
    padding: 2,
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
    paddingTop: 15,
    paddingLeft: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexWrap: "wrap",

    paddingRight: 10,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    height: 60,
    width: 60,
    borderRadius: 70,
    marginRight: 15,
    margin: 7,
    borderColor: "white",
    borderWidth: 1,
  },
  titulo: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    color: "white",
    flex: 1,
  },
  text: {
    fontFamily: "Roboto_100Thin",
    width: "100%",
    color: "white",
    flex: 2,
  },
  text2: {
    fontFamily: "Roboto_100Thin",

    color: "grey",
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 25,
    color: "grey",
    marginLeft: 20,
    marginTop: 20,
  },
});
