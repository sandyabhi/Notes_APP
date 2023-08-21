import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import updateNote from "./updateNote";

export default function saveNote(note, navigation) {
  async function getKey() {
    const note = await AsyncStorage.getItem("0");

    if (note === null) {
      await AsyncStorage.getItem("0", "1");
      return 1;
    } else {
    }
  }

  if (note) {
  } else {
  }
}
