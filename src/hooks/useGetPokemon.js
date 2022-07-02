import { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PokemonClient } from "pokenode-ts";

const useGetPokemon = (id, setPokemonId) => {
  const [pokemonData, setPokemonData] = useState();
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const api = new PokemonClient();
    if (id) {
      api.getPokemonById(id).then((data) => {
        const nameParsed = data.name
          .split("-")
          .map((x) => {
            const xSplited = x.split("");
            xSplited[0] = xSplited[0].toUpperCase();
            return xSplited.join("");
          })
          .join(" ");
        setPokemonData({ ...data, nameParsed });
      });
    } else {
      api.getPokemonById(route.params.id).then((data) => {
        const nameParsed = data.name
          .split("-")
          .map((x) => {
            const xSplited = x.split("");
            xSplited[0] = xSplited[0].toUpperCase();
            return xSplited.join("");
          })
          .join(" ");
        setPokemonData({ ...data, nameParsed });
      });
    }
  }, [id]);

  const handleNext = async () => {
    if (id === 905) {
      await AsyncStorage.setItem("lastPokemon", JSON.stringify(10001));
      setPokemonId(10001);
    } else if (id === 10249) {
      await AsyncStorage.setItem("lastPokemon", JSON.stringify(1));
      setPokemonId(1);
    } else {
      await AsyncStorage.setItem("lastPokemon", JSON.stringify(id + 1));
      setPokemonId(id + 1);
    }
  };

  const handleBefore = async () => {
    if (id === 1) {
      await AsyncStorage.setItem("lastPokemon", JSON.stringify(10249));
      setPokemonId(10249);
    } else if (id === 10001) {
      await AsyncStorage.setItem("lastPokemon", JSON.stringify(905));
      setPokemonId(905);
    } else {
      await AsyncStorage.setItem("lastPokemon", JSON.stringify(id - 1));
      setPokemonId(id - 1);
    }
  };

  const handleReturn = () => {
    if (route.params.screenReturn === "SearchScreen") {
      navigation.navigate(route.params.screenReturn, { refresh: true });
    }
    if (!route.params.screenReturn) {
      navigation.goBack();
    }
  };

  return { pokemonData, handleNext, handleBefore, handleReturn };
};

export default useGetPokemon;
