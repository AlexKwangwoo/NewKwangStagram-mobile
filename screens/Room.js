import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import useMe from "../hooks/useMe";
import { Ionicons } from "@expo/vector-icons";

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      # id 필수로 넣어줘야함.. 그래야 Room:2 <- 이렇게 아폴로캐쉬가 구분해줌!!
      # apollo가 id를 갖고 있는 message들을 포함하고있는 Room이 있단걸 알수있음
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

const MessageContainer = styled.View`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
`;

const Author = styled.View``;

const Avatar = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 25px;
`;

const Message = styled.Text`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 16px;
  margin: 0px 10px;
`;

const TextInput = styled.TextInput`
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  color: white;
  border-radius: 1000px;
  width: 90%;
  margin-right: 10px;
`;

const InputContainer = styled.View`
  width: 95%;
  margin-bottom: 50px;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;

const SendButton = styled.TouchableOpacity``;

export default function Room({ route, navigation }) {
  const { data: meData } = useMe();
  const { register, setValue, handleSubmit, getValues, watch } = useForm();

  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && meData) {
      const { message } = getValues();
      setValue("message", "");

      //캐시에 들어갈 오브젝트 작성해야함
      const messageObj = {
        __typename: "Message",
        id,
        payload: message,
        user: {
          __typename: "User",
          username: meData.me.username,
          avatar: meData.me.avatar,
        },
        read: true,
      };
      // seeRoom(id: $id) { <-이친구랑 똑같아야함
      //   messages {
      //     id
      //     payload
      //     user {
      //       username
      //       avatar
      //     }
      //     read
      //   }
      // }

      const messageFragment = cache.writeFragment({
        //캐시에 써줄 형식을 작성해야함!(오브젝트는 data로 합쳐서 보냄)
        data: messageObj,
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        // # 여기도 위에처럼 똑같아야함
      });

      cache.modify({
        id: `Room:${route.params.id}`,
        //그 캐쉬를 이 룸에다 넣어줘야함!!
        //프론트엔드 예상해서 하면됨..똑같음
        fields: {
          //fields 이름은
          // seeRoom(id: $id) {
          //   messages { <- 여기가 될것임,, gql``안에서!
          messages(prev) {
            console.log("prevprev", prev);
            return [...prev, messageFragment];
            //값들을 합체! 단!! 배열을 가지고 왔기에,., 배열로 리턴해야함!
          },
        },
      });
    }
  };

  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );

  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });

  const onValid = ({ message }) => {
    if (!sendingMessage) {
      // 메시지가 보내지고 있는중이 아닐떄!!
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };

  useEffect(() => {
    register("message", { required: true });
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
    });
  }, []);

  const renderItem = ({ item: message }) => (
    <MessageContainer
      outGoing={message.user.username !== route?.params?.talkingTo?.username}
      //메시지 위치 정해주기!
    >
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
      </Author>
      <Message>{message?.payload}</Message>
    </MessageContainer>
  );

  const messages = [...(data?.seeRoom?.messages ?? [])];
  //...(data?.seeRoom?.messages이부분은 우리가 메시지 순서를 바꿀수없는 읽기 전용임
  //그래서 다른 어레이로 복사할것임
  //저 문법해석하면.. 만약 데이터 씨룸 메시지가 있다면 그걸 배열안에 펼쳐줄거고
  //만약 없다면 빈배열을 줄것임.. 점세개는 우리가 배열을 들고있어야 풀수있음

  messages.reverse();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior="height"
      keyboardVerticalOffset={100}
      // 키보드와의 거리 주기
    >
      <ScreenLayout loading={loading}>
        <FlatList
          style={{ width: "100%", marginVertical: 10 }}
          inverted
          // inverted 는 밑에서부터 내용을 생성할것임
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          style={{ width: "100%" }}
          data={messages}
          showsVerticalScrollIndicator={false}
          keyExtractor={(message, index) => "" + message.id + index}
          renderItem={renderItem}
        />
        <InputContainer>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            placeholder="Write a message..."
            returnKeyLabel="Send Message"
            returnKeyType="send"
            onChangeText={(text) => setValue("message", text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch("message")}
            // 매순간 ref로 우리가 정했던  register("message", { required: true });
            //값을 보고있을것임!! 그리고 setValue("message"를포함하고있는)가
            //우리가 매시지 올리면 setValue("message", ""); 통해 다시 메시지입력인풋 초기화할것임
          />
          <SendButton
            onPress={handleSubmit(onValid)}
            disabled={!Boolean(watch("message"))}
            //메시지가 없다면(undefined or null) 누르지 못하게 할것임!!
          >
            <Ionicons
              name="send"
              color={
                !Boolean(watch("message"))
                  ? "rgba(255, 255, 255, 0.5)"
                  : "white"
              }
              size={22}
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
