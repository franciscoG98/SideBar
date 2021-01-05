import React, { useEffect } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import EventCard from "./components/Event/EventCard";
import EventDetail from "./components/Event/EventDetail/EventDetail";
import { AppRegistry, Button } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CreateEvent from "./components/Event/EventCrud/CreateEvent";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserList from "./components/Users/UsersList";
import firebase from "firebase/app";
import { UserProvider } from "./components/Users/userContext";
import "firebase/auth";
import useUser from "./components/Users/useUser";
import MyTabs from "./components/MenuBar/TabBar";
import UnderConstruction from "./components/UnderConstruction";
import HeaderTab from "./components/Header/HeaderTab";
import Home from "./components/Home";
import Calendario from "./components/Calendario";
import Login from "./components/Users/Login";
import ChatCard from "./components/Chat/ChatCard";
import ChatDetail from "./components/Chat/ChatDetail";
import UsersList from "./components/Chat/UsersList";
import DeleteEditEvent from "./components/Event/EventCrud/DeleteEditEvent";
import UserPromote from "./components/AdminPanel/UserPromote";
import createLinks from "./components/LinkInteres/CrudLink";
import InterestLinks from "./components/LinkInteres/InterestLinks";
import AgregarTarea from "./components/Calendario/AgregarTarea";
import FechaSeleccionada from "./components/Calendario/FechaSeleccionada";
import EditEvent from "./components/Event/EventCrud/EditEvent";

const Stack = createStackNavigator();

var firebaseConfig = {
  apiKey: "AIzaSyBRutCUmn2wHrUAMzbM-5ESVsGxO2UEwQE",
  authDomain: "visitar-test.firebaseapp.com",
  projectId: "visitar-test",
  storageBucket: "visitar-test.appspot.com",
  messagingSenderId: "960314269839",
  appId: "1:960314269839:web:c9130a27fd6f5848ac50fa",
  measurementId: "G-8Y4DCJFJ5Z",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// Initialize Apollo Client
const client = new ApolloClient({
  //maquina virtual
  uri: "http://104.131.68.84:3002/graphql",
  cache: new InMemoryCache(),
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

function App() {
  const { user, setUser } = useUser();
  useEffect(() => {
    const unsuscribe = firebase
      .auth()
      .onAuthStateChanged((user) => setUser(user));
    return () => unsuscribe();
  }, [setUser]);
  /* console.log(user); */
  return (
    <View
      style={{
        height: "100%",
        marginTop: StatusBar.currentHeight,
        width: "100%",
        display: "flex",
      }}
    >
      <ApolloProvider client={client}>
        {user === null ? (
          <Login />
        ) : (
          <NavigationContainer theme={MyTheme}>
            <Button
              color="#7C88D5"
              onPress={() => firebase.auth().signOut()}
              title="Cerrar sesión"
            />
            <Stack.Navigator
              initialRouteName="Tab"
              screenOptions={{
                cardStyle: { backgroundColor: "#fff" },
              }}
            >
              <Stack.Screen
                name="CreateEvent"
                component={CreateEvent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Top"
                component={HeaderTab}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Calendar"
                component={Calendario}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Chat"
                component={ChatCard}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UsersList"
                component={UsersList}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChatDetail"
                component={ChatDetail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Tab"
                component={MyTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Event"
                component={EventCard}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Detail"
                component={EventDetail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DeleteEditEvent"
                component={DeleteEditEvent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UserPromote"
                component={UserPromote}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="AgregarTarea"
                component={AgregarTarea}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="createLinks"
                component={createLinks}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="InterestLinks"
                component={InterestLinks}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditEvent"
                component={EditEvent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FechaSeleccionada"
                component={FechaSeleccionada}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </ApolloProvider>
    </View>
  );
}

export default function () {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98e6fa",
    marginTop: 300,
    marginBottom: 100,
    marginLeft: 10,
    marginRight: 10,
    height: 10,
    /*width: 400,*/
    borderRadius: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "red",
    fontSize: 30,
  },
});

AppRegistry.registerComponent("MyApplication", () => App);
