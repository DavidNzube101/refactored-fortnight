import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { Ac, Back, Bag, Right, Star1 } from "@src/utils/icons";
import { CarType } from "@src/assets/icons/carType";
import { FuelType } from "@src/assets/icons/fuelType";
import { Milage } from "@src/assets/icons/milage";
import { GearType } from "@src/assets/icons/gearType";
import { Seat } from "@src/assets/icons/seat";
import { Speed } from "@src/assets/icons/speed";
import { styles } from "./styles";
import { external } from "@src/styles/externalStyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RentalBookinginterface } from "@src/api/interface/rentalinterface";
import { rentalRideRequests } from "@src/api/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, notificationHelper } from "@src/commonComponent";
import { LocationContext } from "@src/utils/locationContext";
import { useValues } from "@App";
import { appColors } from "@src/themes";

export function RentalCarDetails() {
  const { viewRTLStyle, isDark } = useValues()
  const context = useContext(LocationContext);
  const { categoryOptionID } = context;
  const { translateData } = useSelector((state) => state.setting);

  const route = useRoute();
  const {
    cardDetails,
    startDates,
    pickUpCoords,
    pickupLocation,
    dropLocation,
    dropCoords,
    endDates,
    convertedStartTime,
    convertedEndTime,
    selectedVehicleId,
    getDriver,
  } = route.params;
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const carDetails = [
    { Icon: CarType, title: cardDetails.vehicle_subtype },
    { Icon: FuelType, title: cardDetails.fuel_type },
    { Icon: Milage, title: `${cardDetails.mileage}/kmpl` },
    { Icon: GearType, title: cardDetails.gear_type },
    { Icon: Seat, title: `${cardDetails?.seatingCapacity || 1} Seat` },
    { Icon: Speed, title: `${cardDetails.vehicle_speed}/h` },
    { Icon: Ac, title: `${cardDetails.vehicle_speed}/h` },
    { Icon: Bag, title: `${cardDetails.vehicle_speed}/h` },
  ];

  const [mainImage, setMainImage] = useState(
    cardDetails?.rental_vehicle_galleries[0]
  );

  const bookRental = async () => {
    const is_with_driver = getDriver ? "1" : "0";
    let dropLocations =
      dropLocation && dropLocation.trim() ? dropLocation : pickupLocation;

    let payload: RentalBookinginterface = {
      locations: [`${pickupLocation}`, `${dropLocations}`],
      location_coordinates: [
        {
          lat: `${pickUpCoords.lat}`,
          lng: `${pickUpCoords.lng}`,
        },
        {
          lat: `${dropCoords?.lat ?? pickUpCoords.lat}`,
          lng: `${dropCoords?.lng ?? pickUpCoords.lng}`,
        },
      ],
      service_id: categoryOptionID,
      service_category_id: "5",
      vehicle_type_id: `${selectedVehicleId}`,
      rental_vehicle_id: `${cardDetails.id}`,
      is_with_driver: `${is_with_driver}`,
      payment_method: "cash",
      start_time: `${startDates} ${convertedStartTime}`,
      end_time: `${endDates} ${convertedEndTime}`,
    };
    dispatch(rentalRideRequests(payload))
      .unwrap()
      .then((res) => { });
    notificationHelper("Ride Book", translateData.bookSuccessfully, "success")
    goBack();
  };

  return (
    <View>
      <View style={[styles.backBtn,{ backgroundColor: isDark ? appColors.darkPrimary : appColors.whiteColor }, { borderColor: isDark ? appColors.darkBorder : appColors.border }]}>
        <Back />
      </View>
      <ScrollView style={{ backgroundColor: isDark ? appColors.bgDark : appColors.whiteColor }} showsVerticalScrollIndicator={false}>
        <View>
          <Image source={{ uri: mainImage }} style={styles.mainImg} />
        </View>
        <View style={[styles.subImgContainer, { flexDirection: viewRTLStyle }, { backgroundColor: isDark ? appColors.bgDark : appColors.whiteColor }]}>
          {cardDetails?.rental_vehicle_galleries?.map((img, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              style={[
                styles.subImgView,
                mainImage === img && styles.selectedSubImg,
              ]}
              onPress={() => setMainImage(img)}
            >
              <Image source={{ uri: img }} style={styles.subImg} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={[styles.container]}>
          <View style={[styles.subContainer, { backgroundColor: isDark ? appColors.darkPrimary : appColors.whiteColor }, { borderColor: isDark ? appColors.darkBorder : appColors.border }]}>
            <View style={[styles.titleView, { flexDirection: viewRTLStyle }]}>
              <Text style={[styles.title, { color: isDark ? appColors.whiteColor : appColors.primaryText }]}>{cardDetails.name}</Text>
              <View style={[styles.rateContainer, { flexDirection: viewRTLStyle }]}>
                <Star1 />
                <Text style={styles.rating}>4.0</Text>
              </View>
            </View>

            <View style={[styles.detailContainer, { flexDirection: viewRTLStyle }]}>
              <Text style={styles.detail}>{cardDetails.description}</Text>
              <View style={external.fd_row}>
                <Text style={styles.price}>
                  ${cardDetails.vehicle_per_day_price}
                  <Text style={styles.day}>/{translateData.day}</Text>
                </Text>
              </View>
            </View>
            <View style={[styles.border,{ borderBottomColor: isDark ? appColors.darkBorder : appColors.border }]} />
            <View style={[styles.driverContainer, { flexDirection: viewRTLStyle }]}>
              <Text style={[styles.title,{ color: isDark ? appColors.whiteColor : appColors.primaryText }]}>Driver Price</Text>
              <View style={external.fd_row}>
                <Text style={styles.price}>
                  ${cardDetails.driver_per_day_charge}
                  <Text style={styles.day}>/{translateData.day}</Text>
                </Text>
              </View>
            </View>

            <View style={[styles.carDetails, { flexDirection: viewRTLStyle }]}>
              {carDetails?.map((detail, index) => (
                <View key={index} style={[styles.detailIcon, { flexDirection: viewRTLStyle },{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }]}>
                  <detail.Icon />
                  <Text style={styles.detailTitle}>{detail.title}</Text>
                </View>
              ))}
            </View>
            <Text style={[styles.title, external.mt_5, { color: isDark ? appColors.whiteColor : appColors.primaryText }]}>More Info</Text>
            {cardDetails?.interior.map((detail: any, index: number) => (
              <Text key={index} style={styles.description}>
                <Right /> {` ${detail}`}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            style={[external.mv_15]}
            onPress={bookRental}
          >
            <Button title={translateData.bookNow} onPress={bookRental} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
