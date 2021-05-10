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
   - expo install expo-app-loading
     (뭔가 인스톨할때 앱 멈추게안한다)
   - expo install expo-font
   - expo install expo-asset asset에 있는 친구를 쓰기위해
   - npm install @react-navigation/native (네비게이션)
   - expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view(한줄로 만들어서 인스톨)
   - npm install @react-navigation/stack
   - npm install styled-components
   - expo install react-native-appearance

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

12.
