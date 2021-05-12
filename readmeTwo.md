아이콘 찾아볼떈 https://icons.expo.fyi/

1. expo는 리엑트의 create-react-app 과 똑같다 보며니됨.. 리엑트 네이티브를 간편하게 설치할수있게해줌
   또한 expo가 리엑트native를 안드로이드 ios에서 사용할수있게 해줌 2. ReactNativeCLI 사용하면 맥에서 ios, 원도우에서 안드로이드 개발만 가능.. 또한 설정도 쉽게 할수있음..
   EXPO GO는 테스트를 할수있다

   단점 : 한계가 있다.. expo로 블루투스 같은걸 할수없어 android, IOS 새로 다 깔아서 해야함
   그리고 배포할떄 SDK를 다 포함해서 무거워진다! 수많은 API가 포함된다!

2. 그래서 우리는 expo와 xcode, androidstudio 의 장점들만 이용해볼것임! managed workflow이용해서
   양쪽 장점들만 eject(꺼내오기) 해서 사용하면됨!
   그래서 nativeCLI로 시작해서 expo의 좋은 기능을 꺼내올것임!!
   managed workflow는 리액트 네이티브를 위핸 create React app 이고 bear workflow는 완전히 컨트롤 가능
   하지만 이때문에 조금 복잡해질수있음
   managed workflow ? bear workflow? 가능한 범위가있는데 우리는 둘다 가능한 범위내에서 할것임!
   우리는 managed workflow로 시작해서 bear workflow로 끝낼것임(둘다 사용가능한 범위)
   expo에서 어떤 네이티브 코드도 돌리지 않도록 해야함!!(블루투스 같은거 엑스포는 안됨)

3. - npm install --global expo-cli
   - expo init NewKwangStagram_mobile
     managed workflow에서 blank로 갈것임.
   - expo install expo-app-loading 또는.. npm i --save-dev @types/expo-app-loading
     (뭔가 인스톨할때 앱 멈추게안한다)
   - expo install expo-font
   - expo install expo-asset asset에 있는 친구를 쓰기위해
   - npm install @react-navigation/native (네비게이션)
   - expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view(한줄로 만들어서 인스톨)
   - npm install @react-navigation/stack
   - npm install styled-components
   - expo install react-native-appearance
   - npm install react-hook-form
   - npm install @apollo/client graphql
   - npm install @react-navigation/bottom-tabs
   - expo install @react-native-async-storage/async-storage

4. view는 div고 text는 span임!

5. preload를 준비해야한다. 유저는 앱에 들어갈때 모든게 준비될떄 봐야하는데..
   그래서 로딩동안 볼 화면이 필요하다!
   프리로딩동안 예를들어 폰트준비, api준비 등을 할수있다,
   그리고 preload가 끝나면 onFinish가 발동되어 loading state를 false로 바꿔 앱을 실행한다!

6. 네비게이션을 하기위한 방법은 3가지가 있다

   - stack => 버튼눌러서 쌓이는 네비, Container 가 필요하고 그안에 stack.navigator 가 필요하다
     전체 영향줄때는 stack.Navigator에 주면되고 하나의 화면에영향줄떄는 options에 넣으면됨
   - tabs => 하단에 보이는 네비
   - drawer

7. 라우트 이동방법은
   <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
   인데 "" 안에 들어가는건 name이 들어가면된다
   <Stack.Screen name="Welcome" component={Welcome} />

8. npm install styled-components

   - styled components 프론트앤드와 다른점은
     div대신에 View를 쓸꺼임 styled.View처럼,

9. expo install react-native-appearance
   다크모드나 라이트 모드 설정하기위해서는 이부분이 필요함
   "userInterfaceStyle": "automatic",
   json에 설정 자세한건 14.3

10. flex: 1는 네이티브에서만 작동 화면을 꽉채움
    flex 기본 direction은 column임
    중요한점!! View에서 font-size바꿔줘도 적용안됨.,. Text가서 해줘야함

11. TouchableOpacity 버튼을 누를수있게 해줌 TouchableOpacity 는 view속성을 가지고있음

12. react native에서 input은 많은 props를 가지고있음

13. KeyboardAvoidingView 는 가상 키보드가 나타났을때 가려지지 않게 움직이는 component임

14. register 바깥을 눌렀을때 키보드 없앨려면 authlayout의 container를 감싸서 input 바깥누르는걸 감지할것임
    TouchableWithoutFeedback 이걸 써주면 된다..
    TouchableOpacity 쓰면 시각효과가 보이기에 화면이 흰색된다.. 윗아웃 쓰면 안보임!

15. npm install react-hook-form

16. onPress={()=>handleSubmit(onValid)} 은 handleSubmit을 바로 실행시킴
    onPress={handleSubmit(onValid)}은 onPress일때 handleSubmit을 실행함 랜더링즉시 실행함

17. 네이티브는 form이 없다 그래서 password에서 done 누르거나 버튼 누르면 handlesubmit() 작동시킴
    그리고 데이터는 onValue로 받아줌

18. onChangeText(네이티브만있음)방금 바뀐 text를 arg로 준다! 웹은 onChange로 하면됨!

19. 네이티브 form할때 register을 useEffect에서 먼저 해줘야함

20. npm install @apollo/client graphql 백앤드 연결

21. npx localtunnel --port 4000 가상으로 백앤드 나오게 해줌! 휴대폰에서 사용하기위해

22. npm install @react-navigation/bottom-tabs

23. Hook은 나눠서 랜더되면안된다
    ex) const isLoggedIn = useReactiveVar(isLoggedInVar);
    이와같은 훅은 초기에 설정해주고 if~else 나와도 랜더 되게해야지 if안에만저거쓰고 else안에는
    안쓰면 훅 오류뜸

24. watch는 실시간이고, getValue는 엔터치는순간의 발류 마지막 value이다

25. 화면간의 정보 보낼떄는  
     navigation.navigate("LogIn", {
    username,
    password,
    });
    이렇게 보내고 받을떄는
    export default function Login({ route: { params } }) {
    const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
    password: params?.password,
    username: params?.username,
    },
    });
    route에서 파람을 가져와서 쓰면됨!!

26. expo install @react-native-async-storage/async-storage

27. 웹에서는 REST쓸떄 http 헤더에 토큰을 붙여주고 로컬에 저장하고 로컬을 확인했지만
    async가 필요없고 바로바로 꺼내올수있었기에.. 하지만
    모바일에서는 storage에 저장하고 그 저장한걸 리액트변수에 담아두어 사용할것임
    매번 로컬사용하는것보다 리액트변수 쓰는게 빠름(여기서 local스토리지 이용할떈 async이용해야하기에)

28. tab네비게이션에 있는 모든 tab을 위해서 stack네비게이터를 만들어야함
    왜?

    - 일단 stack네비게이터에서만 header를 가진다
    - 탭네비게이션안에서 스택이 있어야한다. 이유는 처음에 로그인하면 home화면인데 검색해서 사람
      보고싶으면 검색을 누르면 검색탭 화면으로 간다. 이까지는 탭네비게이션인데... 문제는
      우리가 검색된 사진을 누르면 그위에 스택네비게이션을 통해 다른화면이 쌓이고, 사진의 주인프로필
      누르면 그사진위에 프로필화면이 스택네비게이션을 통해 다시 쌓이게되기때문이다.
    - 요약하자면 우리가 탭없기전에는 스택으로만 했었는데.. 탭이 생기고 나서 탭마다 다시 베이스
      스택네비게이션을 깔아줘야 한다고 생각하면됨! tap위에 stack이 깔리면 stack안에서는 자유롭게 다른
      스택화면들을 볼수있기 떄문이다!
      ex)LoggedOutNav기억!!
      (처음 로그인과 createAccount stack네비게이션 썻을때랑 똑같은데 4개의 탭화면위에 쌓여 있다보면됨)
      {/_ 이밑에 두개는 탭화면 클릭해서 올수있는게 아니라 navigation.navigate("name")으로만 가능 _/}
      한마디로 전 탭에서 공유하고 있다는것임..
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
    - 테스트 해보면 탭하나 클릭하고 다른 스택화면넘어가도 다른탭 누르기 전까지 위치는 안바뀜..
    - search탭화면에 <TouchableOpacity onPress={() => navigation.navigate("Feed")}> 이거하면 탭위치  
      바뀜.. 스택으로 바뀌지 않음
      왜냐하면 현재 내가 search탭위에 있다 치자.. 그러면 Search탭의 stack네비게이션은
      search와 profile, photo 이 3개밖에 없다! 그러면 Feed가 있나??없다! 그래서 tab으로 이동할수밖에없음!

29. tokenVar()에서 값안넣으면 값이 변하지 않고 안에 있던 값만 가져올수있음!

30. 리엑트 네이티브에서 스크롤뷰를 할수있는건 두가지가있음
    하나는 ScrollView 말그대로 스크롤움직이는거 그리고 모든 요소를 다 load한다
    하나는 FlatList이다 얘는 게을러서 한번에 load안함
    오직 화면에 있는것만 렌더 할것임!! 페지네이션이 필요없음..

31. 리엑트 네이티브는 이미지 가져올떄 width과 height가 필수이다

32. 변수넣기
    <File
    style={{
            width,
            height: height - `${Platform.OS === "ios" ? 500 : 300}`,
          }}
    source={{ uri: file }}
    />

33. 링크 이동시켜줄 navigation.navigate("Profile") 할때
    props로 받아도 되고 이렇게 useNavigation써도된다!! photo에 해놨음!

34. 새로 고침을 하기 위해서는
    refreshing={refreshing}
    //refreshing이 작동하기위해서는 onRefresh가 필요하다! refreshing가 true돼야 리프레쉬됨
    onRefresh={refresh}
    //onRefresh는 우리가 당겼을때 새로 실행될 함수를 말한다!
    두가지가 필요하다!

    const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    //fetchMore 은 더많은 결과를 새로운 변수와 함께 fetch할수있게 해줌
    //또한 기존의 데이터를 유지한체 새로운 데이터를 가져옴!
    <ScrollView 스크롤 뷰랑 flatList랑 리프레쉬 방법이 다름
    refreshControl={
    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
    }

35. seeFeed에서 모바일할때 2개를 보고 스킵갯수는 seeFeed데이터길이 만큼 offset으로 설정하여
    페이지 내릴때마다 건너뛰어서 사진을 받을수있음.. 그러나 문제는 fetchMore 해주면 반응이 일어나야하는데
    fetchMore 로는 render가 일어나지않는다.. 즉 화면상에 새롭게 보여줄게 없다는거다 왜냐하면
    우리는 현재 seeFeed.offset:0로 화면을 맨처음 만들었는데 여기서 seeFeed.offset:2로 변해야지만
    리렌더가 일어날텐데 업데이트가 아니라 seeFeed.offset:0 도있고 seeFeed.offset:2 도있어서
    리랜더 이유를 못느껴서 컴포넌트가 가만히 있음.. 그래서 저두게 가 같은거고 업데이트 된거라고 아폴로
    캐쉬한테 말해줘야함!
    // keyArgs:false <-인자에 따라 따로따로 저장하지마세요!!

    merge(existing = [], incoming = []) { <-이걸통해 이전데이터와 붙여줌
    // return [...existing, ...incoming];
    // },

36. npm i apollo3-cache-persist
    앱을쓰다가 다른앱쓰고 다시 원래 쓰던 앱왔을때 로딩이 안뜨고 그전에 봤던 일들을 할수있는 이유는
    cache의 persistence가 있기 때문이다 미리 우리폰의 하드 드라이브 같은 저장소들에 저장되도록 만들었다.

37. <FlatList
    ItemSeparatorComponent={() => (
    // 월래있는 함수이며.. 아이탬겹치는곳만 선을 만들어줌.. 맨위와 마지막은 선없음!!
    <View
    style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }} ></View>
    )}
    />

38. navigation.setOptions({
    title: data?.me?.username,
    }); 을 통해 내가 갈려는곳의 타이틀을 바꿔줄수있다!

39. 리엑트네이티브에서는 이미지 가져올때 너비와 높이 필수임!

40. const [startQueryFn, { loading, data }] = useLazyQuery(SEARCH_PHOTOS);
    //useQuery는 자동으로 실행되는데.. 유저가 키보드 검색을 누를때만 작동시키고 싶음!!
    컴포넌트가 mount될때 바로 실행됨.. 그래서 레이지 씀
    startQueryFn은 lazyQuery가 작동될 트리거임

41. {조건문 ? (A : (조건문 ? (B : C))): D} 도가능

42.
