import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { Provider } from "react-redux";
import Screens from "./src/Screens";

import store from "./src/store";

import mobileAds, {
  AppOpenAd,
  TestIds,
  AdEventType,
  useAppOpenAd,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.APP_OPEN
  : "ca-app-pub-6947784507365792/1109280306";

export default function App() {
  const [adViewed, setAdViewed] = useState(false);
  const { load, show, isLoaded, isClosed, error, isOpened } =
    useAppOpenAd(adUnitId);

  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      load();
    });

  useEffect(() => {
    if (isLoaded && !adViewed) show();
  }, [isLoaded]);

  useEffect(() => {
    if (isOpened) setAdViewed(true);
  }, [isOpened]);

  useEffect(() => {
    if (error) setAdViewed(true);
  }, [error]);
  return adViewed ? (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Screens />
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        style={{ width: 200, height: 200 }}
        source={require("./assets/splash.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
