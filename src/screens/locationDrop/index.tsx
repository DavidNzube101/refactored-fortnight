import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import {
  History,
  Calender,
  AddressMarker,
  PickLocation,
  Save,
  Driving,
} from "@utils/icons";
import { styles } from "./styles";
import { commonStyles } from "../../styles/commonStyle";
import { external } from "../../styles/externalStyle";
import { PickUpDetails } from "../../components/pickUpDetails/index";
import { SolidLine, Button, Header } from "@src/commonComponent";
import { useValues } from "../../../App";
import { useRoute } from "@react-navigation/native";
import { GOOGLE_MAPS_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { userZone } from "../../api/store/actions/index";
import { vehicleTypeDataGet } from "../../api/store/actions/vehicleTypeAction";
import { getValue, setValue } from "@src/utils/localstorage";
import { appColors, windowHeight } from "@src/themes";
import { useAppNavigation } from "@src/utils/navigation";
import { useTheme } from "@react-navigation/native";

export function LocationDrop() {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { navigate, replace } = useAppNavigation();
  const [isProcessing, setIsProcessing] = useState(false);

  const [activeField, setActiveField] = useState<string | null>(null);
  const [destination, setDestination] = useState<string>("");
  const [stops, setStops] = useState<string[]>([]);
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const route = useRoute();
  const { categoryId, categoryOption, categoryOptionID, categorySlug } =
    route.params;
  const { selectedAddress, fieldValue } = route.params || {};
  const [fieldLength, setFieldLength] = useState<number>(0);
  const [addressData, setAddressData] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pickupCoords, setPickupCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [stopsCoords, setStopsCoords] = useState<
    Array<{ lat: number; lng: number }>
  >([]);
  const [loading, setLoading] = useState(true);
  const { driverData } = useSelector((state: any) => state.allDriver);
  const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);
  const { zoneValue } = useSelector((state: any) => state.zone);
  const [visible, setVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const translateX = useRef(new Animated.Value(-30)).current;
  const [showBar, setShowBar] = useState(false);
  const { selectedLocation } = route.params || {};
  const { settingData } = useSelector((state: any) => state.setting);
  const [recentDatas, setRecentDatas] = useState<string[]>([]);
  const { DateValue, TimeValue, field } = route.params || {};
  const [scheduleDate, setScheduleDate] = useState({
    DateValue: DateValue || "",
    TimeValue: TimeValue || "",
  });
  const [proceedLoading, setProceedLoading] = useState(false);
  const { translateData } = useSelector((state) => state.setting);


  useEffect(() => {
    setScheduleDate({
      DateValue: DateValue || "",
      TimeValue: TimeValue || "",
    });
  }, [DateValue, TimeValue]);

  useEffect(() => {
    const fetchRecentData = async () => {
      const stored = await getValue("locations");
      if (stored) {
        const parsedLocations = JSON.parse(stored);
        setRecentDatas(parsedLocations);
      }
    };
    fetchRecentData();
  }, []);

  let Recent = getValue("recentAddress")
    .then((Recent) => { })
    .catch((error) => {
      console.error("Error fetching recent address:", error);
    });

  useEffect(() => {
    if (fieldLength > 3) {
      setShowBar(true);
      startAnimation();
      setVisible(true);
    } else {
      setShowBar(false);
      setVisible(false);
    }
  }, [fieldLength]);

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: screenWidth,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: -30,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: screenWidth,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: -30,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
    });
  };

  const fetchAddressSuggestions = async (input: string) => {
    if (input.length >= 3) {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_MAPS_KEY}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status !== "OK") {
          console.error("API Error:", data.status, data.error_message || "");
          return;
        }
        if (data.predictions) {
          const places = data.predictions?.map(
            (prediction) => prediction.description
          );
          setSuggestions(places);
        }
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue("recentAddress", suggestion);
    Keyboard.dismiss();
    if (activeField === "pickupLocation") {
      setPickupLocation(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    } else if (activeField && activeField.startsWith("stop-")) {
      const stopIndex = parseInt(activeField.split("-")[1], 10) - 1;
      const updatedStops = [...stops];
      updatedStops[stopIndex] = suggestion;
      setStops(updatedStops);
    }

  };

  const handlerecentClick = (suggestion: string) => {
    Keyboard.dismiss();
    if (activeField === "pickupLocation") {
      setPickupLocation(suggestion.location);
    } else if (activeField === "destination") {
      setDestination(suggestion.location);
    } else if (activeField && activeField.startsWith("stop-")) {
      const stopIndex = parseInt(activeField.split("-")[1], 10) - 1;
      const updatedStops = [...stops];
      updatedStops[stopIndex] = suggestion;
      setStops(updatedStops);
    }
  };

  useEffect(() => {
    fetchAddressSuggestions(addressData);
  }, [addressData]);

  useEffect(() => {
    let length = 0;
    let addressData = "";

    if (activeField === "pickupLocation") {
      length = pickupLocation?.length;
      addressData = pickupLocation;
    } else if (activeField === "destination") {
      length = destination?.length;
      addressData = destination;
    } else if (activeField && activeField.startsWith("stop-")) {
      const stopIndex = parseInt(activeField.split("-")[1], 10) - 1;
      const stopData = stops[stopIndex];
      if (stopData !== undefined) {
        length = stopData?.length;
        addressData = stopData;
      }
    }
    setAddressData(addressData);
    setFieldLength(length);
  }, [activeField, stops, pickupLocation, destination]);

  const coordsData = async () => {
    const geocodeAddress = async (address) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${GOOGLE_MAPS_KEY}`
        );
        const dataMap = await response.json();
        if (dataMap.results.length > 0) {
          const location = dataMap.results[0].geometry.location;
          return {
            latitude: location.lat,
            longitude: location.lng,
          };
        }
      } catch (error) {
        console.error("Error geocoding address:", error);
      }
      return null;
    };

    const fetchCoordinates = async () => {
      try {
        const pickup = await geocodeAddress(pickupLocation);
        const destinationLoc = await geocodeAddress(destination);
        const stopsCoordsPromises = stops?.map(geocodeAddress);
        const stopsResults = await Promise.all(stopsCoordsPromises);
        setPickupCoords(pickup);
        setDestinationCoords(destinationLoc);
        setStopsCoords(stopsResults.filter((coords) => coords !== null));

        if (pickup?.latitude && pickup?.longitude) {
          dispatch(userZone({ lat: pickup.latitude, lng: pickup.longitude }));
          getVehicleTypes(pickup.latitude, pickup.longitude);
          setIsInitialFetchDone(true);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  };

  const getVehicleTypes = (lat: number, lng: number) => {
    const payload = {
      locations: [
        {
          lat: 21.203365,
          lng: 72.791422,
        },
      ],
      service_id: categoryOptionID,
      service_category_id: 2,
    };

    dispatch(vehicleTypeDataGet(payload)).then((res: any) => { });
  };

  useEffect(() => {
    if (zoneValue && isInitialFetchDone) {
      gotoNext();
    }
  }, [zoneValue]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${GOOGLE_MAPS_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error("Unable to fetch coordinates");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  const outOfCity = () => {
    Alert.alert(`${translateData.outOfCity}`, `${translateData.outOfCityDes}`);
    setProceedLoading(false)
  };

  const insideCity = () => {
    Alert.alert(
      `${translateData.insideCity}`,
      `${translateData.insideCityDes}`
    );
    setProceedLoading(false)

  };

  const rideBooking = async () => {
    let token = "";
    await getValue("token").then(function (value) {
      token = value;
    });
    if (token) {
      if (destination && destination.trim().length > 0) {
        const newLocation = { location: destination };
        (async () => {
          try {
            const stored = await getValue("locations");
            let storedLocations = JSON.parse(stored) || [];

            storedLocations.push(newLocation);

            if (storedLocations.length > 5) {
              storedLocations.shift();
            }
            await setValue("locations", JSON.stringify(storedLocations));
          } catch (error) {
            console.error("Error handling locations:", error);
          }
        })();
      } else {
      }
      if (!destination || !pickupLocation) {
        setModalVisible(true);
      } else {
        coordsData();
      }
    } else {
      let screenName = "LocationDrop";
      if (settingData.values.activation.login_number == 1) {
        setValue("CountinueScreen", screenName);
        replace("SignIn");
      } else if (settingData.values.activation.login_number == 0) {
        setValue("CountinueScreen", screenName);
        replace("SignInWithMail");
      }
    }
  };

  const gotoBook = async () => {
    setProceedLoading(true);
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const pickupCoords = await fetchCoordinates(pickupLocation);
      const destinationCoords = await fetchCoordinates(destination);

      if (!pickupCoords || !destinationCoords) {
        Alert.alert("Error", "Unable to fetch coordinates for locations.");
        setProceedLoading(false);

        return;
      }

      const distance = calculateDistance(
        pickupCoords.lat,
        pickupCoords.lng,
        destinationCoords.lat,
        destinationCoords.lng
      );

      if (categorySlug === "intercity") {
        distance < 30 ? insideCity() : rideBooking();
      } else if (categorySlug === "ride") {
        distance > 30 ? outOfCity() : rideBooking();
      } else if (categorySlug === "schedule" || categorySlug === "package") {
        rideBooking();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  const gotoNext = () => {
    if (categoryOption === "Cab") {
      navigate("BookRide", {
        destination,
        stops,
        pickupLocation,
        categoryId,
        zoneValue,
        scheduleDate,
        categoryOptionID,
      });
      setProceedLoading(false);
    } else if (categoryOption === "Freight" || categoryOption === "Parcel") {
      navigate("Outstation", {
        destination,
        stops,
        pickupLocation,
        categoryId,
        zoneValue,
        categoryOption,
        categoryOptionID,
      });
      setProceedLoading(false);
    }
  };

  const gotoSelection = () => {
    navigate("LocationSelect", { field: activeField, screenValue: "Ride" });
  };

  const gotoSaveLocation = async () => {
    let token = "";
    await getValue("token").then(function (value) {
      token = value;
    });
    if (token) {
      navigate("SavedLocation", { selectedLocation: "locationDrop" });
    } else {
      let screenName = "LocationDrop";

      if (settingData.values.activation.login_number == 1) {
        setValue("CountinueScreen", screenName);
        replace("SignIn");
      } else if (settingData.values.activation.login_number == 0) {
        setValue("CountinueScreen", screenName);
        replace("SignInWithMail");
      }
    }
  };

  const {
    linearColorStyle,
    viewRTLStyle,
    textColorStyle,
    bgFullLayout,
    textRTLStyle,
    isDark,
  } = useValues();

  useEffect(() => {
    if (fieldValue === "pickupLocation") {
      setPickupLocation(selectedAddress);
    } else if (fieldValue === "destination") {
      setDestination(selectedAddress);
    } else if (fieldValue && fieldValue.startsWith("stop-")) {
      const stopIndex = parseInt(fieldValue.split("-")[1], 10) - 1;
      const updatedStops = [...stops];
      updatedStops[stopIndex] = selectedAddress;
      setStops(updatedStops);
    }
  }, [selectedAddress, fieldValue]);

  const renderItemRecentData = ({ item: suggestion, index }) => (
    <View style={styles.renderItemRecentView}>
      <TouchableOpacity
        key={index}
        style={[styles.historyBtn, { flexDirection: viewRTLStyle }]}
        onPress={() => handlerecentClick(suggestion)}
      >
        <View
          style={[
            styles.historyView,
            {
              backgroundColor: isDark
                ? appColors.darkBorder
                : appColors.lightGray,
            },
          ]}
        >
          <History />
        </View>

        <Text
          style={[
            styles.locationText,
            { color: textColorStyle },
            { textAlign: textRTLStyle },
          ]}
        >
          {suggestion.location}
        </Text>
      </TouchableOpacity>
      {index !== recentDatas.length - 1 && (
        <View
          style={[
            styles.bottomLine,
            {
              borderColor: isDark ? appColors.darkBorder : appColors.lightGray,
            },
          ]}
        />
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.main} >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.main}>
          <ScrollView
            style={[styles.main, { backgroundColor: linearColorStyle }]}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Header
                value={translateData.location}
                backgroundColor={
                  isDark ? appColors.darkPrimary : appColors.whiteColor
                }
              />
              <View
                style={[
                  styles.horizontalView,
                  {
                    backgroundColor: isDark
                      ? appColors.darkPrimary
                      : appColors.whiteColor,
                  },
                ]}
              >
                <View style={{ marginTop: windowHeight(5) }}>
                  <PickUpDetails
                    border={isDark ? appColors.darkBorder : appColors.border}
                    bgColor={
                      isDark ? appColors.darkPrimary : appColors.lightGray
                    }
                    setPickupLocation={setPickupLocation}
                    setStops={setStops}
                    setDestination={setDestination}
                    activeField={activeField}
                    setActiveField={setActiveField}
                    destination={destination}
                    pickupLocation={pickupLocation}
                    stops={stops}
                  />
                </View>
                {(categorySlug === "schedule" || field === "schedule") && (
                  <TouchableOpacity
                    style={[
                      styles.dateField,
                      { flexDirection: viewRTLStyle },
                      {
                        backgroundColor: isDark
                          ? appColors.darkPrimary
                          : appColors.lightGray,
                      },
                      {
                        borderColor: isDark
                          ? appColors.darkBorder
                          : appColors.border,
                      },
                    ]}
                    onPress={() =>
                      navigate("Calander", {
                        fieldValue: "Ride",
                        categoryId: categoryId,
                        categorySlug: categorySlug,
                      })
                    }
                  >
                    <View style={{ height: "20%" }}>
                      <TextInput
                        borderColor={colors.border}
                        placeholder={translateData.selectDateTime}
                        backgroundColor={
                          isDark ? appColors.darkPrimary : appColors.lightGray
                        }
                        style={[styles.dateInput, { color: textColorStyle }]}
                        placeholderTextColor={
                          isDark ? appColors.darkText : appColors.blackColor
                        }
                        editable={false}
                        value={`${DateValue || ""} ${TimeValue || ""}`}
                      />
                    </View>
                    <View style={styles.calenderView} >
                      <Calender />
                    </View>
                  </TouchableOpacity>
                )}
                <View
                  style={[
                    external.fd_row,
                    external.js_space,
                    { flexDirection: viewRTLStyle },
                  ]}
                >
                  <TouchableOpacity
                    onPress={gotoSelection}
                    activeOpacity={0.7}
                    style={[
                      styles.locationBtn,
                      {
                        backgroundColor: isDark
                          ? appColors.lightPrimary
                          : appColors.selectPrimary,
                      },
                      { flexDirection: viewRTLStyle },
                    ]}
                  >
                    <View style={external.mh_5}>
                      <PickLocation />
                    </View>

                    <Text
                      style={[
                        styles.locationBtnText,
                        {
                          color: isDark
                            ? appColors.whiteColor
                            : appColors.blackColor,
                        },
                      ]}
                    >
                      {translateData?.locateonmap}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={gotoSaveLocation}
                    activeOpacity={0.7}
                    style={[
                      styles.locationBtn,
                      { backgroundColor: appColors.buttonBg },
                      { flexDirection: viewRTLStyle },
                    ]}
                  >
                    <View style={external.mh_5}>
                      <Save />
                    </View>

                    <Text
                      style={[
                        styles.locationBtnText,
                        { color: appColors.whiteColor },
                      ]}
                    >
                      {translateData?.savedLocation}
                    </Text>
                  </TouchableOpacity>
                </View>
                {visible && (
                  <Animated.View
                    style={[styles.bar, { transform: [{ translateX }] }]}
                  />
                )}
              </View>
            </View>
            {(categorySlug === "intercity" || categorySlug === "schedule") && (
              <View style={styles.viewContainerToll}>
                <Driving />
                <Text style={styles.fareStyle}>{translateData.note}</Text>
              </View>
            )}
            <View
              style={[styles.recentView, { backgroundColor: linearColorStyle }]}
            >
              <Text
                style={[
                  commonStyles.mediumText23,
                  { color: textColorStyle, textAlign: textRTLStyle },
                ]}
              >
                {fieldLength >= 3
                  ? translateData.addressSuggestion
                  : translateData.recent}
              </Text>
              <View
                style={[
                  styles.mapView,
                  {
                    backgroundColor: isDark
                      ? appColors.darkPrimary
                      : appColors.whiteColor,
                  },
                  {
                    borderColor: isDark
                      ? appColors.darkBorder
                      : appColors.border,
                  },
                ]}
              >
                {suggestions.length >= 3 ? (
                  suggestions?.map((suggestion, index) => (
                    <TouchableOpacity
                      style={[
                        styles.suggestionsView,
                        {
                          flexDirection: viewRTLStyle,
                        },
                      ]}
                      key={index}
                      onPress={() => handleSuggestionClick(suggestion)}
                    >
                      <View
                        style={[
                          styles.addressMArker,
                          {
                            backgroundColor: isDark
                              ? appColors.bgDark
                              : appColors.lightGray,
                          },
                        ]}
                      >
                        <AddressMarker />
                      </View>
                      <View>
                        <View
                          style={[
                            external.pv_10,
                            { flexDirection: viewRTLStyle },
                            styles.spaceing,
                          ]}
                        >
                          <View>
                            <Text
                              style={[
                                styles.titleText,
                                {
                                  color: textColorStyle,
                                  textAlign: textRTLStyle,
                                },
                              ]}
                            >
                              {suggestion}
                            </Text>
                          </View>
                        </View>
                        {index !== suggestions.length - 1 ? (
                          <View style={{ alignSelf: "center" }}>
                            <SolidLine color={bgFullLayout} />
                          </View>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  ))
                ) : Array.isArray(recentDatas) && recentDatas.length > 0 ? (
                  <FlatList
                    data={recentDatas}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItemRecentData}
                  />
                ) : (
                  <View style={styles.addressItemView}>
                    <Text
                      style={[
                        styles.noAddressText,
                        {
                          color: textColorStyle,
                        },
                      ]}
                    >
                      {translateData.noAddressFound}
                    </Text>
                  </View>
                )}
              </View>
              <View style={[external.mb_15]}>
                <Button
                  title={translateData.proceed}
                  onPress={gotoBook}
                  disabled={isProcessing}
                  loading={proceedLoading}
                />
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalText}>
                    {translateData.bookingNote}
                  </Text>
                  <Button
                    title={translateData.close}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            </Modal>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


