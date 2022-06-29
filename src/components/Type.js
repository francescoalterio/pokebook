import { View, Text, Image, StyleSheet } from "react-native";
import { typesColor } from "../constants/colors";

const Type = ({ type }) => {
  const background = typesColor[type];
  const typeSplited = type.split("");
  typeSplited[0] = typeSplited[0].toUpperCase();
  const capitalizeType = typeSplited.join("");
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Image
        style={{ width: 15, height: 15 }}
        source={
          type === "bug"
            ? require("./../../assets/type-icons/bug.png")
            : type === "dark"
            ? require("./../../assets/type-icons/dark.png")
            : type === "dragon"
            ? require("./../../assets/type-icons/dragon.png")
            : type === "electric"
            ? require("./../../assets/type-icons/electric.png")
            : type === "fairy"
            ? require("./../../assets/type-icons/fairy.png")
            : type === "fighting"
            ? require("./../../assets/type-icons/fighting.png")
            : type === "fire"
            ? require("./../../assets/type-icons/fire.png")
            : type === "flying"
            ? require("./../../assets/type-icons/flying.png")
            : type === "ghost"
            ? require("./../../assets/type-icons/ghost.png")
            : type === "grass"
            ? require("./../../assets/type-icons/grass.png")
            : type === "ground"
            ? require("./../../assets/type-icons/ground.png")
            : type === "ice"
            ? require("./../../assets/type-icons/ice.png")
            : type === "normal"
            ? require("./../../assets/type-icons/normal.png")
            : type === "poison"
            ? require("./../../assets/type-icons/poison.png")
            : type === "psychic"
            ? require("./../../assets/type-icons/psychic.png")
            : type === "rock"
            ? require("./../../assets/type-icons/rock.png")
            : type === "steel"
            ? require("./../../assets/type-icons/steel.png")
            : type === "water"
            ? require("./../../assets/type-icons/water.png")
            : undefined
        }
      />
      <Text style={styles.text}>{capitalizeType}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 5,
  },
});

export default Type;
