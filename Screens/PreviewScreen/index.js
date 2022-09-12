import { StyleSheet, Text, View, Platform, Image } from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";

const PreviewScreen = ({ route }) => {
  const { image } = route.params;
  console.log("data hasil parsing: ", image);
  let openShareDialog = async () => {
    if (Platform.OS === "web") {
      alert("sharing not available on your platform");
      return;
    }

    let imageTmp = await ImageManipulator.manipulateAsync(image);
    // console.log("image temp:", imageTmp);
    await Sharing.shareAsync(imageTmp.uri);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: image }} />

      <FontAwesome.Button
        name="share"
        style={styles.button}
        onPress={openShareDialog}
      >
        Share Photo
      </FontAwesome.Button>
    </View>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    // backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  thumbnail: {
    width: 500,
    height: 500,
    resizeMode: "contain",
    marginBottom: 20,
  },
});
