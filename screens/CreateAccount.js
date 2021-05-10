import React from "react";
import styled from "styled-components/native";
import { TextInput } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

export default function CreateAccount() {
  return (
    // 키보드가 사라지게 만들어야함.. 너무 큰차지를 하니깐 안보임
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        // 엔터 버튼 글자 뭘로 할지!
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="Username"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        // 키보드 이메일형식으로 맞춰줌
        returnKeyType="next"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        //secureTextEntry **** 비번입력시 저렇게 나오게함
        returnKeyType="done"
        style={{ backgroundColor: "white", width: "100%" }}
      />
      <AuthButton text="Create Account" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
}
