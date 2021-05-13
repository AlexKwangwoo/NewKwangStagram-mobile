import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { colors } from "../colors";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
`;

export default function SelectPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");

  const getPhotos = async () => {
    //getAssetsAsync 사진을 가져올수있게 해줌!

    const { assets: photos } = await MediaLibrary.getAssetsAsync();

    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };
  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    // 사진 접근할수있는 권한이 필요하다 검증하는것..권한이 있는지 없는지
    if (
      (accessPrivileges === "none" || accessPrivileges === undefined) &&
      canAskAgain
    ) {
      //accessPrivileges none이면 유저가 권한 요청을 거절했거나 아직 요청을 안했다는것일때
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      //권한 요청함.
      if (accessPrivileges !== "none") {
        //요청이 거절안당한다면, 트루
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      //또는..요청 거절한게 아닐경우!!
      setOk(true);
      getPhotos();
    }
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        //우리가 선택한 사진이 업로드form으로 이동시킬것임
        navigation.navigate("UploadForm", {
          file: chosenPhoto,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto]);

  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = (uri) => {
    setChosenPhoto(uri);
  };
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? colors.blue : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );

  return (
    <Container>
      <StatusBar hidden={false} />

      {/* top은 우리가 현재 선택한 사진 */}
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
        {/* 선택된 사진이 보여지게 만든다! */}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>

      {/* 밑은 우리가 선택할수있는 사진이 될것임 */}
    </Container>
  );
}
