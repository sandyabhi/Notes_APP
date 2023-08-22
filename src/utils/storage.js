import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

// SAVE DATA
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

// GET DATA
const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return Promise.reject(e);
  }
};

// DELETE DATA
const deleteData = async (key, value) => {
  try {
    let data = await getData(key);

    for (let i = 0; i < data.length; i++) {
      if (data[i].createdAt === value.createdAt) {
        console.log("equals", data[i].createdAt, "--", value.createdAt);
        data.splice(i, 1);
      }
    }

    if (value.notificationId !== null) {
      await Notifications.cancelScheduledNotificationAsync(
        value.notificationId
      );
    }

    await AsyncStorage.setItem(key, JSON.stringify(data));

    return Promise.resolve();
  } catch (e) {
    Alert.alert("Error");
  }
};

export { storeData, getData, deleteData };
