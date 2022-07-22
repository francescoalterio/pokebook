import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import Screens from "./src/Screens";

import store from "./src/store";

import mobileAds, {
  AppOpenAd,
  TestIds,
  AdEventType,
  useAppOpenAd,
} from "react-native-google-mobile-ads";

const adUnitId = TestIds.APP_OPEN;

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
    <View />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
