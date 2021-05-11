import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import { Image } from "react-native";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    // 여기서 어떤 부분이 위에 쌓일지 결정해준다.. 탭위에 얹혀질 친구들을 말함!!
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",

          shadowColor: "rgba(255, 255, 255, 0.3)",
          // 쉐도우컬러가 바텀border색바꿔줌
          backgroundColor: "black",
        },
      }}
    >
      {/* --------------------밑의 4개는 각각의 탭들이 하나씩만 가지게 될것임!! */}
      {screenName === "Feed" ? (
        <Stack.Screen
          name={"Feed"}
          component={Feed}
          options={{
            headerTitleAlign: "center",
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 30,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}

      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}

      {screenName === "Notifications" ? (
        <Stack.Screen name={"Notifications"} component={Notifications} />
      ) : null}

      {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}

      {/* 이밑에 네개는 탭화면 클릭해서 올수있는게 아니라 navigation.navigate("name")으로만 가능 */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
