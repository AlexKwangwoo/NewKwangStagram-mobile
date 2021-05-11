import React from "react";
import styled from "styled-components/native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

const Container = styled.View`
  flex: 1;
  /* 화면을  flex: 1; 꽉채움 */
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 20px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  margin: 0 auto;
`;

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
    // 키보드 사라지게 하기
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      <Container>
        <KeyboardAvoidingView
          // 다른곳 누르면 키보드가 사라지게 만들어야함.. 너무 큰차지를 하니깐 안보임
          //아니면 키보드 가올라오면 createAccount화면이 올라가게 만들고싶음
          style={{
            width: "100%",
          }}
          behavior="padding"
          //안드로이드와 ios 다르게 작동해서.. behavior는 둘다 작동!

          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : -200}
          //키보드와 view사이 간격조절!!
        >
          <Logo
            resizeMode="contain"
            source={require("../../assets/logo.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
