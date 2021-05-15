아이콘 찾아볼떈 https://icons.expo.fyi/

expo를 사용하면 덩치가 엄청 커지는데.. 그대신 엑스포 통해서 안드로이드 ios 다 해볼수있음
개인 개발자 연습 입장에서는 훌륭하지만 회사에서는 안씀 너무 파일이 큼

중요!!!!!!!gql`` 쓸떄 id를 왠만하면 가져와주자 그렇게 해야 아폴로 캐쉬가
Photo:1 Room:1 이런식으로 아이디를 줘서 나중에 우리가 캐쉬 업데이트하기가 쉬워짐!!

    --중요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    connectionParams: {
    token: tokenVar(),
    }, 얘는 한번만 실행되지만

    connectionParams: () => ({
    token: tokenVar(),
    }), 얘는 계속 실행되게 만드는 거임!!

    useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
      //캐쉬바로접근가능하게함!!
    }

    못할때는 const client = useApolloClient(); 이걸로 해준다음 client.cache로 접근해야함
    room에 가면 있음!!

1.  expo는 리엑트의 create-react-app 과 똑같다 보며니됨.. 리엑트 네이티브를 간편하게 설치할수있게해줌
    또한 expo가 리엑트native를 안드로이드 ios에서 사용할수있게 해줌 2. ReactNativeCLI 사용하면 맥에서 ios, 원도우에서 안드로이드 개발만 가능.. 또한 설정도 쉽게 할수있음..
    EXPO GO는 테스트를 할수있다

    단점 : 한계가 있다.. expo로 블루투스 같은걸 할수없어 android, IOS 새로 다 깔아서 해야함
    그리고 배포할떄 SDK를 다 포함해서 무거워진다! 수많은 API가 포함된다!

2.  그래서 우리는 expo와 xcode, androidstudio 의 장점들만 이용해볼것임! managed workflow이용해서
    양쪽 장점들만 eject(꺼내오기) 해서 사용하면됨!
    그래서 nativeCLI로 시작해서 expo의 좋은 기능을 꺼내올것임!!
    managed workflow는 리액트 네이티브를 위핸 create React app 이고 bear workflow는 완전히 컨트롤 가능
    하지만 이때문에 조금 복잡해질수있음
    managed workflow ? bear workflow? 가능한 범위가있는데 우리는 둘다 가능한 범위내에서 할것임!
    우리는 managed workflow로 시작해서 bear workflow로 끝낼것임(둘다 사용가능한 범위)
    expo에서 어떤 네이티브 코드도 돌리지 않도록 해야함!!(블루투스 같은거 엑스포는 안됨)

3.  - npm install --global expo-cli
    - expo install @react-native-async-storage/async-storage
    - expo install expo-app-loading 위에꺼랑 이거 설치..자꾸 삭제됨..
    - expo init NewKwangStagram_mobile
      managed workflow에서 blank로 갈것임.
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
    - npm install @react-navigation/material-top-tabs react-native-tab-view@^2.16.0
    - expo install expo-media-library
    - expo install expo-camera
    - expo install @react-native-community/slider
    - npm install @apollo/client subscriptions-transport-ws

4.  view는 div고 text는 span임!

5.  preload를 준비해야한다. 유저는 앱에 들어갈때 모든게 준비될떄 봐야하는데..
    그래서 로딩동안 볼 화면이 필요하다!
    프리로딩동안 예를들어 폰트준비, api준비 등을 할수있다,
    그리고 preload가 끝나면 onFinish가 발동되어 loading state를 false로 바꿔 앱을 실행한다!

6.  네비게이션을 하기위한 방법은 3가지가 있다

    - stack => 버튼눌러서 쌓이는 네비, Container 가 필요하고 그안에 stack.navigator 가 필요하다
      전체 영향줄때는 stack.Navigator에 주면되고 하나의 화면에영향줄떄는 options에 넣으면됨
    - tabs => 하단에 보이는 네비
    - drawer

7.  라우트 이동방법은
    <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
    인데 "" 안에 들어가는건 name이 들어가면된다
    <Stack.Screen name="Welcome" component={Welcome} />

8.  npm install styled-components

    - styled components 프론트앤드와 다른점은
      div대신에 View를 쓸꺼임 styled.View처럼,

9.  expo install react-native-appearance
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

42. 사진업로드 화면을 위해서..
    다시 스택 안속에 탭네비게이션 넣고 그 탭네비안에 다른스택이 존재함
    즉 첫번쨰 스택은 우리가 탭네비게이션 넣은곳
    두번째 스택은 우리의 upload파트가 될것임
    즉
    stack -> tabs -> stacks
    stack(upload)
    이유는 우리가 카메라 클릭시, 다른 카메라 화면으로 넘어 가고 싶기 떄문

43. npm install @react-navigation/material-top-tabs react-native-tab-view@^2.16.0
    사진찍는 화면을 위해서 다른 네비게이션 다운받음

44. expo install expo-media-library 를 통해 우리가 사진들을 불러올수있음!

45. <a><b/><c/></a> 가있을때 a에 flex:1 주고 b,c에도 각각 flex:1 주면 전체화면에 절반씩 bc가 가져감

46. expo install expo-camera

47. expo install @react-native-community/slider 카메라 줌기능위해 설치

48. <StatusBar hidden={true} />
    {/* 시계나오고 배터리나오는부분이다 */}

49. takePictureAsync 통해 사진을 찍고 uri가 반환되는데 캐쉬에 저장되어있다
    이 캐쉬에 저장된 친구를 잠시 미리보기로 나두고 내 사진첩에 저장할지는 옵션을 유저한테 물어
    결정할수있게 만들어야한다

50. 우리는 리턴없이 사진찍고 Alert를 이용하여 yes or no에 따라
    await MediaLibrary.saveToLibraryAsync(takenPhoto) 친구를 이용하여 바로 저장할것임

51. 사진 선택화면에 가면.. 카메라도 자동으로 바로켜진다. 그래서 우리는 useIsFocused라는 친구를
    쓸껀데.. 이친구를 통해 카메라 화면에만 focus 됐을때 카메라가 켜지게 만들것임!
    또한 베터리 잔량도.. 사진select일때는 베터리 화면보여주고 싶고, 사진찍을떄는 없애고 싶은데
    useIsFocused이용해 조절할수있음 버그가 있어서 이렇게 했음.. 저렇게안하면 둘다 안뜨거나 둘다뜸
    {isFocused ? <StatusBar hidden={true} /> : null}
    즉!!!!! 화면들은 이미 내가 앱키는순간 작동되는데.. 저 포커스를 사용해 특정 화면에 왔을떄만
    작동하는 기능을 미리 구현안하고 기다리다 그순간이 되면 실행 하게 할수있음!
    근데(카메라 는 설정안해줬음..해줘야 미리 안켜짐)

52. ...(loading && { headerLeft: () => null }),
    이게 만약 loading중이면 headerLeft를 눌로하겠다는거와 똑같은 조건문임!

53. mutation uploadPhoto($file: Upload!, $caption: String) {
    프론트엔드와 모바일은 저기서 Upload! 형식이 뭔지 모른다.. 그래서 해결해줘야함

54. file 업로드를 위해 npm i apollo-upload-client 가 필요
    왜냐하면 우리는 프리즈마에서 제공한 Upload라는 type을 해결해야하기에.. 저걸 써야함!
    문제가있는데 http link는 file업로드 형식을 제대로 이해하지못해 뭔가 해줘야함!
    const uploadHttpLink = createUploadLink({
    //업로드를위해 httplink를 업로드+httpLink가 포함된 createUploadLink를 사용함
    이걸로 해결했음!

55. const client = new ApolloClient({
    link: authLink.concat(onErrorLink).concat(httpLink),
    // httpLink를 우리가 앞에 안쓰는 이유는 마지막에 거치는 링크기때문이다
    // 종료되는 링크이기에.. 마지막에 안써주면 종료 링크가 없다 오류뜬다!
    // 에러생기는걸 보기위해서는 onErrorLink를 포함해줘야함
    cache,
    });

56. message는 Upload와 같이.. 베이스 스택에서 출발함!
    즉 업로드화면, 탭화면, 업로드폼화면, 메시지 이렇게 4개가 베이스 스택임
    그래서 메시지 안에서 다시 스택네비게이터가 시작해 헤더가 두개되는데 하나 없애줄것임

57. <FlatList
    inverted
    // inverted 는 밑에서부터 내용을 생성할것임

58. KeyboardAvoidingView 를 사용하여 대화입력시 키보드떄문에 가져리는 현상을 막는다

59. flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")}; 이걸
    통해서 메시지 좌우 나눠서 보이게가능!

60. 중요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    사진은 내가 이미 보낸정보가 캐쉬에 자동 저장(메소드통해)됐기때문에 우리가 오브젝트 저장을 할필요없었는데
    코맨드는 우리가 직접 오브젝트 형태로 저장해줘야한다! 왜냐하면 예전처럼 사진을 올렸을때
    모든객체를 가져온것처럼 할수있겠지만 메시지는 모든 객체를 가져오진않기에 오브젝트 만들어야함
    우리는 id만 받기떄문에..
    data: {
    sendMessage: { ok, id },<---여기!!!
    },
    } = result;
    if (ok && meData) {
    const { message } = getValues();
    const messageObj = { <--그래서 여기를 다 작성해줘야함!!

61. seeRoom(id: $id) {
    id

    # id 필수로 넣어줘야함.. 그래야 Room:2 <- 이렇게 아폴로캐쉬가 구분해줌!!

    apollo가 id를 갖고 있는 message들을 포함하고있는 Room이 있단걸 알수있음
    프론트 앤드에서도 이와같은걸 비슷하게했었음!

62. inverted통해 메시지를 밑에서 부터 보여주는데.. 제일 최근꺼부터 밑에서부터 위로 간다..
    그래서 메시지 전체 순서를 바꿔줘야한다!
    그래서 data={data.seeRoom.message.reverse()} 할려는데 여긴 read-only?라서 배열이 고정됨

63. const messages = [...(data?.seeRoom?.messages ?? [])];
    //...(data?.seeRoom?.messages이부분은 우리가 메시지 순서를 바꿀수없는 읽기 전용임
    //그래서 다른 어레이로 복사할것임
    //저 문법해석하면.. 만약 데이터 씨룸 메시지가 있다면 그걸 배열안에 펼쳐줄거고
    //만약 없다면 빈배열을 줄것임.. 점세개는 우리가 배열을 들고있어야 풀수있음
    왜냐하면 저 메시지 받는곳이 renderItem이라 이친구는 배열을 받기떄문!!

64. 실시간 npm install @apollo/client subscriptions-transport-ws

65. connectionParams: () => ({
    //connectionParams을 통해 webSocket의 context에 토큰을 실어 보낼수있음..딱한번만보내고 계속저장됨
    token: tokenVar(), 아폴로js통해서 넣고 있는데
    백앤드가보니..토큰이 텅텅 비었다.. 그래서 실시간이 안됨
    그이유는 connectionParams는 tokenVar()를 가져오기위해서는 기다려야하는데.. 안기다리고 먼저 만들어
    지기 떄문이다. http는 항상 토큰이 포함되어 나가기에 괜찮지만, 웹소캣은 한번만 만들어지는데
    그 한번만들어질때 안넣어주면 실시간 영영 안나옴!

    connectionParams: {
    token: tokenVar(),
    }, 얘는 한번만 실행되지만

    --중요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    connectionParams: () => ({
    token: tokenVar(),
    }), 얘는 계속 실행되게 만드는 거임!!

    아마 onClick = {submit}, onClick = {()=>submit()} 이 다른이유는 이거일듯..
