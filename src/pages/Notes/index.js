import { Alert } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { SafeAreaView, View, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./style";
import { deleteData, getData, storeData } from "../../utils/storage";
import { useGlobalContext } from "../../context/context";
import ModalNotification from "../../components/Notification";

export default function Notes({ route, navigation }) {
  const { notes, setNotes, updateContext } = useGlobalContext();

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
      const newNotesArr = [note, ...notes];

      await storeData("notes", newNotesArr);
      updateContext();
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteData("notes", note);
      updateContext();
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert("Error", "Some error is there!!");
    }
  };

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
        >
          <Feather name="trash-2" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
