import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AddExpenseSheet, AddExpenseSheetRef } from "@/components/AddExpenseSheet";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";
import React from "react";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const addExpenseSheetRef = useRef<AddExpenseSheetRef>(null);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="expenes/index"
          options={{
            title: "Expenses",
            tabBarIcon: ({ color }) => <FontAwesome name="list" size={24} color={color} />,
            headerRight: () => (
              <TouchableOpacity onPress={() => addExpenseSheetRef.current?.present()} style={{ marginRight: 15 }}>
                <FontAwesome name="plus" size={24} color={colorScheme === "dark" ? "#fff" : "#000"} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="analytics/index"
          options={{
            title: "Analytics",
            tabBarIcon: ({ color }) => <FontAwesome name="bar-chart" size={24} color={color} />,
          }}
        />
      </Tabs>
      <AddExpenseSheet ref={addExpenseSheetRef} />
    </>
  );
}
