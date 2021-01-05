import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
  centerBtn: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
  },
  pickColor: {
    marginLeft: 30,
  },
  submitBtn: {
    width: 150,
    height: 50,
    backgroundColor: "#6fbded",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  submitText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  inline: {
    display: "flex",
    flexDirection: "row",
  },
  contColor: {
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  titulo: {
    fontSize: 20,
    textAlign: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 20,
    color: "#6fbded",
  },
  input: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    height: "5%",
    margin: 10,
    marginLeft: 20,
    color: "black",
    fontSize: 18,
  },
  inputErr: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    height: "5%",
    margin: 10,
    color: "black",
    fontSize: 18,
  },
});

export default styles;
