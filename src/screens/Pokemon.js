import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PokemonClient } from "pokenode-ts";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { typesBackgroundColor } from "../constants/colors";
import Constants from "expo-constants";
import Type from "../components/Type";
import PokemonAbout from "./PokemonAbout";
import PokemonStats from "./PokemonStats";

const TopTab = createMaterialTopTabNavigator();

const Pokemon = ({ id, setPokemonId }) => {
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
    const api = new PokemonClient();

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
  }, [id]);

  const handleNext = () => {
    if (id === 898) setPokemonId(1);
    else setPokemonId(id + 1);
  };

  const handleBefore = () => {
    if (id === 1) setPokemonId(898);
    else setPokemonId(id - 1);
  };

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
          <TouchableOpacity style={styles.before}>
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
            <View style={styles.pokeNameContainer}>
              <Text style={styles.id}>
                #
                {(pokemonData.id + "").length === 1
                  ? `00${pokemonData.id}`
                  : (pokemonData.id + "").length === 2
                  ? `0${pokemonData.id}`
                  : pokemonData.id}
              </Text>
              <Text style={styles.name}>{pokemonData.nameParsed}</Text>
              <View style={styles.typeContainer}>
                {pokemonData.types.map((type) => (
                  <Type type={type.type.name} key={type.type.url} />
                ))}
              </View>
            </View>
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
    paddingTop: 20,
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
  pokeNameContainer: {
    flex: 11,
    justifyContent: "center",
  },
  id: {
    color: "#17171B",
    fontWeight: "bold",
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  typeContainer: {
    flexDirection: "row",
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
