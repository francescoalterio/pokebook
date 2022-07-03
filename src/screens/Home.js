import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Pokemon from "./Pokemon";

const Home = () => {
  const [pokemonId, setPokemonId] = useState();

  useEffect(() => {
    const getLastPokemon = async () => {
      const lastPokemon = await AsyncStorage.getItem("lastPokemon");
      if (lastPokemon) {
        const pokemonTypeParsed = JSON.parse(lastPokemon);
        setPokemonId(pokemonTypeParsed);
      } else {
        setPokemonId(1);
      }
    };
    getLastPokemon();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {pokemonId && (
        <Pokemon id={pokemonId} setPokemonId={setPokemonId} tabProp="HomeTab" />
      )}
    </View>
  );
};

export default Home;
