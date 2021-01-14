import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 22,
    color: "lightblue",
    margin: 20,
  },
  boton: {
    height: 50,
    width: "80%",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  textoBoton: {
    fontSize: 18,
    color: "white",
  },
  container: {
    width: "100%",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  contCalendario: {
    width: "80%",
    height: "auto",
    backgroundColor: "grey",
  },
  label: {
    fontSize: 14,
    display: "flex",
    color: "lightblue",
  },
  input: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    height: "5%",
    marginBottom: "10%",
    marginLeft: 20,
    color: "black",
    fontSize: 18,
    width: "80%",
  },
  imagen: {
    height: 215,
    width: "100%",
    resizeMode: "contain",
    marginTop: 15,
  },
  contLabel: {
    marginTop: 10,
    width: "90%",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  contBotones: {
    flexDirection: "row",
    width: "90%",
    height: "auto",
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  botonesFinales: {
    height: 50,
    width: "43%",
    margin: "2%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    backgroundColor: "#328da8",
  },
  botonesFinales2: {
    height: 50,
    width: "43%",
    margin: "2%",
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  scroll: {
    paddingBottom: "30%",
  },
});

export default styles;
