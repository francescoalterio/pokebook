import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { PokemonClient } from "pokenode-ts";

import { typesBackgroundColor, typesColor } from "../constants/colors";
import Constants from "expo-constants";
import { parseData } from "../utils/parseData";
import PokemonCard from "../components/PokemonCard";

const TopTab = createMaterialTopTabNavigator();

const Ability = () => {
  const [abilityData, setAbilityData] = useState();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const api = new PokemonClient();
    if (route.params.id) {
      api.getAbilityById(route.params.id).then((data) => {
        const pokemonExtracted = data.pokemon.map((x) => x.pokemon);
        const pokemonsParsed = parseData({ results: pokemonExtracted });
        setAbilityData({ ...data, pokemon: pokemonsParsed });
      });
    }
  }, [route.params.id]);

  const handleReturn = () => {
    if (route.params.tab === "SearchTab") {
      navigation.navigate("SearchScreen", { refresh: true });
    }
    if (route.params.tab === "AbilitiesTab") {
      navigation.navigate("AbilitiesScreen", { refresh: true });
    }
    if (route.params.tab === "HomeTab") {
      navigation.navigate("HomeScreen", { refresh: true });
    }
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: abilityData
            ? typesBackgroundColor[route.params.type]
            : "#fff",
        },
      ]}
    >
      <View style={styles.presentation}>
        <TouchableOpacity
          style={[styles.before, styles.arrow]}
          onPress={handleReturn}
        >
          <Ionicons name={"arrow-back"} size={20} color={"#fff"} />
        </TouchableOpacity>

        {abilityData && (
          <View style={[styles.nameContainer, ,]}>
            <Text style={[styles.name]}>{route.params.nameParsed}</Text>
          </View>
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
              backgroundColor: abilityData
                ? typesBackgroundColor[route.params.type]
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
                  backgroundColor: typesBackgroundColor[route.params.type],
                  flex: 1,
                }}
              >
                {abilityData && (
                  <View style={[styles.info, { paddingHorizontal: 40 }]}>
                    <Text
                      style={[
                        styles.title,
                        { color: typesColor[route.params.type] },
                      ]}
                    >
                      Effect
                    </Text>
                    <Text style={styles.dataValue}>
                      {
                        abilityData.effect_entries.find(
                          (x) => x.language.name === "en"
                        ).effect
                      }
                    </Text>
                  </View>
                )}
              </View>
            )}
          </TopTab.Screen>
          <TopTab.Screen name="Pokemons">
            {() => (
              <View
                style={{
                  backgroundColor: typesBackgroundColor[route.params.type],
                  flex: 1,
                }}
              >
                {abilityData && (
                  <View style={styles.info}>
                    <ScrollView>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <Text
                          style={[
                            styles.title,
                            { color: typesColor[route.params.type] },
                          ]}
                        >
                          Pokemon with this ability
                        </Text>
                        {abilityData.pokemon.map((item) => (
                          <PokemonCard
                            key={item.url}
                            pokemonId={item.id}
                            tab={route.params.tab}
                          />
                        ))}
                      </View>
                    </ScrollView>
                  </View>
                )}
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
    flex: 2,
    flexDirection: "row",
    paddingTop: "10%",
  },
  infoContainer: {
    flex: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
  },
  nameContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  info: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dataValue: {
    color: "#787777",
    fontWeight: "300",
    fontSize: 20,
    flex: 6,
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

export default Ability;
