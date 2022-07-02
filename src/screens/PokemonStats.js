import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import { typesColor } from "../constants/colors";

const PokemonStats = ({ pokemonData }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const stats = pokemonData.stats.map((stat) => {
      const name =
        stat.stat.name === "special-attack"
          ? "Sp. Atk"
          : stat.stat.name === "special-defense"
          ? "Sp. Def"
          : stat.stat.name
              .split("")
              .map((letter, index) =>
                index === 0 ? letter.toUpperCase() : letter
              )
              .join("");

      const porcentage = (stat.base_stat / 2) * 0.01;
      return { baseStat: stat.base_stat, name, porcentage };
    });
    setData(stats);
  }, [pokemonData]);
  return (
    <ScrollView style={styles.container}>
      {data && (
        <>
          <Text
            style={[
              styles.title,
              { color: typesColor[pokemonData.types[0].type.name] },
            ]}
          >
            Base Stats
          </Text>
          {data.map((item) => (
            <View key={item.name} style={styles.dataContainer}>
              <Text style={styles.dataKey}>{item.name}</Text>
              <Text style={styles.dataValue}>{item.baseStat}</Text>
              <View style={styles.progressBarContainer}>
                <Progress.Bar
                  progress={item.porcentage}
                  width={null}
                  color={typesColor[pokemonData.types[0].type.name]}
                />
              </View>
            </View>
          ))}
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
    flex: 2,
  },
  progressBarContainer: {
    flex: 5,
  },
});

export default PokemonStats;
