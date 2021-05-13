import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import styled from "styled-components/native";
import { Alert, Image, StatusBar, Text, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/core";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SliderContainer = styled.View``;

const ActionsContainer = styled.View`
  flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const PhotoActions = styled(Actions)`
  flex-direction: row;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 10px 25px;
  border-radius: 4px;
`;

const PhotoActionText = styled.Text`
  font-weight: 600;
`;

export default function TakePhoto({ navigation }) {
  const camera = useRef();
  const [takenPhoto, setTakenPhoto] = useState("");

  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  // 카메라 전면쓸지 후면쓸지!!
  const getPermissions = async () => {
    //사진찍을수있는지 권한을 부여받아야한다!
    const { granted } = await Camera.requestPermissionsAsync();
    // granted 는 false or true 값을 가진다!
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const onZoomValueChange = (e) => {
    setZoom(e);
  };

  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
      //리턴값주는 await MediaLibrary.createAssetAsync(uri) 필요없고
      //바로 저장해주는 MediaLibrary.saveToLibraryAsync(takenPhoto); 쓰면됨!
    }
    // console.log("Will upload", takenPhoto);
    navigation.navigate("UploadForm", {
      file: takenPhoto,
      //찍은 사진을 업로드form으로 이동시킬것임
    });
  };
  const onUpload = () => {
    Alert.alert("Save photo?", "Save photo & upload or just upload", [
      //유저에게 팝업 창을 잠시 보여줄수있음!
      //alert("~~") 할수있지만 기능이 별로없어서 Alert.alert를 쓰면 더 많은게 가능!
      //함수를 가질수도 있음
      {
        text: "Save & Upload",
        onPress: () => goToUpload(true),
      },
      {
        text: "Just Upload",
        onPress: () => goToUpload(false),
      },
    ]);
  };

  const onCameraReady = () => setCameraReady(true);
  // 카메라가 찍을준비 완료시킴

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      // const photo = await camera.current.takePictureAsync({
      const { uri } = await camera.current.takePictureAsync({
        //takePictureAsync 사진찍게 해주는 함수임
        quality: 1,
        // 사진 품질 1이 맥시멈임
        exif: true,
        //exif는 사진에 대한 정보를 포함한 메타데이터이다, (장소등등//)
      });
      setTakenPhoto(uri);
      // const asset = await MediaLibrary.createAssetAsync(uri);
      // createAssetAsync사진찍은게 폰에 저장될것임 통해서.. uri는 현재
      //캐시속에 저장되어있음.. await MediaLibrary.createAssetAsync(uri); 이거쓰는순간
      //바로 사진첩에 저장됨.. 그전에 미리보기 통해서 유저에게 옵션 결정을 하게 할것임!
      // 우리는 리턴없이 사진찍고 Alert를 이용하여 yes or no에 따라
      //await MediaLibrary.saveToLibraryAsync(takenPhoto) 친구를 이용하여 바로 저장할것임
      // 그리고 업로드할것임.. 저장관계없이
    }
  };

  const onDismiss = () => setTakenPhoto("");
  //취소시 찍은 사진 없애기

  const isFocused = useIsFocused();

  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {/* 사용자가 이화면에 왔을때는 베터리를 숨길것임 */}

      {/* 시계나오고 배터리나오는부분이다 */}

      {takenPhoto === "" ? (
        //사진찍은게 없다면 카메라가 나오게 하고 있으면
        //찍은 화면을 위에 뿌려줌..
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          //사진찍은 정보를 알기위해 ref씀!
          onCameraReady={onCameraReady}
          //onCameraReady가 true여야 카메라가 찍힐수있다
        >
          {/* 카메라 안에 넣기위해선 그냥 카메라안에 바로 넣으면됨 */}
          <CloseButton onPress={() => navigation.navigate("Tabs")}>
            <Ionicons name="close" color="white" size={30} />
          </CloseButton>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}

      {takenPhoto === "" ? (
        //사진찍은게 없다면 사진버튼 플래쉬 버튼등 을 나오게 하고
        //사진찍었다면,. 사진 저장할건지 업로드 할건지 옵션 메뉴가 나오게함
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 20 }}
              value={zoom}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          {/* 줌 게이지바를 설정하기 위해 설정함! */}
          <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashChange}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? "flash-off"
                      : flashMode === Camera.Constants.FlashMode.on
                      ? "flash"
                      : flashMode === Camera.Constants.FlashMode.auto
                      ? "eye"
                      : ""
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    cameraType === Camera.Constants.Type.front
                      ? "camera-reverse"
                      : "camera"
                  }
                />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        //사진찍은거 어떻게 할건지 골라야함
        <PhotoActions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dismiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </PhotoActions>
      )}
    </Container>
  );
}
