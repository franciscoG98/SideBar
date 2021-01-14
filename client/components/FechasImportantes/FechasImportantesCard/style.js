import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  contcont: {
    position: "absolute",
    zIndex: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gainsboro",
    height: "100%",
    width: "100%",
  },
  container: {
    display: "flex",
    backgroundColor: "lightgrey",
    borderWidth: 1,
    height: "90%",
    width: "90%",
    borderRadius: 5,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: 20,
    left: 260,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
  },
  fechaCont: {
    flex: 0.5,
    display: "flex",
    width: "100%",
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  fecha: {
    fontSize: 14,
    width: "100%",
  },
  contBotones: {
    flex: 1,
    marginBottom: 20,
    height: 50,
    width: "80%",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  tituloCont: {
    flex: 1,
    width: "90%",
  },
  titulo: {
    height: "auto",
    fontSize: 18,
    fontWeight: "700",
    width: "100%",
  },
  descCont: {
    flex: 4,
    width: "100%",
    height: "100%",
    marginLeft: 50,
    marginRight: 30,
  },
  descripcion: {
    width: "80%",
    height: "auto",
    fontSize: 14,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  imagen: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    marginTop: 15,
  },
  imgCont: {
    marginTop: 20,
    paddingBottom: 20,
    flex: 4,
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
