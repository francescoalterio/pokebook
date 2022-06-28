import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { PokemonClient } from "pokenode-ts";

const Pokemon = ({ id }) => {
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
    const api = new PokemonClient();

    api.getPokemonById(id).then((data) => setPokemonData(data));
  }, [id]);

  useEffect(() => {
    console.log(pokemonData);
  }, [pokemonData]);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Pokemon;
