import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return Promise.reject(e);
  }
};

const deleteData = async (key, value) => {
  try {
    console.log("ddddddd");

    let data = await getData("notes");

    for (let i = 0; i < data.length; i++) {
      if (data[i].createdAt === value.createdAt) {
        console.log("equals");

        data.splice(i, 1);
        // console.log(value.createdAt, data[i].createdAt);
        console.log(data);
      }
    }

    if (value.notificationId !== null) {
      console.log(value.notificationId);
      await Notifications.cancelScheduledNotificationAsync(
        value.notificationId
      );
    }

    await AsyncStorage.setItem("notes", JSON.stringify(data));
    // setNotes(data);
    navigation.navigate("Home");
  } catch (e) {
    Alert.alert("Error");
  }
};

export { storeData, getData, deleteData };
