import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";

const Stack = createStackNavigator();
//네비게이션 역활을 위해 만들어줘야함!

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      mode="card"
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,
        }}
        component={Welcome}
      />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen
        options={{
          headerTitle: false,
          headerTransparent: true,
          // headerTransparent 헤더 투명으로 만들어서 칸구분 없는척하기 보이지만 않는거
          headerTintColor: "white",
        }}
        name="CreateAccount"
        component={CreateAccount}
      />
    </Stack.Navigator>
  );
}
