import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  KeyboardEvent,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
    !userDB
      ? alert("No estás logueado")
      : createTarea({
          variables: {
            input: {
              titulo: form.titulo,
              descripcion: form.descripcion,
              fecha: [
                `${fecha.dateString}T${form.horaInicio || "12:00"}T${
                  form.horaFinal
                }`,
              ],
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

  const time = (event, selectedDate) => {
    let currentDate = selectedDate;
    setForm({ ...form, reloj: Platform.OS === "ios" });
    return setForm({
      ...form,
      horaInicio: String(currentDate).slice(16, 21),
      reloj: false,
    });
  };

  const time2 = (event, selectedDate) => {
    let currentDate = selectedDate;
    setForm({ ...form, reloj2: Platform.OS === "ios" });
    return setForm({
      ...form,
      horaFinal: String(currentDate).slice(16, 21),
      reloj2: false,
    });
  };

  return (
    <View style={styles().container}>
      <ScrollView>
        <KeyboardAvoidingView behavior="heigth">
          <Text style={styles().titulo}>Crear una nueva Tarea</Text>
          <Text style={styles().label}>Título</Text>
          <TextInput
            onChangeText={(e) => setForm({ ...form, titulo: e })}
            style={styles().input}
          />
          <Text style={styles().label}>Descripción</Text>
          <TextInput
            onChangeText={(e) => setForm({ ...form, descripcion: e })}
            multiline={true}
            style={styles().inputDesc}
          />
          <Text style={styles().label}>Fecha</Text>
          <TextInput
            style={styles().input}
            value={
              form.horaInicio && !form.horaFinal
                ? `${meses(fecha)} a las ${form.horaInicio}`
                : form.horaInicio && form.horaFinal
                ? `${meses(fecha)} de ${form.horaInicio} a ${form.horaFinal}`
                : meses(fecha)
            }
          />
          <View style={styles().horaBtnCont}>
            <TouchableOpacity
              style={styles(form.color).submitBtn2}
              onPress={() => setForm({ ...form, reloj: true })}
            >
              <Text style={styles().submitText}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles(form.color).submitBtn2}
              onPress={() => setForm({ ...form, reloj2: true })}
            >
              <Text style={styles().submitText}>Fin</Text>
            </TouchableOpacity>
          </View>
          <View>
            {form.reloj && (
              <View>
                <DateTimePicker
                  value={new Date()}
                  mode={"time"}
                  onChange={time}
                  display="spinner"
                />
              </View>
            )}
            {form.reloj2 && (
              <View>
                <DateTimePicker
                  value={new Date()}
                  mode={"time"}
                  onChange={time2}
                  display="spinner"
                />
              </View>
            )}
          </View>
          <View style={styles().inline}>
            <Text style={styles().label}>Elije un Color</Text>
            {!form.flag && (
              <TouchableOpacity
                style={styles().pickColor}
                onPress={() => setForm({ ...form, flag: true })}
              >
                <AdminIcon
                  fill={form.color || "#6fbded"}
                  width="25"
                  height="25"
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles().centerBtn}>
            <TouchableOpacity
              style={styles(form.color).submitBtn}
              onPress={() => submit()}
            >
              <Text style={styles().submitText}>Crear Tarea</Text>
            </TouchableOpacity>
          </View>
          {form.flag && (
            <View style={styles().contColor}>
              <Colores seleccionado={seleccionado} />
            </View>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
