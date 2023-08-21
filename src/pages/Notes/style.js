import { StyleSheet } from "react-native";
import COLORS from "../../styles/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: COLORS.NoteBackground,
    margin: 20,
  },
  txtInput: {
    fontSize: 18,
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    width: "100%",
    height: "15%",
  },
  txtTitleNote: {
    width: "100%",
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 20,
    color: "#808080",
  },
  actionButton: {
    borderRadius: 10,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});

export default styles;
