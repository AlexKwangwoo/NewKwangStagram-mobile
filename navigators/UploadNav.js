import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: {
          backgroundColor: "black",
        },
        activeTintColor: "white",
        indicatorStyle: {
          //화면 밑밑의 밑줄 색깔 설정!
          backgroundColor: "white",
          top: 0,
          //맨밑 밑줄이 한칸위에 오게됨!
        },
      }}
    >
      <Tab.Screen name="Select">
        {/* 하나는 내가 사진선택하는거고 하나는 내가 사진 찍는것임 */}
        {/* //함수를 꼭 써야함 */}
        {/* 헤더가 필요하기에 스택을 하나더 만들어줌! 즉 upload스택안에 두개의 탭이 있는데 selct탭에 하나의
          스택이 추가되어 헤더를 가질수있게됐음! */}
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons color={tintColor} name="close" size={28} />
                //화면 나갈때 아이콘 설정하기!
              ),
              headerStyle: {
                backgroundColor: "black",
                shadowOpacity: 0.3,
              },
            }}
          >
            <Stack.Screen
              name="Select"
              options={{ title: "Choose a photo" }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
}
