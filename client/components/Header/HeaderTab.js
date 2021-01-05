import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ValijaIcon from "../images/ValijaIcon";
import React from "react";
import UserMenu from "./UserMenu";
import EventCard from "../Event/EventCard";
import { TabBar } from "react-native-tab-view";
import MyTabs from "../MenuBar/TabBar";

const Tab = createMaterialTopTabNavigator();

export default function HeaderTab({ navigation }) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        showIcon: true,

        indicatorStyle: {
          height: null,
        },
        tabStyle: {
          width: 70,
          textAlign: "right",
        },
        iconStyle: {
          width: 48,
          height: 48,
        },

        style: {
          height: 60,
          width: 60,
          position: "absolute",
          top: 20,
          right: 10,
          borderRadius: 50,
          backgroundColor: "powderblue",
          display: "flex",
          textAlign: "center",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
        },
      }}
    >
      <Tab.Screen
        name="User"
        component={MyTabs}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <ValijaIcon name="valija" color="white" size="48" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
