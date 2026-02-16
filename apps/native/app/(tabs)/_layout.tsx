import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "../../constants/constants";
import { HapticTab } from "../../components/haptic-tab";
import { IconSymbol } from "../../components/ui/icon-symbol";


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["primary"],
        tabBarInactiveTintColor: Colors["tabInactive"],
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Morfeo",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="message.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Recetas",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="fork.knife" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
