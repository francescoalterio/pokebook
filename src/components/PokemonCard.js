import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { typesBackgroundColor, typesColor } from "../constants/colors";
import useGetPokemon from "../hooks/useGetPokemon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PokeName from "./PokeName";

const PokemonCard = ({ pokemonId, tab, screenReturn }) => {
  const { pokemonData } = useGetPokemon(pokemonId);
  const navigation = useNavigation();

  const handleNavigate = async () => {
    const listLastSearch = await AsyncStorage.getItem("pokemonLastSearch");
    if (listLastSearch) {
      const listParsed = JSON.parse(listLastSearch);
      const removePokemonRepeat = listParsed.filter((id) => id !== pokemonId);
      if (removePokemonRepeat.length === 20) {
        removePokemonRepeat.pop();
        const addNewSearch = [pokemonId, ...removePokemonRepeat];
        await AsyncStorage.setItem(
          "pokemonLastSearch",
          JSON.stringify(addNewSearch)
        );
      } else {
        const addNewSearch = [pokemonId, ...removePokemonRepeat];
        await AsyncStorage.setItem(
          "pokemonLastSearch",
          JSON.stringify(addNewSearch)
        );
      }
    } else {
      await AsyncStorage.setItem(
        "pokemonLastSearch",
        JSON.stringify([pokemonId])
      );
    }
    if (tab === "SearchTab") {
      navigation.navigate("PokemonScreenPokemons", {
        id: pokemonId,
        tab,
        screenReturn,
      });
    }
    if (tab === "AbilitiesTab") {
      navigation.navigate("PokemonScreenAbilities", {
        id: pokemonId,
        tab,
        screenReturn,
      });
    }
    if (tab === "HomeTab") {
      navigation.navigate("PokemonScreenHome", {
        id: pokemonId,
        tab,
        screenReturn,
      });
    }
  };

  return (
    <>
      {pokemonData && (
        <TouchableOpacity onPress={handleNavigate}>
          <View
            style={[
              styles.container,
              {
                backgroundColor:
                  typesBackgroundColor[pokemonData.types[0].type.name],
              },
            ]}
          >
            <PokeName
              pokemonId={pokemonId}
              name={pokemonData.nameParsed}
              typesList={pokemonData.types}
              card
            />
            <View style={{ flex: 9 }}></View>

            <View style={styles.imageContainer}>
              {pokemonData.sprites.other.home.front_default ? (
                <Image
                  style={{ width: 160, height: 160 }}
                  source={{ uri: pokemonData.sprites.other.home.front_default }}
                />
              ) : (
                <View
                  style={{
                    width: 130,
                    height: 130,
                    backgroundColor: typesColor[pokemonData.types[0].type.name],
                    borderRadius: 9999,
                    marginRight: 10,
                  }}
                >
                  <Ionicons name={"help"} size={130} color={"#fff"} />
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 130,
    backgroundColor: "purple",
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  imageContainer: {
    position: "absolute",
    right: 0,
    bottom: 20,
  },
});

export default PokemonCard;
