import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { typesColor } from "../constants/colors";

const PokemonAbout = ({ pokemonData }) => {
  console.log(pokemonData);

  const [data, setData] = useState();

  useEffect(() => {
    const types = pokemonData.types.map((type) => type.type.name);
    const height = pokemonData.height / 10;
    const weight = pokemonData.weight / 10;
    const abilities = pokemonData.abilities.map((ability) => {
      const abilityParsed = ability.ability.name
        .split("-")
        .map((word) => {
          const wordSplited = word.split("");
          wordSplited[0] = wordSplited[0].toUpperCase();
          return wordSplited.join("");
        })
        .join(" ");

      return { hidden: ability.is_hidden, name: abilityParsed };
    });

    const objectData = {
      types,
      height,
      weight,
      base_exp: pokemonData.base_experience,
      abilities,
    };
    setData(objectData);
  }, [pokemonData]);
  return (
    <ScrollView style={styles.container}>
      {data && (
        <>
          <Text style={[styles.title, { color: typesColor[data.types[0]] }]}>
            Pokemon Data
          </Text>
          <View style={styles.dataContainer}>
            <Text style={styles.dataKey}>Height</Text>
            <Text style={styles.dataValue}>{data.height}m</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.dataKey}>Weight</Text>
            <Text style={styles.dataValue}>{data.weight}kg</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.dataKey}>Base Exp</Text>
            <Text style={styles.dataValue}>{data.base_exp}</Text>
          </View>
          <View style={styles.dataList}>
            <Text style={styles.dataKey}>Abilities</Text>
            <View style={styles.dataValue}>
              <FlatList
                data={data.abilities}
                renderItem={({ item, index }) => (
                  <Text
                    key={item.name}
                    style={[styles.dataValue, { marginBottom: 5 }]}
                  >
                    {index + 1}. {item.name} {item.hidden && "(hidden ability)"}
                  </Text>
                )}
              />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 50,
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dataList: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  dataKey: {
    fontWeight: "bold",
    flex: 4,
  },
  dataValue: {
    color: "#787777",
    fontWeight: "300",
    fontSize: 20,
    flex: 6,
  },
});

export default PokemonAbout;
