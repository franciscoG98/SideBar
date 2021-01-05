import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cont: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    position: "relative",
    paddingBottom: "15%",
    paddingTop: "30%",
  },
  header: {
    position: "absolute",
    marginBottom: 10,
    width: "100%",
    top: 0,
    height: "20%",
    backgroundColor: "#7C88D5",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  agregarTarea: {
    width: "100%",
    height: "10%",
    bottom: 0,
    backgroundColor: "#454444",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  headerText: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
  },
  titulo: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 10,
  },
  descripcion: {
    color: "grey",
    fontSize: 14,
    marginLeft: 20,
    marginTop: 10,
  },
  column: {
    flexDirection: "column",
  },
  tacho: {
    marginTop: 15,
    marginRight: 10,
    position: "absolute",
    right: "0.1%",
  },
  card: {
    width: "90%",
    padding: 10,
    height: "auto",
    flexDirection: "row",
    color: "black",
    backgroundColor: "#6fbded",
    alignItems: "flex-start",
    justifyContent: "space-between",
    margin: 10,
    borderRadius: 10,
  },
  card2: {
    width: "90%",
    height: "auto",
    padding: 10,
    flexDirection: "row",
    color: "black",
    backgroundColor: "#dceef5",
    alignItems: "flex-start",
    justifyContent: "space-between",
    margin: 10,
    borderRadius: 10,
  },
  textoAdd: {
    fontWeight: "700",
    fontSize: 18,
    color: "grey",
  },
});

export default styles;
