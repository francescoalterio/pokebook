import { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Search from "./screens/Search";
import { useSetIconTabBar } from "./hooks/useSetIconTabBar";

import { PokemonClient } from "pokenode-ts";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonList } from "./store/pokemonListSlice";
import { parsePokemon } from "./utils/parsePokemon";

const Tab = createBottomTabNavigator();

const Screens = () => {
  const { setIconTabBar } = useSetIconTabBar();
  const pokemonList = useSelector((state) => state.pokemonList.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const api = new PokemonClient();

    api
      .listPokemons(0, 898)
      .then(parsePokemon)
      .then((result) => dispatch(setPokemonList(result)));
  }, []);

  useEffect(() => {
    console.log(pokemonList);
  }, [pokemonList]);
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={setIconTabBar}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
