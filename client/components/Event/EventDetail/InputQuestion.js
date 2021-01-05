import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";

const InputQuestion = ({ id, insertar, setInsertar, refetch }) => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log(insertar);
  const PREGUNTA = gql`
    mutation congreso($input: PreguntaInput) {
      addPregunta(input: $input) {
        pregunta
      }
    }
  `;
  const [value, setValue] = useState({
    pregunta: "",
    congresoId: id,
    resupuesta: "",
    reaccion: 0,
    usuarioId: "5fc8f54ace037c2030a884b5",
  });
  console.log(value);
  const [addpregunta, { error, data }] = useMutation(PREGUNTA);
  console.log(refetch);

  const handleChange = (e) => {
    setValue({
      ...value,
      pregunta: e,
    });
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={insertar}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={{
                height: 30,
                borderBottom: "solid 1px #d9d9d9",
                borderWidth: 1,
                marginLeft: 20,
                marginRight: 20,
                width: 200,
              }}
              name={value.pregunta}
              onChangeText={handleChange}
            />
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.buttonSend}
                onPress={async () => {
                  await addpregunta({ variables: { input: value } });
                  refetch();
                  setInsertar(!insertar);
                }}
              >
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSend}
                onPress={() => {
                  setInsertar(!insertar);
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 12,
    textAlign: "center",
    height: 15,
  },
  buttonSend: {
    //flex: 1,
    backgroundColor: "#7C88D5",
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
    width: 60,
  },
});

export default InputQuestion;

// <TextInput
//                       style={{
//                         height: 30,
//                         borderBottom: "solid 1px #d9d9d9",
//                         borderWidth: 1,
//                         marginLeft: 20,
//                         marginRight: 20,
//                       }}
//                       name={value.pregunta}
//                       onChangeText={handleChange}
//                     />
//                     <TouchableOpacity
//                       style={styles.buttonSend}
//                       onPress={async () => {
//                         await addpregunta({ variables: { input: value } });
//                         refetch();
//                         setInsertar(!insertar);
//                       }}
//                     >
//                       <Text style={styles.buttonText}>Enviar</Text>
//                     </TouchableOpacity>
//                   </>
