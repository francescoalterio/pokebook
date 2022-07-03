import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PokemonClient } from "pokenode-ts";
import { typesBackgroundColor } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AbilityCard = ({ id, nameParsed, width, tab }) => {
  const [abilityData, setAbilityData] = useState();
  const [type, setType] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const api = new PokemonClient();
    if (id) {
      api.getAbilityById(id).then((data) => {
        setAbilityData(data);
      });
    }
  }, [id]);

  useEffect(() => {
    const api = new PokemonClient();
    if (abilityData) {
      abilityData.pokemon.length > 0
        ? api
            .getPokemonByName(abilityData.pokemon[0].pokemon.name)
            .then((data) => setType(data.types[0].type.name))
        : setType("normal");
    }
  }, [abilityData]);

  const handleNavigate = async () => {
    const listLastSearch = await AsyncStorage.getItem("abilityLastSearch");
    if (listLastSearch) {
      const listParsed = JSON.parse(listLastSearch).map((x) => Number(x));
      const removePokemonRepeat = listParsed.filter((x) => x !== Number(id));
      if (removePokemonRepeat.length === 20) {
        removePokemonRepeat.pop();
        const addNewSearch = [id, ...removePokemonRepeat];
        await AsyncStorage.setItem(
          "abilityLastSearch",
          JSON.stringify(addNewSearch)
        );
      } else {
        const addNewSearch = [id, ...removePokemonRepeat];
        await AsyncStorage.setItem(
          "abilityLastSearch",
          JSON.stringify(addNewSearch)
        );
      }
    } else {
      await AsyncStorage.setItem(
        "abilityLastSearch",
        JSON.stringify([Number(id)])
      );
    }

    if (tab === "SearchTab") {
      navigation.navigate("AbilityScreenPokemons", {
        id,
        type,
        nameParsed,
        tab,
      });
    }
    if (tab === "AbilitiesTab") {
      navigation.navigate("AbilityScreenAbilities", {
        id,
        type,
        nameParsed,
        tab,
      });
    }
    if (tab === "HomeTab") {
      navigation.navigate("AbilityScreenHome", {
        id,
        type,
        nameParsed,
        tab,
      });
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: type ? typesBackgroundColor[type] : "#fff",
          width: width,
        },
      ]}
      onPress={handleNavigate}
    >
      <View style={styles.touchableChild}>
        {abilityData && (
          <>
            <Text style={[styles.text, styles.name]}>{nameParsed}</Text>
            <View style={styles.boxExtraInfo}>
              <Text style={[styles.text]}>
                #
                {(id + "").length === 1
                  ? `00${id}`
                  : (id + "").length === 2
                  ? `0${id}`
                  : id}
              </Text>
              <Text style={[styles.text]}>
                G-{abilityData.generation.name.split("-")[1].toUpperCase()}
              </Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 20,
    marginBottom: 20,
  },
  touchableChild: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 10,
    paddingTop: 20,
  },
  id: {},
  boxExtraInfo: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#676767",
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "white",
  },
});

export default AbilityCard;
