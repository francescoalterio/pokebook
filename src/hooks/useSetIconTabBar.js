import Ionicons from "react-native-vector-icons/Ionicons";

export const useSetIconTabBar = () => {
  const setIconTabBar = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "HomeTab") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "SearchTab") {
        iconName = focused ? "search-circle" : "search-circle-outline";
      } else if (route.name === "AbilitiesTab") {
        iconName = focused ? "flame" : "flame-outline";
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#24a0ed",
    tabBarInactiveTintColor: "gray",
  });

  return { setIconTabBar };
};
