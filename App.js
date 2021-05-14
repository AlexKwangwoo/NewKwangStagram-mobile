import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
// import { AppearanceProvider } from "react-native-appearance";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);

  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const preloadAssets = () => {
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

    const imagesToLoad = [require("./assets/logo.png")];
    //처음꺼는 내가가지고 있는거 두번쨰는 로고 서버저장위치
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
    //프로미스all은 프로미스의 배열을 넣도록해준다!
  };

  const preload = async () => {
    //ApolloProvider, 앱이 실행되기전에 미리 작동해야하는것들!!!
    const token = await AsyncStorage.getItem("token");
    // 지울땐 removeItem or multiRomove 이용하기
    // 새로고침해도.. 토큰이 저장되어있으면 isLoggedInVar가 false에서true로됨!!
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
      // logUserIn와 비슷한기능을 다시한번더 해주는것임!
    }

    //문제는 다른사람 로그인하면..이전사람들캐쉬보여서 캐쉬리셋해야한다
    // client.clearStore(); 통해 로그아웃시 지워줄것임! 근데 오류가생기네... 했다가 다시잘됨
    // await persistCache({
    //   cache,
    //   //아폴로에서 우리가 만든 캐쉬를 가져온다!
    //   storage: new AsyncStorageWrapper(AsyncStorage),
    //   serialize: false,
    //   //내가 스키마 좀 바꿔주면 에러생기는데 여길통해 통과시켜준다
    //   //캐쉬가 자동업데이트되게할려면 저렇게 해야함..
    // });
    //persistance 일단취소.. 메시지에서 캐쉬쓸떄 오류가 많이남

    return preloadAssets();
    //preloadAssets은 promise를 리턴해야함
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
    <ApolloProvider client={client}>
      <NavigationContainer>
        {/* 네비게이션 컨테이너로 안감싸주면 오류발생함 */}
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
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
