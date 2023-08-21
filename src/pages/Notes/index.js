import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Notifications from "expo-notifications";
import { Feather } from "@expo/vector-icons";
import styles from "./style";
// import { useNavigation } from "@react-navigation/native";
import { getData, storeData } from "../../utils/storage";
import { useGlobalContext } from "../../context/context";
import ModalNotification from "../../components/Notification";

export default function Notes({ route, navigation }) {
  const { notes, setNotes } = useGlobalContext();

  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState({
    title: "",
    note: "",
    createdAt: date,
    notificationId: null,
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params.note) {
      setNote(route.params.note);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 20,
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Feather name="bell" size={24} color="white" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, note]);

  const handleSave = async () => {
    try {
      if (note.title === "") return;

      //console.log("----------");
      // const stored = await getData("notes");

      // if (
      //   stored.map((item) => {
      //     if (item.title === note.title) {

      //     }
      //   })
      // )
      // console.log(note);
      const newNotesArr = [note, ...notes];
      //console.log("----------", newNotesArr);
      await storeData("notes", newNotesArr);

      //  console.log("----------");
      // const stored = await getData("notes");
      //      console.log(stored, "stores");

      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteData("notes", note);
      console.log("deel");
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  };

  // const deleteData = async (key, value) => {
  //   try {
  //     console.log("ddddddd");

  //     let data = await getData("notes");
  //     console.log(value.createdAt, data[2].createdAt);
  //     console.log(data);
  //     for (let i = 0; i < data.length; i++) {
  //       if (data[i].createdAt === value.createdAt) {
  //         console.log("equals");

  //         data.splice(i, 1);
  //         // console.log(value.createdAt, data[i].createdAt);
  //         console.log(data);
  //       }
  //     }

  //     if (value.notificationId !== null) {
  //       console.log(value.notificationId);
  //       await Notifications.cancelScheduledNotificationAsync(
  //         value.notificationId
  //       );
  //     }

  //     await AsyncStorage.setItem("notes", JSON.stringify(data));
  //     setNotes(data);
  //     navigation.navigate("Home");

  //     // await AsyncStorage.setItem(key, jsonValue);
  //     // return Promise.resolve();
  //   } catch (e) {
  //     return Promise.reject(e);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.txtTitleNote}
        autoFocus={true}
        maxLength={40}
        value={note.title}
        placeholder={"Title"}
        onChangeText={(text) => setNote({ ...note, title: text })}
      ></TextInput>
      <TextInput
        style={styles.txtInput}
        multiline={true}
        value={note.note}
        placeholder={"Description"}
        onChangeText={(text) => setNote({ ...note, note: text })}
      ></TextInput>
      <ModalNotification
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        date={date}
        setDate={setDate}
        note={note}
        setNote={setNote}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
          position: "absolute",
          bottom: 0,
        }}
      >
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: "#017CE9",
              flex: 1,
            },
          ]}
          // onPress={() => Save(note, navigation)}
          onPress={() => handleSave()}
        >
          <Feather name="save" size={29} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: "#DF4843",
              flex: 1,
            },
          ]}
          onPress={() => handleDelete()}
          // onPress={() => Delete(note, navigation)}
        >
          <Feather name="trash-2" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
