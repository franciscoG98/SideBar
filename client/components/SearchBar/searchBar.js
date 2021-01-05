import { SearchBar } from "react-native-elements";
import React, { useEffect, useState } from "react";
// import styled from 'styled-components';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  search: {
    // width: '100%',
    // flex: 1,
    // paddingTop: 35,
    display: "flex",
    flexDirection: "column",

    marginLeft: 35,
    marginRight: 35,

    // marginBottom: '25px',
  },
  container: {
    borderRadius: 60,
    // height: '80%',
    backgroundColor: "transparent",
    borderWidth: 0.1,
    borderColor: "#E0E0E0",
    // width: '75%',
    // height: '80%',
    // marginLeft: 15,
  },
  input: {
    borderRadius: 30,
    backgroundColor: "white",
  },
  desplegable: {
    borderWidth: 0.1,
    borderColor: "#E0E0E0",
    borderRadius: 17,
    textAlign: "center",
    width: "60%",
  },
  div: {
    paddingTop: "2.5px",
    // marginRight: '0 auto',
    marginLeft: "25%",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    fontSize: 14,
    color: "#808080",
    textAlign: "center",
  },
});

const Searcher = ({ navigation }) => {
  const [search, setSearch] = useState({ titulo: "" });

  function handleChange(e) {
    setSearch({ titulo: e });
  }

  const QUERY = gql`
    query congresos($where: JSON) {
      congresos(where: $where) {
        titulo
        _id
        ubicacion
      }
    }
  `;

  const { loading, data = {}, refetch, error } = useQuery(QUERY, {
    variables: { where: search },
  });

  let info = data;

  let title = info.congresos && info.congresos[0] && info.congresos[0].titulo;
  let id = info.congresos && info.congresos[0] && info.congresos[0]._id;
  let ubicacion =
    info.congresos && info.congresos[0] && info.congresos[0].ubicacion;

  return (
    <View style={styles.search}>
      <SearchBar
        containerStyle={styles.container}
        inputContainerStyle={styles.input}
        lightTheme={true}
        placeholder="Buscar..."
        onChangeText={(e) => handleChange(e)}
        value={search.titulo}
        // onPress= {() => refetch()}
      />
      <br></br>

      {/* {data !== undefined ? <Text>{data.congresos}</Text>: null } */}

      <View style={styles.div}>
        <View style={title ? styles.desplegable : null}>
          {data ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Detail", { id: id })}
            >
              {title ? (
                <Text style={styles.title}>
                  {" "}
                  • {title} ({ubicacion}){" "}
                </Text>
              ) : null}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default Searcher;
