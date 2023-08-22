import { View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import "./styles";
import styles from "./styles";

export default function SearchBar({ data, onChange }) {
  const [searchData, setSearchData] = useState(data);

  const handleSearch = (text) => {};

  return (
    <View style={styles.searchArea}>
      <TextInput
        placeholder="Search Notes..."
        maxLength={50}
        onChangeText={(event) => handleSearch(event)}
      />
    </View>
  );
}

// TODO
