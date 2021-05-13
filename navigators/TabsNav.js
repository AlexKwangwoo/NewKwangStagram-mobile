import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  const { data } = useMe();

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        // 메뉴가 선택됬을때 글자색
        showLabel: false,
        //메뉴 글자 없애기
        style: {
          borderTopColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
        // tabStyle: {
        //   backgroundColor: "red",
        // },
      }}
    >
      <Tabs.Screen
        name="Feed"
        // component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            //탑바아이콘은 3개의 변수를 받을수있음!
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Search"
        // component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Camera"
        component={View}
        listeners={({ navigation }) => {
          //유저의 클릭을 감지 시켜준다! 카메라 버튼누를시.. 뭔가를 하게해줌!
          //즉 클릭하게되면 upload화면으로 바뀌게 해줄것임!
          return {
            tabPress: (e) => {
              e.preventDefault();
              //preventDefault()를 통해 카메라 누를시 다른기능 아무것도 안일어나게함..모든걸 막은뒤
              //우리가 할것을 수행
              navigation.navigate("Upload");
              //여기를 통해 매인중 tabs와 upload페이지들중 upload로 가게해줌
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"camera"} color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="Notifications"
        // component={Notifications}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"heart"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notifications" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Me"
        // component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data.me.avatar }}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  ...(focused && { borderColor: "white", borderWidth: 1 }),
                }}
              />
            ) : (
              <TabIcon iconName={"person"} color={color} focused={focused} />
            ),
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
