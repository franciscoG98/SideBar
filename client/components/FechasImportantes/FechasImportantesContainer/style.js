import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  total: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fcfafa",
  },
  header: {
    height: 100,
    width: "100%",
    backgroundColor: "green",
    backgroundColor: "white",
  },
  contFechas: {
    height: "auto",
    width: "100%",
    paddingBottom: "30%",
  },

  row: {
    display: "flex",
    height: "auto",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    marginRight: 30,
  },
  buttonCrear: {
    flex: 1,
    backgroundColor: "#bdeeff",
    width: 120,
    height: 20,
  },

  buttonText1: {
    fontFamily: "Roboto_500Medium",
    fontSize: 15,
    color: "#7C88D5",
  },
  titulo1: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    marginBottom: 10,
    color: "#dedede",
  },

  titulo: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    marginBottom: 10,
    color: "#454444",
  },
  text: {
    fontFamily: "Roboto_400Regular",
    width: "100%",
    color: "#454444",
  },
  buttonCont: {
    textAlign: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "powderblue",
    height: 28,
    width: 28,
    marginTop: 5,
    marginBottom: 25,
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
  },
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 28,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    color: "grey",
  },
  tarjeta: {
    borderWidth: 1,
    borderColor: "grey",
    width: "100%",
    height: 175,
  },
  botones: {
    width: "100%",
    backgroundColor: "#d6d6d6",
    marginTop: 20,
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: 10,
  },
  eventContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#f5f2f2",
    height: "80%",
    width: "100%",
    textAlign: "center",
    marginRight: "2%",
  },
  eventDetail: {
    paddingBottom: 10,
    paddingTop: 10,
    flex: 3,
    flexWrap: "wrap",
    paddingLeft: 10,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingRight: 10,
  },
  eventImg: {
    flex: 2,
    height: "100%",
    position: "relative",
    top: 0,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default styles;
