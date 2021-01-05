import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";

export default function UserMenu({ navigation }) {
  return (
    <View style={styles.eventContainer}>
      <Text> Este será el menu de usuario</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    width: "100%",
    height: 300,
    marginTop: 100,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 20,
  },
});
