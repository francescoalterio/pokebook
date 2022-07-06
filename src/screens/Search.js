import useDataSearch from "../hooks/useDataSearch";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Constants from "expo-constants";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

const ModalStack = createNativeStackNavigator();

const Search = () => {
  const { dataList, inputValue, setInputValue, typesFilter } =
    useDataSearch("pokemonLastSearch");

  return (
    <ScrollView>
      <View
        style={[{ marginTop: Constants.statusBarHeight }, styles.container]}
      >
        <SearchBar
          value={inputValue}
          setValue={setInputValue}
          placeholder="Search any Pokemon"
          pokemonSearch
          typesFilter={typesFilter}
        />
        {dataList.map((pokemon) => (
          <PokemonCard
            key={pokemon.url}
            pokemonId={pokemon.id}
            tab="SearchTab"
            screenReturn="SearchScreen"
            screen="PokemonScreenPokemons"
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
});

export default Search;
