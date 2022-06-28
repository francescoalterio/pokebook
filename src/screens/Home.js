import { useState } from "react";
import { View, Text, Button } from "react-native";
import Constants from "expo-constants";
import Pokemon from "./Pokemon";

const Home = () => {
  const [pokemonId, setPokemonId] = useState(1);
  return (
    <View style={[{ marginTop: Constants.statusBarHeight, flex: 1 }]}>
      <Pokemon id={pokemonId} />
    </View>
  );
};

export default Home;
