import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

export default function Colores({ seleccionado }) {
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.yellow}
        key="yellow"
        onPress={() => seleccionado("yellow")}
      />
      <TouchableOpacity
        style={style.gold}
        key="gold"
        onPress={() => seleccionado("gold")}
      />
      <TouchableOpacity
        style={style.tomato}
        key="tomato"
        onPress={() => seleccionado("tomato")}
      />
      <TouchableOpacity
        style={style.red}
        key="red"
        onPress={() => seleccionado("red")}
      />
      <TouchableOpacity
        style={style.lime}
        key="lime"
        onPress={() => seleccionado("lime")}
      />
      <TouchableOpacity
        style={style.olivedrab}
        key="olivedrab"
        onPress={() => seleccionado("olivedrab")}
      />
      <TouchableOpacity
        style={style.darkolivegreen}
        key="darkolivegreen"
        onPress={() => seleccionado("darkolivegreen")}
      />
      <TouchableOpacity
        style={style.maroon}
        key="maroon"
        onPress={() => seleccionado("maroon")}
      />
      <TouchableOpacity
        style={style.paleturquoise}
        key="paleturquoise"
        onPress={() => seleccionado("paleturquoise")}
      />
      <TouchableOpacity
        style={style.deepskyblue}
        key="deepskyblue"
        onPress={() => seleccionado("deepskyblue")}
      />
      <TouchableOpacity
        style={style.darkorchid}
        key="darkorchid"
        onPress={() => seleccionado("darkorchid")}
      />
      <TouchableOpacity
        style={style.purple}
        key="purple"
        onPress={() => seleccionado("purple")}
      />
      <TouchableOpacity
        style={style.gray}
        key="gray"
        onPress={() => seleccionado("#f0b1f2")}
      />
      <TouchableOpacity
        style={style.gainsboro}
        key="gainsboro"
        onPress={() => seleccionado("#24b39e")}
      />
      <TouchableOpacity
        style={style.dimgray}
        key="dimgray"
        onPress={() => seleccionado("#664b1a")}
      />
      <TouchableOpacity
        style={style.black}
        key="black"
        name="black"
        onPress={() => seleccionado("#0f0b85")}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    height: "auto",
    width: "40%",
    display: "flex",
    backgroundColor: "#4b4d4b",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 3,
    borderColor: "#575c58",
    borderRadius: 2,
  },
  lime: {
    height: 30,
    width: 30,
    backgroundColor: "lime",
    margin: 2,

    borderRadius: 2,
  },
  yellow: {
    height: 30,
    width: 30,
    backgroundColor: "yellow",
    margin: 2,

    borderRadius: 2,
  },
  gold: {
    height: 30,
    width: 30,
    backgroundColor: "gold",
    margin: 2,

    borderRadius: 2,
  },
  tomato: {
    height: 30,
    width: 30,
    backgroundColor: "tomato",
    margin: 2,

    borderRadius: 2,
  },
  red: {
    height: 30,
    width: 30,
    backgroundColor: "red",
    margin: 2,

    borderRadius: 2,
  },
  olivedrab: {
    height: 30,
    width: 30,
    backgroundColor: "olivedrab",
    margin: 2,

    borderRadius: 2,
  },
  darkolivegreen: {
    height: 30,
    width: 30,
    backgroundColor: "darkolivegreen",
    margin: 2,

    borderRadius: 2,
  },
  maroon: {
    height: 30,
    width: 30,
    backgroundColor: "maroon",
    margin: 2,

    borderRadius: 2,
  },
  paleturquoise: {
    height: 30,
    width: 30,
    backgroundColor: "paleturquoise",
    margin: 2,

    borderRadius: 2,
  },
  deepskyblue: {
    height: 30,
    width: 30,
    backgroundColor: "deepskyblue",
    margin: 2,

    borderRadius: 2,
  },
  darkorchid: {
    height: 30,
    width: 30,
    backgroundColor: "darkorchid",
    margin: 2,

    borderRadius: 2,
  },
  purple: {
    height: 30,
    width: 30,
    backgroundColor: "purple",
    margin: 2,

    borderRadius: 2,
  },
  gainsboro: {
    height: 30,
    width: 30,
    backgroundColor: "#24b39e",
    margin: 2,

    borderRadius: 2,
  },
  black: {
    height: 30,
    width: 30,
    backgroundColor: "#0f0b85",
    margin: 2,

    borderRadius: 2,
  },
  dimgray: {
    height: 30,
    width: 30,
    backgroundColor: "#664b1a",
    margin: 2,

    borderRadius: 2,
  },
  gray: {
    height: 30,
    width: 30,
    backgroundColor: "#f0b1f2",
    margin: 2,

    borderRadius: 2,
  },
});