import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PokemonClient } from "pokenode-ts";
import { typesBackgroundColor } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const AbilityCard = ({ id, nameParsed }) => {
  const [abilityData, setAbilityData] = useState();
  const [type, setType] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const api = new PokemonClient();
    if (id) {
      api.getAbilityById(id).then((data) => {
        setAbilityData(data);
      });
    }
  }, [id]);

  useEffect(() => {
    const api = new PokemonClient();
    if (abilityData) {
      api
        .getPokemonByName(abilityData.pokemon[0].pokemon.name)
        .then((data) => setType(data.types[0].type.name));
    }
  }, [abilityData]);

  const handleNavigate = () => {
    if (type)
      navigation.navigate("AbilityScreenAbilities", {
        id,
        type,
        nameParsed,
      });
  };
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: type ? typesBackgroundColor[type] : "#fff" },
      ]}
      onPress={handleNavigate}
    >
      <View style={styles.touchableChild}>
        {abilityData && (
          <>
            <Text style={[styles.text, styles.name]}>{nameParsed}</Text>
            <View style={styles.boxExtraInfo}>
              <Text style={[styles.text]}>
                #
                {(id + "").length === 1
                  ? `00${id}`
                  : (id + "").length === 2
                  ? `0${id}`
                  : id}
              </Text>
              <Text style={[styles.text]}>
                G-{abilityData.generation.name.split("-")[1].toUpperCase()}
              </Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "42%",
    height: 100,
    borderRadius: 20,
    marginBottom: 20,
  },
  touchableChild: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 10,
    paddingTop: 20,
  },
  id: {},
  boxExtraInfo: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#676767",
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "white",
  },
});

export default AbilityCard;
