import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";

const InputAnswer = ({
  respuesta,
  value,
  setAnswer,
  answer,
  setRespuesta,
  refetch,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const RESPUESTA = gql`
    mutation congreso($input: PreguntaInput) {
      updatePregunta(input: $input) {
        resupuesta
      }
    }
  `;
  const [updaterespuesta, {}] = useMutation(RESPUESTA);

  const handleRespuesta = (e) => {
    setRespuesta({
      ...respuesta,
      resupuesta: e,
    });
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={answer}>
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
              name={value.resupuesta}
              onChangeText={handleRespuesta}
            />
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.buttonSend}
                onPress={async () => {
                  await updaterespuesta({
                    variables: { input: respuesta },
                  });
                  refetch();
                  setAnswer(!answer);
                }}
              >
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSend}
                onPress={() => {
                  setAnswer(!answer);
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
    padding: 10,
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

export default InputAnswer;

{
  /* <TextInput
                style={{
                  height: 30,
                  borderBottom: "solid 1px #d9d9d9",
                  borderWidth: 1,
                  marginLeft: 20,
                  marginRight: 20,
                }}
                name={value.resupuesta}
                onChangeText={handleRespuesta}
              />
              <TouchableOpacity
                style={styles.buttonSend}
                onPress={async () => {
                  await updaterespuesta({
                    variables: { input: respuesta },
                  });
                  refetch();
                  setAnswer(!answer);
                }}
              >
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity> */
}
