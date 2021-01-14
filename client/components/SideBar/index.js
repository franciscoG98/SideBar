import * as React from "react";
import { View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../Home";
import Cal from "../Calendario";
import Congresos from "../Event/EventCard";
import UnderConstruction from "../UnderConstruction";
import Links from "../LinkInteres/InterestLinks";
import AdminPanel from "../AdminPanel/AdminPanel";
import Chat from "../Chat/ChatCard";

import BurgerMenuIcon from "../images/BurgerMenuIcon";

export function Menu({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7C88D5",
        position: "absolute",
      }}
    >
      <Button
        title="SIDE"
        // marginTop="10px"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View>
      {Menu({ navigation })}
      <Home />
    </View>
  );
}

function CalendarioScreen({ navigation }) {
  return (
    <View>
      {Menu({ navigation })}
      <Cal />
    </View>
  );
}

function CongresosScreen({ navigation }) {
  return (
    <View>
      {Menu({ navigation })}
      <Congresos />
    </View>
  );
}

function LinksScreen({ navigation }) {
  return (
    <View>
      {Menu({ navigation })}
      <Links />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View>
      {Menu({ navigation })}
      <UnderConstruction />
    </View>
  );
}

function AdminPanelScreen({ navigation }) {
  return (
    <View>
      {Menu({ navigation })}
      <AdminPanel />
    </View>
  );
}

function ChatScreen({ navigation }) {
  return (
    <View>
      {Menu({ navigation })}
      <Chat />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Congresos" component={CongresosScreen} />
      <Drawer.Screen name="Calendario" component={CalendarioScreen} />
      <Drawer.Screen name="Links de interes" component={LinksScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="AdminPanel" component={AdminPanelScreen} />
      <Drawer.Screen name="Chat" component={ChatScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
