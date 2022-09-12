import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import logo from "../../assets/logo.png";

const HomeScreen = ({ navigation }) => {
  let openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.status === false) {
      alert("permision to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    }

    let image = pickerResult.uri;
    image === null
      ? alert("File tidak ditemukan, coba ulangi lagi!")
      : navigation.navigate("Preview", { image });
  };
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.instructions}>
        Share a photo from ur phone with a friend, just press the button below!
      </Text>

      <FontAwesome.Button
        name="folder"
        style={styles.button}
        onPress={openImagePicker}
      >
        Pick a Photo
      </FontAwesome.Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    padding: 20,
    borderRadius: 5,
  },
});
