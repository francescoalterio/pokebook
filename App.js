import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
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
  const { load, show, isLoaded, isClosed, error } = useAppOpenAd(adUnitId);

  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      load();
    });

  useEffect(() => {
    if (isLoaded) show();
  }, [isLoaded]);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Screens />
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
