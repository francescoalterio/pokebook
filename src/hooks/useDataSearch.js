import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { PokemonClient } from "pokenode-ts";
import { parseData } from "../utils/parseData";

const useDataSearch = (storage) => {
  const [inputValue, setInputValue] = useState("");
  const [dataStateList, setDataStateList] = useState([]);
  const [typesFilter, setTypesFilter] = useState([]);

  const globalDataList = useSelector((state) =>
    storage === "pokemonLastSearch"
      ? state.pokemonList.value
      : state.abilityList.value
  );

  const [dataList, setDataList] = useState(globalDataList);

  const route = useRoute();

  const getLastSearch = async () => {
    const listLastSearch = await AsyncStorage.getItem(storage);
    if (listLastSearch) {
      const listParsed = JSON.parse(listLastSearch).map((x) => Number(x));

      const listMaped = listParsed.map((pokemonId) => {
        return globalDataList.find((x) => pokemonId === x.id);
      });

      setDataStateList(listMaped);
    } else {
      const shortList = globalDataList.slice(0, 20);
      setDataStateList(shortList);
    }
  };

  useEffect(() => {
    if (inputValue) {
      const dataFiltered = dataList.filter((pokemon) =>
        pokemon.nameParsed.toLowerCase().includes(inputValue.toLowerCase())
      );
      const shortList =
        dataFiltered.length > 20 ? dataFiltered.slice(0, 19) : dataFiltered;
      setDataStateList(shortList);
    } else {
      console.log("types ", typesFilter);
      if (typesFilter.length === 0) {
        getLastSearch();
      } else {
        console.log("4");
        setDataStateList(dataList);
      }
    }
  }, [inputValue, dataList]);

  useEffect(() => {
    if (route.params && !inputValue) {
      if (route.params.refresh && typesFilter.length === 0) {
        setDataList(globalDataList);
        getLastSearch();
      }
    }
    if (route.params) {
      if (!route.params.refresh) {
        console.log(route.params[0], route.params[1], route.params.length);
        if (route.params.length === 0) {
          setDataList(globalDataList);
        }
        setTypesFilter(route.params);
        const getPokemosType = async () => {
          const api = new PokemonClient();
          if (route.params[0]) {
            api.getTypeByName(route.params[0]).then((x) => {
              const xMaped = x.pokemon.map((pokemon) => pokemon.pokemon);
              const xParsed = parseData({ results: xMaped });
              if (route.params[1]) {
                api.getTypeByName(route.params[1]).then((y) => {
                  const yMaped = y.pokemon.map((pokemon) => pokemon.pokemon);
                  const yParsed = parseData({ results: yMaped });
                  const XYFiltered = xParsed.filter((xP) =>
                    yParsed.find((yP) => yP.id === xP.id)
                  );
                  console.log(XYFiltered);
                  setDataList([...XYFiltered]);
                });
              } else {
                setDataList([...xParsed]);
              }
            });
          }
        };
        getPokemosType();
      }
    }
  }, [route.params, inputValue]);

  return { dataList: dataStateList, inputValue, setInputValue, typesFilter };
};

export default useDataSearch;
