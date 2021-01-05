import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  KeyboardEvent,
  Platform,
  TouchableOpacity,
} from "react-native";
/* import DatePicker from "react-native-datepicker"; */
import Colores from "./Colores.js";
import useUser from "../../Users/useUser";
import AdminIcon from "./../../images/PaletaDeColores";
import styles from "./style.js";
import meses from "./../FechaSeleccionada/meses";

export default function AgregarTarea({ route, navigation }) {
  let fecha = route.params.fecha;
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    horaInicio: "",
    horaFinal: "",
    completada: false,
    color: "",
    flag: false,
    botonColor: "",
  });

  const { userDB } = useUser();

  const MUTATION = gql`
    mutation addTarea($input: TareaInput) {
      addTarea(input: $input) {
        titulo
      }
    }
  `;
  const [createTarea, {}] = useMutation(MUTATION);
  const submit = () => {
    createTarea({
      variables: {
        input: {
          titulo: form.titulo,
          descripcion: form.descripcion,
          fecha: [`${fecha.dateString}T${form.horaInicio || "12:00"}`],
          completada: false,
          usuarioId: userDB.usuarios[0]._id,
          color: form.color,
        },
      },
    })
      .then(() => alert("Tarea Creada"))
      .then(() => navigation.navigate("Calendar"))
      .catch(() => alert("No se pudo crear la tarea"));
  };

  const seleccionado = (e) => {
    return setForm({ ...form, color: e, flag: false, botonColor: e });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" && "padding"}
    >
      <Text style={styles.titulo}>Crear una nueva Tarea</Text>
      <Text style={styles.label}>Título</Text>
      <TextInput
        onChangeText={(e) => setForm({ ...form, titulo: e })}
        style={styles.input}
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        onChangeText={(e) => setForm({ ...form, descripcion: e })}
        style={styles.input}
      />
      <Text style={styles.label}>Fecha</Text>
      <TextInput style={styles.input} value={meses(fecha)} />
      <Text style={styles.label}>Hora de Inicio</Text>
      <TextInput
        onChangeText={(e) => setForm({ ...form, horaInicio: e })}
        style={styles.input}
        placeholder="hh:mm"
      />
      <View style={styles.inline}>
        <Text style={styles.label}>Elije un Color</Text>
        {!form.flag && (
          <TouchableOpacity
            style={styles.pickColor}
            onPress={() => setForm({ ...form, flag: true })}
          >
            <AdminIcon fill={form.color || "#6fbded"} width="25" height="25" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerBtn}>
        <TouchableOpacity style={styles.submitBtn} onPress={() => submit()}>
          <Text style={styles.submitText}>Crear Tarea</Text>
        </TouchableOpacity>
      </View>
      {form.flag && (
        <View style={styles.contColor}>
          <Colores seleccionado={seleccionado} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
