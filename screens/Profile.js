import React from "react";
import { Text, View } from "react-native";

export default function Profile({ route: { params } }) {
  // console.log("params", params?.user);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Someones Profile</Text>
    </View>
  );
}
