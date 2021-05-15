import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import {
  AsyncStorageWrapper,
  CachePersistor,
  persistCache,
} from "apollo3-cache-persist";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";

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
  client.clearStore();
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
  //clear를 통해 로그아웃시 모든 캐쉬내역 삭제!!
  //나갔다오면 유지시키는거 패스.. 메시지에서 캐쉬오류가 많이남
};

// const httpLink = createHttpLink({
const uploadHttpLink = createUploadLink({
  //업로드를위해 httplink를 업로드+httpLink가 포함된 createUploadLink를 사용함
  uri: "http://192.168.1.68:4000/graphql",
  //https://sharp-shrimp-59.loca.lt/graphql
  ////192.168.1.68:19000 여기 숫자로 해야할듯

  //ex)
  // exp://192.168.0.39:19000 <-엑스포 키면 왼쪽밑에 바코드위에있음
  //http://192.168.0.39:5000

  // http://localhost:4000/graphql
});

const wsLink = new WebSocketLink({
  uri: "ws://192.168.1.68:4000/graphql",
  options: {
    // reconnect: true,
    connectionParams: () => ({
      //connectionParams을 통해 webSocket의 context에 토큰을 실어 보낼수있음..딱한번만보내고 계속저장됨
      token: tokenVar(),
    }),
  },
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

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  //여길 통해 우리가 어떤 애러가 어디서 일어나는지 좀더 자세하게 볼수있음
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    // Message: {
    //   keyFields: (obj) => `Message:${obj.id}`,
    // },
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
        //offsetLimitPagination 이 밑의 두개를 결합한것임!!
        // keyArgs:false <-인자에 따라 따로따로 저장하지마세요!!
        // merge(existing = [], incoming = []) {
        //   return [...existing, ...incoming];
        // },
      },
    },
  },
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
  //언제 웹소캣 쓸지 언제 http 링크쓸지 알아야함!

  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  }, //여기가 맞다면 웹소캣을 반환함.. 아니면 http반환!
  wsLink,
  httpLinks
);

const client = new ApolloClient({
  link: splitLink,

  // link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  // httpLink를 우리가 앞에 안쓰는 이유는 마지막에 거치는 링크기때문이다
  // 종료되는 링크이기에.. 마지막에 안써주면 종료 링크가 없다 오류뜬다!
  // 에러생기는걸 보기위해서는 onErrorLink를 포함해줘야함
  cache,
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
