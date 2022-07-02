import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const useDataSearch = (storage) => {
  const [inputValue, setInputValue] = useState("");
  const [dataStateList, setDataStateList] = useState([]);

  const dataList = useSelector((state) =>
    storage === "pokemonLastSearch"
      ? state.pokemonList.value
      : state.abilityList.value
  );

  const route = useRoute();

  const getLastSearch = async () => {
    const listLastSearch = await AsyncStorage.getItem(storage);
    console.log(listLastSearch);
    if (listLastSearch) {
      const listParsed = JSON.parse(listLastSearch);

      const listMaped = listParsed.map((pokemonId) => {
        return dataList.find((x) => pokemonId === x.id);
      });

      setDataStateList(listMaped);
    } else {
      const shortList = dataList.slice(0, 20);
      setDataStateList(shortList);
    }
  };

  useEffect(() => {
    if (inputValue) {
      const pokemonFiltered = dataList.filter((pokemon) =>
        pokemon.nameParsed.toLowerCase().includes(inputValue.toLowerCase())
      );
      const shortList =
        pokemonFiltered.length > 20
          ? pokemonFiltered.slice(0, 19)
          : pokemonFiltered;
      setDataStateList(shortList);
    } else {
      getLastSearch();
    }
  }, [inputValue]);

  useEffect(() => {
    if (route.params) getLastSearch();
    console.log(route.params);
  }, [route.params]);

  return { dataList: dataStateList, inputValue, setInputValue };
};

export default useDataSearch;
