import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import * as Progress from "react-native-progress";
import { typesColor } from "../constants/colors";

const PokemonStats = ({ pokemonData }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const stats = pokemonData.stats.map((stat) => {
      return { baseStat: stat.base_stat, name: stat.stat.name };
    });
    setData(pokemonData.stats);
  }, [pokemonData]);
  return (
    <View style={styles.container}>
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
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.dataContainer}>
                <Text style={styles.dataKey}>HP</Text>
                <Text style={styles.dataValue}>56</Text>
                <View style={styles.progressBarContainer}>
                  <Progress.Bar
                    progress={0.3}
                    width={null}
                    color={typesColor[pokemonData.types[0].type.name]}
                  />
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
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
