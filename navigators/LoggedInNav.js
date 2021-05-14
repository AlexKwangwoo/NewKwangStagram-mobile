import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import MessagesNav from "./MessagesNav";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator
      mode="modal"
      // headerMode="none"
      // headerMode none안하면 헤더포함된 스택에 다른스택이 포함된 탭이 들어가 두개의 헤더가된다!
      //근데 업로드 화면에서는 보여주게 하고싶은데.. 이유는 next와 before같은 버튼을 화면 맨위에
      //놓기위해서.. 그래서 일단 보여주게 하고 안보여주고 싶은 친구들만 밑에와같이 false로 한다!
    >
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
        component={UploadForm}
      />
      <Stack.Screen
        name="Messages"
        options={{ headerShown: false }}
        component={MessagesNav}
        // 메시지 안에서 다시 스택네비게이터가 시작해 헤더가 두개되는데 하나 없애줄것임
      />
    </Stack.Navigator>
  );
}
