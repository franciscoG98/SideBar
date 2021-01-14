import React, { useCallback, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import "firebase/auth";
import EditUser from "./EditUser";
import EditLogin from "./EditLogin";

function Login(props) {
  let cargaImagen;
  let provider = new firebase.auth.GoogleAuthProvider();
  const [task, setTask] = useState("Ingresar");
  let token;
  const handle = useCallback((values) => {
    if (task === "Ingresar")
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .catch((err) => {
          alert(err);
        });
    [task];
  });

  function Google() {
    firebase.auth().signInWithRedirect(provider);
    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

    user = firebase.auth().currentUser;
    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
  }

  return task === "Ingresar" ? (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Debes ingresar un Usuario";
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email))
          errors.email = "email incorrecto";
        if (!values.password) {
          errors.password = "Debes ingresar un Password";
        } else if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
            values.password
          )
        )
          errors.password = "min 8 caracteres, un numero y una mayuscula";
        return errors;
      }}
      onSubmit={(values) => handle(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isSubmitting,
        dirty,
      }) => (
        <View style={styles.container}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.inputGroup}
            name="email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            keyboardType="email-address"
          />
          <ErrorMessage
            style={{ color: "red" }}
            name="email"
            component={Text}
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.inputGroup}
            name="password"
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          <ErrorMessage
            style={{ color: "red" }}
            name="password"
            component={Text}
          />
          <View style={styles.div}>
            <TouchableOpacity
              style={styles.boton}
              //disabled={isSubmitting || !dirty}
              onPress={(e) => handleSubmit(e)}
            >
              <Text style={styles.texto}>Ingresar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.div}>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => setTask("Registrarse")}
            >
              <Text style={styles.texto}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  ) : (
    <EditUser setTask={setTask} task={task} />
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
    color: "#7C88D5",
  },
  margen: {
    marginTop: 20,
    marginLeft: 5,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto_500Medium",
    flex: 1,
    padding: 15,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontFamily: "Roboto_500Medium",
    fontSize: 18,
    marginBottom: 10,
    color: "#7C88D5",
  },
  inputGroup: {
    padding: 5,
    marginBottom: 10,
    marginRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    fontFamily: "Roboto_400Regular",
  },
  boton: {
    backgroundColor: "#7C88D5",
    borderRadius: 10,
    width: 220,
    height: 35,
    padding: 8,
    textAlign: "center",
    margin: 10,
  },
  texto: {
    textAlign: "center",
    fontFamily: "Roboto_500Medium",
    color: "white",
  },
  div: {
    alignItems: "center",
  },
});

export default Login;
