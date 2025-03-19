import {
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import Images from "@utils/images";
import { styles } from "./style";
import { commonStyles } from "../../../../styles/commonStyle";
import { LineContainer, LocationDetails } from "@src/commonComponent";
import { useValues } from "../../../../../App";
import {
  CalenderSmall,
  ClockSmall,
  Message,
  RatingEmptyStart,
  RatingHalfStar,
  RatingStar,
  SafetyCall,
} from "@utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { allRides, vehicleData } from "@src/api/store/actions";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { appColors, windowWidth } from "@src/themes";
import { useAppNavigation } from "@src/utils/navigation";
import { NoInternet } from "@src/components";
import { RideLoader } from "./rideLoader";

export default function RideContainer({ status }) {
  const { navigate } = useAppNavigation();
  const { bgFullStyle, textColorStyle, viewRTLStyle, textRTLStyle, isDark } =
    useValues();
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const { rideDatas, statusCode, loading } = useSelector(
    (state) => state.allRide
  );
  const { allVehicle } = useSelector((state) => state.vehicleType);
  const { translateData } = useSelector((state) => state.setting);

  useFocusEffect(
    useCallback(() => {
      dispatch(allRides());
      dispatch(vehicleData());
      return () => {};
    }, [dispatch])
  );

  const acceptedRides = rideDatas?.data?.filter(
    (ride) => ride?.ride_status && ride?.ride_status.slug === status
  );

  const statusMapping = {
    accepted: {
      text: "Pending",
      color: appColors.completeColor,
      backgroundColor: appColors.lightYellow,
    },
    started: {
      text: "Active",
      color: appColors.activeColor,
      backgroundColor: appColors.grayLight,
    },
    schedule: {
      text: "Scheduled",
      color: appColors.scheduleColor,
      backgroundColor: appColors.lightPink,
    },
    cancel: {
      text: "Cancel",
      color: appColors.alertRed,
      backgroundColor: appColors.iconRed,
    },
    completed: {
      text: "Completed",
      color: appColors.buttonBg,
      backgroundColor: appColors.selectPrimary,
    },
  };

  const gotoMessage = (item) => {
    navigate("ChatScreen", {
      driverId: item?.driver?.id,
      riderId: item?.rider?.id,
      rideId: item?.id,
      driverName: item?.driver?.name,
      driverImage: item?.driver?.profile_image?.original_url,
    });
  };

  const gotoCall = (item) => {
    const phoneNumber = `${item?.driver?.phone}`;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours() % 12 || 12).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return {
      date: `${day} ${month}’${year}`,
      time: `${hours}:${minutes} ${ampm}`,
    };
  };

  const handlePress = (selectedItem, vehicleData) => {
    let rideStatus = statusMapping[selectedItem.ride_status.slug]?.text;
    navigate("PendingRideScreen", {
      item: selectedItem,
      vehicleDetail: vehicleData,
      rideStatus: rideStatus,
    });
  };

  const renderItem = ({ item }) => {
    const { vehicle_type_id } = item.driver.vehicle_info || {};
    const vehicleData = Array.isArray(allVehicle)
      ? allVehicle.find((vehicle) => vehicle?.id === vehicle_type_id)
      : undefined;

    const formattedDate = formatDate(item.created_at);

    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={() => handlePress(item, vehicleData)}
        activeOpacity={0.9}
      >
        <View
          style={[styles.rideInfoContainer, { backgroundColor: bgFullStyle }]}
        >
          <View
            style={[
              styles.profileInfoContainer,
              { flexDirection: viewRTLStyle },
            ]}
          >
            <Image
              style={styles.profileImage}
              source={
                item?.driver?.profile_image?.original_url
                  ? { uri: item.driver.profile_image.original_url }
                  : Images.defultImage
              }
            />
            <View style={styles.profileTextContainer}>
              <Text
                style={[
                  styles.profileName,
                  { color: textColorStyle },
                  { textAlign: textRTLStyle },
                ]}
              >
                {item.driver.name}
              </Text>
              <View
                style={[
                  styles.carInfoContainer,
                  { flexDirection: viewRTLStyle },
                ]}
              >
                <Text style={[styles.carInfoText, { textAlign: textRTLStyle }]}>
                  {item?.driver?.vehicle_info?.model}
                </Text>
              </View>
            </View>
            <View style={styles.starContainer}>
              <View style={{ flexDirection: viewRTLStyle }}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const fullStarThreshold = index + 1;
                  const halfStarThreshold = index + 0.5;
                  if (item?.driver?.rating_count >= fullStarThreshold) {
                    return <RatingStar key={index} />;
                  } else if (item?.driver?.rating_count >= halfStarThreshold) {
                    return <RatingHalfStar key={index} />;
                  } else {
                    return <RatingEmptyStart key={index} />;
                  }
                })}
              </View>
              <Text
                style={[
                  commonStyles.mediumTextBlack12,
                  { marginHorizontal: windowWidth(5) },
                ]}
              >
                {item?.driver?.rating_count}
                <Text style={[styles.carInfoText]}>
                  ({item?.driver?.reviews_count})
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={[styles.serviceMainView, { flexDirection: viewRTLStyle }]}
          >
            <View style={[styles.serviceView, { flexDirection: viewRTLStyle }]}>
              <View style={styles.service_name_view}>
                <Text style={styles.service_name}>{item?.service?.name}</Text>
              </View>
              <View style={styles.service_category_view}>
                <Text style={styles.service_category}>
                  {item?.service_category?.name}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.MessageMainView,
                {
                  flexDirection: viewRTLStyle,
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.MessageView,
                  {
                    borderColor: colors.border,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => gotoMessage(item)}
              >
                <Message />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.safetyCallView,
                  {
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => gotoCall(item)}
              >
                <SafetyCall color={appColors.buttonBg} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.dashedLine} />
          <View style={{ flexDirection: viewRTLStyle }}>
            <Image
              style={styles.tripImage}
              source={{ uri: vehicleData?.vehicle_image?.original_url }}
            />
            <View style={styles.tripTextContainer}>
              <Text
                style={[
                  styles.tripIDText,
                  { color: textColorStyle, textAlign: textRTLStyle },
                ]}
              >
                #{item?.ride_number}
              </Text>
              <Text style={[styles.tripCostText, { textAlign: textRTLStyle }]}>
                ${item.total}
              </Text>
            </View>
            <View style={styles.iconMainView}>
              <View style={[styles.iconView, { flexDirection: viewRTLStyle }]}>
                <CalenderSmall />
                <Text style={styles.tripDateText}>{formattedDate.date}</Text>
              </View>
              <View style={[styles.iconView, { flexDirection: viewRTLStyle }]}>
                <ClockSmall />
                <Text style={styles.tripDateText}>{formattedDate.time}</Text>
              </View>
            </View>
          </View>
        </View>
        <LineContainer />
        <LocationDetails locationDetails={item.locations} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      {loading ? (
        <RideLoader />
      ) : acceptedRides?.length === 0 ? (
        <NoInternet
          btnHide={true}
          title={translateData.noRIde}
          details={translateData.noRideDes}
          image={isDark ? Images.noRideDark : Images.noRide}
          infoIcon
          status={`${translateData.statusCode} ${statusCode}`}
        />
      ) : (
        <FlatList
          data={acceptedRides}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.containerStyle}
        />
      )}
    </View>
  );
}
