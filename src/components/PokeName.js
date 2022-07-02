import { View, Text, StyleSheet } from "react-native";
import Type from "../components/Type";

const PokeName = ({ pokemonId, name, typesList, card }) => {
  return (
    <View style={styles.pokeNameContainer}>
      <Text style={styles.id}>
        #
        {(pokemonId + "").length === 1
          ? `00${pokemonId}`
          : (pokemonId + "").length === 2
          ? `0${pokemonId}`
          : pokemonId}
      </Text>
      <Text
        style={[
          styles.name,
          { fontSize: name.split(" ").length >= 2 && card ? 20 : 30 },
        ]}
      >
        {name}
      </Text>
      <View style={styles.typeContainer}>
        {typesList.map((type) => (
          <Type type={type.type.name} key={type.type.url} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

    marginBottom: 5,
  },
  typeContainer: {
    flexDirection: "row",
  },
});

export default PokeName;
