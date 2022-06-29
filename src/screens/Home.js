import { useState } from "react";
import { View, Text, Button } from "react-native";
import Pokemon from "./Pokemon";

const Home = () => {
  const [pokemonId, setPokemonId] = useState(1);
  return (
    <View style={{ flex: 1 }}>
      <Pokemon id={pokemonId} setPokemonId={setPokemonId} />
    </View>
  );
};

export default Home;
