import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  BackHandler,
  Text,
  StatusBar,
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
  NativeModules
} from "react-native";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { commonStyles } from "../../../styles/commonStyle";
import { TodayOfferContainer } from "../../../components/homeScreen/todaysOffer/index";
import { TopCategory } from "../../../components/homeScreen/topCategory/index";
import { HomeSlider } from "../../../components/homeScreen/slider/index";
import { HeaderContainer } from "../../../components/homeScreen/headerContainer/index";
import styles from "./styles";
import { useValues } from "../../../../App";
import { CommonModal, Button } from "@src/commonComponent";
import { external } from "../../../styles/externalStyle";
import { appColors } from "@src/themes";
import { LocationContext } from "../../../utils/locationContext";
import { useDispatch, useSelector } from "react-redux";
import { vehicleTypeDataGet } from "../../../api/store/actions/vehicleTypeAction";
import SwipeButton from "@src/commonComponent/sliderButton";
import BottomTitle from "@src/components/homeScreen/bottomTitle";
import RNRestart from 'react-native-restart-newarch';
import { useAppNavigation } from "@src/utils/navigation";

export function HomeScreen() {
  const dispatch = useDispatch();
  const { textColorStyle, viewRTLStyle, isDark } = useValues();
  const isFocused = useIsFocused();
  const [selected, setSelected] = useState(false);
  const context = useContext(LocationContext);
  const { setPickupLocationLocal, setStopsLocal, setDestinationLocal } = context;
  const [isScrolling, setIsScrolling] = useState(true);
  const { translateData } = useSelector((state: any) => state.setting);
  const { reset } = useAppNavigation();

  useEffect(() => {
    getVehicleTypes();
  }, []);


  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          } else {
            Alert.alert(
              "Location Permission Required",
              "This app needs location permission to work properly. Please enable it in settings.",
              [
                {
                  text: "Go to Settings",
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: "Exit",
                  onPress: () => BackHandler.exitApp(),
                  style: "cancel",
                },
              ],
              { cancelable: false }
            );
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
    };
  }, []);

  const getVehicleTypes = async () => {
    const locations = [
      {
        lat: 21.196846,
        lng: 72.794473,
      },
    ];
    dispatch(vehicleTypeDataGet({ locations }));
  };

  useEffect(() => {
    const backAction = () => {
      setSelected(true);
      return true;
    };
    if (isFocused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      setPickupLocationLocal(null);
      setDestinationLocal(null);
      setStopsLocal([]);
      StatusBar.setBackgroundColor(appColors.buttonBg);
      StatusBar.setBarStyle("light-content");
      return () => {
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setBarStyle("dark-content");
      };
    }, [])
  );

  const exitAndRestart = () => {
    setSelected(false);

    setTimeout(() => {
      BackHandler.exitApp();
      reset({
        index: 0,
        routes: [{ name: "Splash" }],
      });
    }, 500);
  };


  return (
    <View
      style={[
        commonStyles.flexContainer,
        { backgroundColor: appColors.lightGray },
      ]}
    >
      <SafeAreaView style={styles.container}>
        <HeaderContainer />
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        scrollEnabled={isScrolling}
        contentContainerStyle={[
          styles.containerStyle,
          { backgroundColor: isDark ? appColors.bgDark : appColors.lightGray },
        ]}
      >
        <HomeSlider
          onSwipeStart={() => setIsScrolling(false)}
          onSwipeEnd={() => setIsScrolling(true)}
        />
        <TopCategory />
        <TodayOfferContainer />
        <BottomTitle />

      </ScrollView>
      <View>
        <CommonModal
          animationType="none"
          isVisible={selected}
          onPress={() => setSelected(false)}
          value={
            <View>
              <View style={styles.modelView}>
                <Text
                  style={[
                    commonStyles.mediumText23,
                    external.ti_center,
                    { color: textColorStyle },
                  ]}
                >
                  {translateData.exitTitle}
                </Text>
              </View>
              <View
                style={[
                  external.ai_center,
                  external.js_space,
                  external.mt_25,
                  { flexDirection: viewRTLStyle },
                ]}
              >
                <Button
                  width={"47%"}
                  title={translateData.no}
                  onPress={() => setSelected(false)}
                />
                <Button
                  width={"47%"}
                  backgroundColor={appColors.lightGray}
                  title={translateData.yes}
                  textColor={appColors.primaryText}
                  onPress={exitAndRestart}
                />
              </View>
            </View>
          }
        />
      </View>

      <View style={styles.swipeView}>
        <SwipeButton buttonText={translateData.backToActive} />
      </View>
    </View>
  );
}

