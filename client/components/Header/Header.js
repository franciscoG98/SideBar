import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import useUser from "../Users/useUser";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const { userDB } = useUser();
  const navigation = useNavigation();

  let imagePath = require("../images/visitar.png");
  let image = require("../images/bag.png");
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.user}
        onPress={() => navigation.navigate("AdminPanel")}
      >
        <Image
          source={
            userDB && userDB.usuarios[0].imagen
              ? { uri: userDB.usuarios[0].imagen }
              : image
          }
          style={styles.image}
        ></Image>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    height: 80,
    width: "96%",
    margin: "1%",
    textAlign: "right",
  },
  image: {
    flex: 1,
    height: 80,
    width: 80,
    borderRadius: 80,
    resizeMode: "cover",
    marginLeft: "80%",
  },
  image2: {
    height: 50,
    width: 80,
    resizeMode: "cover",
    marginTop: 20,
  },
  user: {
    flex: 1,
    marginTop: 10,
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  logo: {
    flex: 3,
  },
});
