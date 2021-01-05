import React, { useCallback, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  ScrollView,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import { gql, useMutation } from "@apollo/client";
import { getImagen, takeImagen } from "../pickImage/pick";

function Login(props) {
  let cargaImagen;
  const [task, setTask] = useState("Ingresar");
  const ALTA = gql`
    mutation addUsuario($input: UsuarioInput) {
      addUsuario(input: $input) {
        uid
        nombre
        apellido
        email
        telefono
        rol
        provincia
        matricula
        verificado
        laboratorio
        imagen
        especialidad
      }
    }
  `;
  const [createUser, { loading, data, error, refetch }] = useMutation(ALTA);
  let token;
  const handle = useCallback(
    (values) => {
      if (task === "Ingresar")
        firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .catch((err) => {
            alert(err);
          });
      else
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            values.emailRegister,
            values.passwordRegister
          )
          .then((ans) => {
            values.uid = ans.user.uid;
            console.log("estado", cargaImagen);
            createUser({
              variables: {
                input: {
                  especialidad: [values.especialidad],
                  apellido: values.apellido,
                  email: values.emailRegister,
                  imagen: cargaImagen,
                  laboratorio: values.laboratorio,
                  matricula: values.matricula * 1,
                  nombre: values.nombre,
                  provincia: values.provincia,
                  telefono: values.telefono * 1,
                  uid: values.uid,
                  token: ans.user.ya,
                },
              },
            }).catch((err) => {
              firebase.auth().signOut();
              alert("Error al registrar el usuario");
            });
          })
          .catch((err) => alert(err));
    },
    [task]
  );

  function cargarImagen() {
    let result = getImagen();
    result.then((ans) => {
      cargaImagen = ans;
    });
  }

  function cargarImagen2() {
    setImagen(takeImagen());
    console.log(imagen);
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
      {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
        <View style={styles.container}>
          <Button
            color="#7C88D5"
            onPress={() => setTask("Ingresar")}
            title={"Ingresar"}
          />
          <Button
            color="#7C88D5"
            onPress={() => setTask("Registrarse")}
            title={"Registrarse"}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
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
          <Button
            color="#7C88D5"
            onPress={(e) => handleSubmit(e)}
            title="Confirmar"
          />
        </View>
      )}
    </Formik>
  ) : (
    <Formik
      initialValues={{
        emailRegister: "",
        passwordRegister: "",
        uid: "",
        nombre: "",
        apellido: "",
        telefono: 0,
        rol: "User",
        provincia: "",
        matricula: 0,
        verificado: false,
        laboratorio: "",
        imagen: "",
        especialidad: [""],
      }}
      validate={(values) => {
        const errors = {};
        if (!values.nombre) errors.nombre = "Debes ingresar un Nombre";
        if (!values.apellido) errors.apellido = "Debes ingresar un Apellido";
        if (!values.telefono) errors.telefono = "Debes ingresar un Telefono";
        if (!values.provincia)
          errors.provincia = "Debes ingresar una Provincia";
        if (!values.matricula)
          errors.matricula = "Debes ingresar una Matricula";
        if (!values.laboratorio)
          errors.laboratorio = "Debes ingresar un Laboratorio";
        if (!values.especialidad)
          errors.especialidad = "Debes ingresar una Especialidad";
        if (!values.emailRegister) {
          errors.emailRegister = "Debes ingresar un Usuario";
        } else if (
          !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.emailRegister)
        )
          errors.emailRegister = "email incorrecto";
        if (!values.passwordRegister) {
          errors.passwordRegister = "Debes ingresar un Password";
        } else if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
            values.passwordRegister
          )
        )
          errors.passwordRegister =
            "min 8 caracteres, un numero y una mayuscula";
        return errors;
      }}
      onSubmit={(values) => {
        return handle(values);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        errors,
      }) => (
        <View style={styles.container}>
          <Button
            color="#7C88D5"
            onPress={() => setTask("Ingresar")}
            title={"Ingresar"}
          />
          <Button
            color="#7C88D5"
            onPress={() => setTask("Registrarse")}
            title={"Registrarse"}
          />
          <ScrollView style={styles.margen}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.inputGroup}
              name="emailRegister"
              onChangeText={handleChange("emailRegister")}
              onBlur={handleBlur("emailRegister")}
              value={values.emailRegister}
              keyboardType="email-address"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="emailRegister"
              component={Text}
            />

            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.inputGroup}
              name="passwordRegister"
              secureTextEntry
              onChangeText={handleChange("passwordRegister")}
              onBlur={handleBlur("passwordRegister")}
              value={values.passwordRegister}
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="passwordRegister"
              component={Text}
            />

            <Text style={styles.text}>Nombre</Text>
            <TextInput
              style={styles.inputGroup}
              name="nombre"
              onChangeText={handleChange("nombre")}
              onBlur={handleBlur("nombre")}
              value={values.nombre}
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="nombre"
              component={Text}
            />

            <Text style={styles.text}>Apellido</Text>
            <TextInput
              style={styles.inputGroup}
              name="apellido"
              onChangeText={handleChange("apellido")}
              onBlur={handleBlur("apellido")}
              value={values.apellido}
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="apellido"
              component={Text}
            />
            <Text style={styles.text}>Teléfono</Text>
            <TextInput
              style={styles.inputGroup}
              name="telefono"
              onChangeText={handleChange("telefono")}
              onBlur={handleBlur("telefono")}
              value={values.telefono}
              keyboardType="number-pad"
            />

            <ErrorMessage
              style={{ color: "red" }}
              name="telefono"
              component={Text}
            />

            <Text style={styles.text}>Provincia</Text>
            <TextInput
              style={styles.inputGroup}
              name="provincia"
              onChangeText={handleChange("provincia")}
              onBlur={handleBlur("provincia")}
              value={values.provincia}
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="provincia"
              component={Text}
            />

            <Text style={styles.text}>Matrícula</Text>
            <TextInput
              style={styles.inputGroup}
              name="matricula"
              onChangeText={handleChange("matricula")}
              onBlur={handleBlur("matricula")}
              value={values.matricula}
              keyboardType="number-pad"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="matricula"
              component={Text}
            />
            <Text style={styles.text}>Laboratorio</Text>
            <TextInput
              style={styles.inputGroup}
              name="laboratorio"
              onChangeText={handleChange("laboratorio")}
              onBlur={handleBlur("laboratorio")}
              value={values.laboratorio}
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="laboratorio"
              component={Text}
            />

            <Text style={styles.text}>Especialidad</Text>
            <TextInput
              style={styles.inputGroup}
              name="especialidad"
              onChangeText={handleChange("especialidad")}
              onBlur={handleBlur("especialidad")}
              value={values.especialidad}
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="especialidad"
              component={Text}
            />
          </ScrollView>
          <Button
            color="#7C88D5"
            borderRadius="20"
            title="Agregar una foto almacenada"
            onPress={cargarImagen}
          />
          <Button
            color="#7C88D5"
            borderRadius="20"
            title="Agregar una foto con tu cámara"
            onPress={cargarImagen2}
          />
          <Button
            disabled={isSubmitting}
            color="#7C88D5"
            title="Confirmar"
            onPress={(e) => handleSubmit(e)}
          />
        </View>
      )}
    </Formik>
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
    fontFamily: "Roboto_500Medium",
    flex: 1,
    padding: 15,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },

  inputGroup: {
    flex: 1,
    padding: 5,
    marginBottom: 10,
    marginRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
  },
});

export default Login;
