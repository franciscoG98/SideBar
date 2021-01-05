import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AgendaIcon from "../images/AgendaIcon";
import Bookmark from "../images/Bookmark";
import ChatIcon from "../images/ChatIcon";
import LinkIcon from "../images/LinkIcon";
import EventCard from "../Event/EventCard";
import Calendar from "../Calendario/index";

import UnderConstruction from "../UnderConstruction";
import Home from "../Home";
import HomeIcon from "../images/HomeIcon";
import ChatCard from "../Chat/ChatCard";
import AdminIcon from "../images/AdminIcon";
import AdminPanel from "../AdminPanel/AdminPanel";
import InterestLinks from ".././LinkInteres/InterestLinks";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "red",
        style: {
          backgroundColor: "powderblue",
          borderRadius: 40, // TabBar background
          borderColor: "powderblue",
          marginLeft: 3,
          marginRight: 3,
          marginBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon name="home" color="white" size="32" />
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={EventCard}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Bookmark name="home" color="white" size="32" />
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <AgendaIcon name="Calendar" color="white" size="32" />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatCard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ChatIcon name="home" color="white" size="32" />
          ),
        }}
      />
      <Tab.Screen
        name="Links"
        component={InterestLinks}
        options={{
          tabBarIcon: ({ color, size }) => (
            <LinkIcon name="home" color="white" size="32" />
          ),
        }}
      />
      <Tab.Screen
        name="AdminPanel"
        component={AdminPanel}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AdminIcon name="home" color="white" size="32" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
