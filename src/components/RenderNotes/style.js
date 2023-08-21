import { StyleSheet, Dimensions } from "react-native";
import COLORS from "./../../styles/color";

const width = (Dimensions.get("window").width - 60) / 1;
const height = (Dimensions.get("window").height - 400) / 2;

const style = StyleSheet.create({
  noteArea: {
    backgroundColor: COLORS.notes,
    width: "100%",
    height: "auto",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 10,
    marginBottom: 10,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  txtNoteTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  txtNote: {
    color: "#000",
  },
});

export default style;
