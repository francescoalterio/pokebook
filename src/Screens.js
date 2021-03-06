import { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Abilities from "./screens/Abilities";
import Search from "./screens/Search";
import { useSetIconTabBar } from "./hooks/useSetIconTabBar";

import { PokemonClient } from "pokenode-ts";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonList } from "./store/pokemonListSlice";
import { parseData } from "./utils/parseData";
import Pokemon from "./screens/Pokemon";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAbilityList } from "./store/abilityListSlice";
import Ability from "./screens/Ability";
import ModalFilter from "./screens/ModalFilter";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Screens = () => {
  const { setIconTabBar } = useSetIconTabBar();
  const pokemonList = useSelector((state) => state.pokemonList.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const api = new PokemonClient();
    api
      .listPokemons(0, 10000)
      .then(parseData)
      .then((result) => dispatch(setPokemonList(result)));

    api
      .listAbilities(0, 10000)
      .then(parseData)
      .then((result) => dispatch(setAbilityList(result)));
  }, []);

  useEffect(() => {
    console.log(pokemonList);
  }, [pokemonList]);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={setIconTabBar}>
        <Tab.Screen
          name="HomeTab"
          options={{ headerShown: false, title: "Home" }}
        >
          {() => (
            <Stack.Navigator initialRouteName="HomeScreen">
              <Stack.Screen
                name="HomeScreen"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PokemonScreenHome"
                component={Pokemon}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AbilityScreenHome"
                component={Ability}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="SearchTab"
          options={{ headerShown: false, title: "Search" }}
        >
          {() => (
            <Stack.Navigator initialRouteName="SearchScreen">
              <Stack.Group>
                <Stack.Screen
                  name="SearchScreen"
                  component={Search}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PokemonScreenPokemons"
                  component={Pokemon}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AbilityScreenPokemons"
                  component={Ability}
                  options={{ headerShown: false }}
                />
              </Stack.Group>
              <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen
                  name="ModalFilter"
                  component={ModalFilter}
                  options={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "rgba(0,0,0,0)" },
                  }}
                />
              </Stack.Group>
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="AbilitiesTab"
          options={{ headerShown: false, title: "Abilities" }}
        >
          {() => (
            <Stack.Navigator initialRouteName="AbilitiesScreen">
              <Stack.Screen
                name="AbilitiesScreen"
                component={Abilities}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AbilityScreenAbilities"
                component={Ability}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PokemonScreenAbilities"
                component={Pokemon}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
