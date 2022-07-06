import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import Type from "../components/Type";
import { typesBackgroundColor, typesColor } from "../constants/colors";

const ModalFilter = () => {
  const [typesSelected, setTypesSelected] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  const handleSelect = (type) => {
    if (typesSelected.includes(type)) {
      const typesSelectedFiltered = typesSelected.filter((x) => x !== type);
      setTypesSelected(typesSelectedFiltered);
    } else {
      if (typesSelected.length === 2) {
        setTypesSelected([typesSelected[1], type]);
      } else {
        setTypesSelected([...typesSelected, type]);
      }
    }
  };

  useEffect(() => {
    setTypesSelected(route.params);
  }, [route.params]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          typesSelected.length > 0
            ? typesSelected.length === 1
              ? typesBackgroundColor[typesSelected[0]]
              : typesBackgroundColor[typesSelected[1]]
            : typesBackgroundColor["grass"],
      }}
    >
      <View
        style={[styles.container, { marginTop: Constants.statusBarHeight }]}
      >
        <View
          style={{
            flex: 2,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 50,
            width: "100%",
            paddingHorizontal: "5%",
          }}
        >
          <View style={[styles.typesSelectedContainer]}>
            {typesSelected.map((x) => (
              <Type key={x} type={x} />
            ))}
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              style={styles.trash}
              onPress={() => setTypesSelected([])}
            >
              <Ionicons name={"trash"} size={20} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.before, styles.arrow]}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <Ionicons name={"arrow-back"} size={20} color={"#fff"} />
        </TouchableOpacity>
        <View style={styles.scrollContainer}>
          <ScrollView>
            <View
              style={{
                width: "100%",
                marginTop: 30,
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color:
                    typesSelected.length > 0
                      ? typesSelected.length === 1
                        ? typesColor[typesSelected[0]]
                        : typesColor[typesSelected[1]]
                      : "rgba(0,0,0,0.5)",
                }}
              >
                Select maximum 2 types
              </Text>
            </View>
            <View style={styles.typesContainer}>
              <TouchableOpacity
                onPress={() => handleSelect("bug")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/bug.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("dark")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/dark.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("dragon")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/dragon.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("electric")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/electric.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("fairy")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/fairy.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("fighting")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/fighting.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("fire")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/fire.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("flying")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/flying.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("grass")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/grass.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("ground")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/ground.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("ice")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/ice.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("normal")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/normal.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("poison")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/poison.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("psychic")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/psychic.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("rock")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/rock.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("steel")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/steel.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("water")}
                style={[styles.btnImg]}
              >
                <Image
                  style={styles.img}
                  source={require("./../../assets/typeIconsFilter/water.png")}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={styles.btnFilterContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchScreen", typesSelected)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 25,
              borderRadius: 10,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
              Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  arrow: {
    position: "absolute",
    top: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 45,
    height: 45,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 8,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    paddingTop: 20,
  },
  typesSelectedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 6,
    borderRadius: 5,
    justifyContent: "space-evenly",
    height: 40,
  },
  before: {
    left: 20,
  },
  btnImg: {
    width: 90,
    height: 90,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  btnFilterContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    paddingBottom: 30,
  },
  trash: {
    backgroundColor: "#fc4c4c",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default ModalFilter;
