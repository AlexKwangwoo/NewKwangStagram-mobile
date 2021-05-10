import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    //expo doc에 있는데로 따라했음!
    //promise만 리턴해야함!
    // 사용자가 앱이 준비(로딩)동안 봐야할 화면
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    //모든폰트들을 미리 들고올것이다. 이걸 가져오기위해 loadAsync 를 써야함!
    //배열을 promise.all에 넘겨줌!

    // console.log(fontPromises);
    // return Promise.all(fontPromises);
    //프로미스all은 프로미스의 배열을 넣도록해준다!

    const imagesToLoad = [
      require("./assets/logo.png"),
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png",
    ];
    //처음꺼는 내가가지고 있는거 두번쨰는 로고 서버저장위치
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
    //프로미스all은 프로미스의 배열을 넣도록해준다!
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        //앱이 onFinish될동안 볼화면!

        onError={console.warn}
        // 에러일때 발생

        onFinish={onFinish}
        //앱 준비가 되면 setLoading을 false로해 준비된 앱을 보여준다!
      />
    );
  }

  return (
    <NavigationContainer>
      {/* 네비게이션 컨테이너로 안감싸주면 오류발생함 */}
      <LoggedOutNav />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
