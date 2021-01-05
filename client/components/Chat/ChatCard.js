import React from "react";
import { AppLoading } from "expo";
import useUser from "../Users/useUser";
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

const image = {
  uri:
    "https://www.hqts.com/wp-content/uploads/2020/04/Pharmaceutical-Materials-no-logo-01-1110x550.jpg",
};

export default function ChatCard({ navigation }) {
  const { user } = useUser();

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <Header></Header>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.bar}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.goBack()}
          >
            <Text>
              <BinIcon name="new" color="grey" size="32" />
            </Text>
          </TouchableOpacity>
          <View style={styles.inputCont}>
            <TextInput
              placeholder={"Buscar..."}
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
            ></TextInput>
            <TouchableOpacity onPress={() => alert("buscar")}>
              <SearchIcon
                name="search"
                color="#c4c4c4"
                style={{
                  flex: 1,
                  marginTop: 10,
                  marginLeft: 3,
                  justifyContent: "center",
                }}
                size="22"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.iconContainerLeft}
            onPress={() => navigation.navigate("UsersList")}
          >
            <Text style={styles.editar}>
              <NewIcon name="new" color="grey" size="28" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <ScrollView style={styles.scroll2}>
            {/*<SearchBar navigation={navigation}/>*/}
            {/*aca  va un map de los chats*/}
            <TouchableOpacity
              onPress={() => navigation.navigate("ChatDetail", { id: user })}
            >
              <View style={styles.eventContainer}>
                <View style={styles.imgContainer}>
                  <Image source={image} style={styles.image}></Image>
                </View>
                <View style={styles.eventDetail}>
                  <Text style={styles.titulo}>Estefania Bonessa</Text>

                  <Text style={styles.text}>Texto del mensaje</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.eventContainer}>
                <View style={styles.imgContainer}>
                  <Image source={image} style={styles.image}></Image>
                </View>
                <View style={styles.eventDetail}>
                  <Text style={styles.titulo}>Estefania Bonessa</Text>

                  <Text style={styles.text}>Texto del mensaje</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.eventContainer}>
                <View style={styles.imgContainer}>
                  <Image source={image} style={styles.image}></Image>
                </View>
                <View style={styles.eventDetail}>
                  <Text style={styles.titulo}>Estefania Bonessa</Text>

                  <Text style={styles.text}>Texto del mensaje</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.eventContainer}>
                <View style={styles.imgContainer}>
                  <Image source={image} style={styles.image}></Image>
                </View>
                <View style={styles.eventDetail}>
                  <Text style={styles.titulo}>Estefania Bonessa</Text>

                  <Text style={styles.text}>Texto del mensaje</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.eventContainer}>
                <View style={styles.imgContainer}>
                  <Image source={image} style={styles.image}></Image>
                </View>
                <View style={styles.eventDetail}>
                  <Text style={styles.titulo}>Estefania Bonessa</Text>

                  <Text style={styles.text}>Texto del mensaje</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.eventContainer}>
                <View style={styles.imgContainer}>
                  <Image source={image} style={styles.image}></Image>
                </View>
                <View style={styles.eventDetail}>
                  <Text style={styles.titulo}>Estefania Bonessa</Text>

                  <Text style={styles.text}>Texto del mensaje</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.eventContainer}>
                <View style={styles.imgContainer}>
                  <Image source={image} style={styles.image}></Image>
                </View>
                <View style={styles.eventDetail}>
                  <Text style={styles.titulo}>Estefania Bonessa</Text>

                  <Text style={styles.text}>Texto del mensaje</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.eventContainer}>
                <View style={styles.imgContainer}>
                  <Image source={image} style={styles.image}></Image>
                </View>
                <View style={styles.eventDetail}>
                  <Text style={styles.titulo}>Estefania Bonessa</Text>

                  <Text style={styles.text}>Texto del mensaje</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.eventContainer}>
                <View style={styles.imgContainer}>
                  <Image source={image} style={styles.image}></Image>
                </View>
                <View style={styles.eventDetail}>
                  <Text style={styles.titulo}>Estefania Bonessa</Text>

                  <Text style={styles.text}>Texto del mensaje</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    height: 45,
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
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 25,
    color: "grey",
    marginLeft: 20,
    marginTop: 20,
  },
});
