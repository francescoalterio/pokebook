import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import SearchBar from "../components/SearchBar";
import useDataSearch from "../hooks/useDataSearch";
import { ReactReduxContext } from "react-redux";
import AbilityCard from "../components/AbilityCard";

const Abilities = () => {
  const { dataList, inputValue, setInputValue } =
    useDataSearch("abilityLastSearch");

  useEffect(() => {
    console.log(dataList);
  }, [dataList]);
  return (
    <ScrollView>
      <View
        style={[{ marginTop: Constants.statusBarHeight }, styles.container]}
      >
        <SearchBar
          value={inputValue}
          setValue={setInputValue}
          placeholder="Search any Ability"
        />
        <View style={styles.abilitesContainer}>
          {dataList.map((ability) => (
            <AbilityCard
              key={ability.id}
              id={ability.id}
              nameParsed={ability.nameParsed}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  abilitesContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: 10,
  },
});

export default Abilities;
