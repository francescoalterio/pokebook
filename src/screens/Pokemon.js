import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { typesBackgroundColor } from "../constants/colors";
import Constants from "expo-constants";
import PokemonAbout from "./PokemonAbout";
import PokemonStats from "./PokemonStats";
import PokeName from "../components/PokeName";

import useGetPokemon from "../hooks/useGetPokemon";

const TopTab = createMaterialTopTabNavigator();

const Pokemon = ({ id, setPokemonId }) => {
  const { pokemonData, handleNext, handleBefore, handleReturn } = useGetPokemon(
    id,
    setPokemonId
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: pokemonData
            ? typesBackgroundColor[pokemonData.types[0].type.name]
            : "#fff",
        },
      ]}
    >
      <View style={styles.presentation}>
        {setPokemonId ? (
          <>
            <TouchableOpacity
              style={[styles.next, styles.arrow]}
              onPress={handleNext}
            >
              <Ionicons name={"arrow-forward"} size={20} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.before, styles.arrow]}
              onPress={handleBefore}
            >
              <Ionicons name={"arrow-back"} size={20} color={"#fff"} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.before, styles.arrow]}
            onPress={handleReturn}
          >
            <Ionicons name={"arrow-back"} size={20} color={"#fff"} />
          </TouchableOpacity>
        )}
        {pokemonData && (
          <>
            <View style={styles.imageContainer}>
              <Image
                style={{ width: 150, height: 150 }}
                source={{ uri: pokemonData.sprites.other.home.front_default }}
              />
            </View>
            <PokeName
              pokemonId={pokemonData.id}
              name={pokemonData.nameParsed}
              typesList={pokemonData.types}
            />
          </>
        )}
      </View>
      <View style={styles.infoContainer}>
        <TopTab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "rgba(0,0,0,0)",
              elevation: 0,
              marginBottom: 1,
            },
            tabBarLabelStyle: { fontWeight: "bold" },
            tabBarPressColor: "rgba(0,0,0,0)",
            tabBarActiveTintColor: "#fff",
            tabBarIndicatorStyle: {
              backgroundColor: pokemonData
                ? typesBackgroundColor[pokemonData.types[0].type.name]
                : undefined,
            },
          }}
        >
          <TopTab.Screen
            name="About"
            options={{
              tabBarActiveTientColor: "#000",
            }}
          >
            {() => (
              <View
                style={{
                  backgroundColor: pokemonData
                    ? typesBackgroundColor[pokemonData.types[0].type.name]
                    : undefined,
                  flex: 1,
                }}
              >
                <View style={styles.info}>
                  {pokemonData && <PokemonAbout pokemonData={pokemonData} />}
                </View>
              </View>
            )}
          </TopTab.Screen>
          <TopTab.Screen name="Stats">
            {() => (
              <View
                style={{
                  backgroundColor: pokemonData
                    ? typesBackgroundColor[pokemonData.types[0].type.name]
                    : undefined,
                  flex: 1,
                }}
              >
                <View style={styles.info}>
                  {pokemonData && <PokemonStats pokemonData={pokemonData} />}
                </View>
              </View>
            )}
          </TopTab.Screen>
        </TopTab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  presentation: {
    flex: 4,
    flexDirection: "row",
    paddingTop: "10%",
  },
  infoContainer: {
    flex: 6,
  },
  info: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  imageContainer: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    position: "absolute",
    top: "10%",
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 45,
    height: 45,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  next: {
    right: 20,
  },
  before: {
    left: 20,
  },
});

export default Pokemon;
