import { apisAreAvailable } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import AgendaIcon from "../images/AgendaIcon";
import Bookmark from "../images/Bookmark";
import ChatIcon from "../images/ChatIcon";
import LinkIcon from "../images/LinkIcon";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function MenuBar({ navigation }) {
  return (
    <View style={styles.superCont}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconCont}>
          <Bookmark
            size={32}
            color="#ffffff"
            className={styles.icon}
            onPress={() => alert("Event")}
          />
        </TouchableOpacity>
        <View style={styles.iconCont}>
          <AgendaIcon
            size={32}
            color="#ffffff"
            className={styles.icon}
            onPress={() => navigation.navigate("Calendar")}
          />
        </View>
        <View style={styles.iconCont}>
          <ChatIcon
            size={32}
            color="#ffffff"
            className={styles.icon}
            onPress={() => navigation.navigate("Event")}
          />
        </View>
        <View style={styles.iconCont}>
          <LinkIcon
            size={32}
            color="#ffffff"
            className={styles.icon}
            onPress={() => alert("Eventoooooo")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /*relleno: {
    height: "99%",
  },*/
  container: {
    position: "relative",
    left: 0,
    right: 0,
    bottom: 10,
    /*"#ACE4F8"*/
    backgroundColor: "#bdeeff",
    borderRadius: 40,
    height: 60,
    width: "96%",
    marginLeft: "2%",
    marginRight: "2%",
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },

  iconCont: {
    flex: 1,
    paddingLeft: "5%",
    marginTop: 5,
    marginLeft: 10,
  },

  superCont: {
    display: "flex",
    justifyContent: "center",
  },
});
