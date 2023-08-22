import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
// import SearchBar from "../../components/SearchBar";
import styles from "./style";
import COLORS from "../../styles/color";
import RenderNote from "../../components/RenderNotes";
import { useGlobalContext } from "../../context/context";

function Home({ navigation }) {
  const { notes } = useGlobalContext();

  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txtTitle}>Blue Notes</Text>

      {/* <SearchBar data={data} onChange={setData} /> */}

      <FlatList
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>No Data!</Text>
        }
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <RenderNote item={item} navigation={navigation} />;
        }}
      />
      <TouchableOpacity
        style={styles.newNoteButton}
        onPress={() => navigation.navigate("Notes", { search: false })}
      >
        <AntDesign name="pluscircle" size={60} color={COLORS.addButton} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Home;
