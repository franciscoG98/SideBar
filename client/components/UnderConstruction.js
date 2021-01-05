import React from "react";
import { AppLoading } from "expo";
import { gql, useQuery } from "@apollo/client";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

const image = {
  uri:
    "https://cdn.dribbble.com/users/56427/screenshots/6003020/budio_hero_illustration_for_animation_2.gif",
};
export default function UnderConstruction() {
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.Cont}>
        <Text style={styles.text}> En Construccion</Text>
        <Image style={styles.image} source={image}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Cont: {
    /*width: 350,*/
    height: 450,
    marginTop: 100,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 20,
  },
  text: {
    position: "absolute",
    zIndex: 50,
    fontSize: 20,
    fontFamily: "Roboto_500Medium",
    color: "white",
    marginTop: 400,
    marginLeft: 50,
    marginRight: 50,
  },
});
