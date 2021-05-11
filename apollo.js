import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
//새로고침시 디폴트는 항상 false.. 그래서 토큰유무에따라 바꿔줘야함 app,js에서
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token) => {
  //이부분은 로그인할때 사용되어진다
  // await AsyncStorage.multiSet([
  //   // setItem은 하나만저장
  //   // ["token", JSON.stringify(token)],
  //   ["token", token],
  //   ["loggedIn", JSON.stringify("yes")],
  //   // 다른것도 저장가능.
  // ]);
  await AsyncStorage.setItem(TOKEN, token);

  isLoggedInVar(true);
  tokenVar(token);
  //리엑트변수를 통해 저장해뒀기에 async 통해 로컬스토리지 안이용해도됨!
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
};

const httpLink = createHttpLink({
  uri: "http://192.168.1.68:4000/graphql",
  //https://sharp-shrimp-59.loca.lt/graphql
  ////192.168.1.68:19000 여기 숫자로 해야할듯

  //ex)
  // exp://192.168.0.39:19000 <-엑스포 키면 왼쪽밑에 바코드위에있음
  //http://192.168.0.39:5000

  // http://localhost:4000/graphql
});

const authLink = setContext((_, { headers }) => {
  //백엔드에 토큰을 전달 해야만 한다!
  //setContext를 통해 넣어줄수있음
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export default client;

// const client = new ApolloClient({
//   uri: "http://192.168.1.68:4000/graphql",
//   //https://sharp-shrimp-59.loca.lt/graphql
//   ////192.168.1.68:19000 여기 숫자로 해야할듯

//   //ex)
//   // exp://192.168.0.39:19000 <-엑스포 키면 왼쪽밑에 바코드위에있음
//   //http://192.168.0.39:5000

//   // http://localhost:4000/graphql
//   cache: new InMemoryCache(),
// });
