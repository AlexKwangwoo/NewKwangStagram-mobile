import React from "react";
import { FlatList, Text, View } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { gql, useQuery } from "@apollo/client";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
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

export default function Feed() {
  const { data, loading } = useQuery(FEED_QUERY);
  // console.log("사진!@!!!", data);
  const renderPhoto = ({ item: photo }) => {
    // renderItem을 받는 renderPhoto에서의
    //{ item }<-정해진거임 은 실제로 받는 props이름이라 따로 :photo해줘야 내가쓸변수명이됨
    return <Photo {...photo} />;
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
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
