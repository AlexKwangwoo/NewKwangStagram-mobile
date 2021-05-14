import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }) {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    //fetchMore 은 더많은 결과를 새로운 변수와 함께 fetch할수있게 해줌
    //또한 기존의 데이터를 유지한체 새로운 데이터를 가져옴!
    variables: {
      offset: 0,
    },
  });
  // console.log("사진!@!!!", data);
  const renderPhoto = ({ item: photo }) => {
    // renderItem을 받는 renderPhoto에서의
    //{ item }<-정해진거임 은 실제로 받는 props이름이라 따로 :photo해줘야 내가쓸변수명이됨
    return <Photo {...photo} />;
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    //여기서 refetch는 FEED_QUERY를 재실행함
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);

  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 25 }}
      onPress={() => navigation.navigate("Messages")}
    >
      <Ionicons name="paper-plane" color="white" size={20} />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.2}
        // 0은 화면끝 0.1은 화면 끝보다 살짝 위에.. 그래서 살짝위쯤왔을때 미리 로드 가능!(1해도됨)
        //onEndReachedThreshold 는 사용자가 맨밑까지 안내려도 중간쯤만 내려도 미리 데이터로드할수있게
        //그 중간 위치를 설정할수있음!
        onEndReached={() =>
          //onEndReached 는 사용자가 스크롤 마지막에 도달했다고 폰이 인지했을때
          //호출되는 함수임 onEndReachedThreshold의 값에 따라 바뀜!!
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
              //이제껏까지 보여줬던 seeFeed를 계산할것임
            },
          })
        }
        refreshing={refreshing}
        //refreshing이 작동하기위해서는 onRefresh가 필요하다! refreshing가 true돼야 리프레쉬됨
        onRefresh={refresh}
        //onRefresh는 우리가 당겼을때 새로 실행될 함수를 말한다!
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        //그냥 key라고 생각하면됨 단지 string을 받아야함!
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
}
