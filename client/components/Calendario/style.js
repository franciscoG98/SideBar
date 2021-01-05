import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  view: {
    position: "relative",
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    backgroundColor: "lightgrey",
    width: "100%",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,

    fontSize: 16,
  },
  day: {
    margin: 20,
    color: "#009688",
    fontSize: 24,
  },
  texto: {
    width: "80%",
    color: "black",
  },
});

export default styles;
