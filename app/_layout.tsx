import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Expenses",
            tabBarIcon: ({ color }) => <FontAwesome name="list" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            tabBarIcon: ({ color }) => <FontAwesome name="bar-chart" size={24} color={color} />,
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
