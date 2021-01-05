import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
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
import NewIcon from "../images/NewIcon";
import BinIcon from "../images/BinIcon";
import * as Linking from "expo-linking";
import Header from "../Header/Header";
import BackIcon from "../images/BackIcon";

const QUERY = gql`
  query links {
    links {
      titulo
      descripcion
      link
      _id
    }
  }
`;

const MUTATION = gql`
  mutation deleteLink($input: LinkInput) {
    deleteLink(input: $input) {
      titulo
    }
  }
`;

export default function InterestLinks({ navigation, route }) {
  const { loading, data, error, refetch } = useQuery(QUERY);
  const [borrarLink, {}] = useMutation(MUTATION);

  const [borrar, setBorrar] = useState(false);
  let adm;
  if (route.params) {
    adm = route.params.admin;
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
      <View style={styles.total}>
        <Header></Header>
        <View style={styles.view}>
          <TouchableOpacity
            style={styles.buttonSend}
            onPress={() => navigation.goBack()}
          >
            <BackIcon color="grey" size="32" />
          </TouchableOpacity>
          <Text style={styles.title}>Links de Interés</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.bar}>
            {adm && adm ? (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setBorrar(true)}
              >
                <Text>
                  <BinIcon name="new" color="grey" size="32" />
                </Text>
              </TouchableOpacity>
            ) : null}
            {adm && adm ? (
              <TouchableOpacity
                style={styles.iconContainerLeft}
                onPress={() => navigation.navigate("createLinks")}
              >
                <Text style={styles.editar}>
                  <NewIcon name="new" color="white" size="28" />
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <ScrollView style={styles.scroll2}>
            {data.links.map((link) => (
              <TouchableOpacity
                key={link._id}
                onPress={() =>
                  Linking.openURL("https://" + link.link).catch((err) =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <View style={styles.eventContainer}>
                  <View style={styles.eventDetail}>
                    <Text style={styles.titulo}>{link.titulo}</Text>

                    <Text style={styles.text}>{link.descripcion}</Text>
                    <Text style={styles.text}>{link.link}</Text>
                  </View>
                  {borrar ? (
                    <TouchableOpacity
                      style={styles.borrar}
                      onPress={async () => {
                        await borrarLink({
                          variables: { input: { _id: link._id } },
                        });
                        refetch();
                      }}
                    >
                      <Text style={styles.x}>
                        <BinIcon name="new" color="white" size="28" />
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  total: {
    width: "100%",
    height: "100%",
  },
  view: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 30,
  },
  header: {
    height: 100,
    width: "100%",
  },
  container: {
    width: "96%",
    display: "flex",
    borderWidth: 1,
    borderColor: "#f5f2f2",
    borderRadius: 20,
    marginLeft: "2%",
    marginRight: "2%",
    lineHeight: 800,
  },
  bar: {
    height: 45,
    display: "flex",
    flexDirection: "row",
    alignContent: "space-around",
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
    height: "68%",
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: 10,
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
    paddingBottom: 15,
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
  borrar: {
    padding: 5,
    width: 30,
    height: 30,
    marginTop: "6%",
    marginRight: "5%",
    textAlign: "center",
    justifyContent: "center",
  },
  x: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    color: "#7C88D5",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 25,
    color: "grey",
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
    marginTop: 10,
  },

  buttonSend: {
    marginLeft: 20,
  },
});
