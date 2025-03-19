import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "@src/commonComponent";
import styles from "./styles";
import { rentalVehicleList } from "@src/api/store/actions";
import { useNavigation, useRoute } from "@react-navigation/native";
import Images from "@src/utils/images";
import { Ac, Bag, Info, Star1 } from "@src/utils/icons";
import { Speed } from "@src/assets/icons/speed";
import { Seat } from "@src/assets/icons/seat";
import { GearType } from "@src/assets/icons/gearType";
import { Milage } from "@src/assets/icons/milage";
import { FuelType } from "@src/assets/icons/fuelType";
import { CarType } from "@src/assets/icons/carType";
import { useValues } from "@App";
import { appColors } from "@src/themes";

export function RentalVehicleSelect() {
  const route = useRoute();
  const {
    startDate,
    pickUpCoords,
    pickupLocation,
    dropLocation,
    dropCoords,
    categoryId,
    endDate,
    startTime,
    endTime,
    getDriver,
  } = route.params;
  const [startDates, setStartDate] = useState("");
  const [endDates, setEndDate] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { isDark, textColorStyle, linearColorStyle, viewRTLStyle } = useValues()
  const { translateData } = useSelector((state) => state.setting);

  const convertTo24HourFormat = (time) => {
    if (!time) return ""; // Prevent split of undefined error
    const [timePart, modifier] = time.split(" ");
    if (!timePart || !modifier) return ""; // Ensure valid split parts
  
    let [hours, minutes] = timePart.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
  
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };
  
  const convertedStartTime = convertTo24HourFormat(startTime);
  const convertedEndTime = convertTo24HourFormat(endTime);

  const { rentalVehicleData, rentalVehicleLists } = useSelector(
    (state: any) => state.rentalVehicle
  );

  useEffect(() => {
    const monthMap = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEP: 8,
      OCT: 9,
      NOV: 10,
      DEC: 11,
    };

    const formatDate = (dateString: string) => {
      if (!dateString) return ""; // Prevent split of undefined error
    
      const parts = dateString.split(" ");
      if (parts.length < 3) return ""; // Ensure valid format
    
      const day = parseInt(parts[0], 10);
      const month = monthMap[parts[1]?.toUpperCase()];
      const year = parseInt(parts[2], 10);
    
      if (isNaN(day) || month === undefined || isNaN(year)) {
        return "";
      }
    
      return new Date(year, month, day).toISOString().split("T")[0];
    };
    

    if (startDate) {
      const formattedStartDate = formatDate(startDate);
      if (formattedStartDate) {
        setStartDate(formattedStartDate);
      }
    }

    if (endDate) {
      const formattedEndDate = formatDate(endDate);
      if (formattedEndDate) {
        setEndDate(formattedEndDate);
      }
    }
  }, [startDate, endDate]);

  const handleSelectVehicle = (id: number) => {
    setSelectedVehicleId(id);

    dispatch(
      rentalVehicleList({
        start_time: startDates,
        vehicle_type_id: id,
        lat: pickUpCoords.lat,
        lng: pickUpCoords.lng,
      })
    );
  };

  const gotoDetails = ({ cardDetails }) => {

    navigate("RentalCarDetails", {
      cardDetails,
      startDates,
      pickUpCoords,
      pickupLocation,
      dropLocation,
      dropCoords,
      categoryId,
      endDates,
      convertedStartTime,
      convertedEndTime,
      selectedVehicleId,
      getDriver,
    });
  };

  const renderVehicleItem = ({ item }: { item: any }) => {
    const isSelected = item.id === selectedVehicleId;
    return (
      <TouchableOpacity
        onPress={() => handleSelectVehicle(item.id)}
        style={[[styles.vehicleItem, { backgroundColor: isDark ? appColors.darkPrimary : appColors.whiteColor,borderColor:isDark?appColors.darkBorder:appColors.border }], isSelected && styles.selectedVehicleItem]}
      >
        <Image
          source={{ uri: item.vehicle_image.original_url }}
          style={styles.vehicleImage}
        />
        <View style={[styles.border, {borderColor: isDark?appColors.darkBorder:appColors.border  }]} />
        <Text style={[styles.vehicleName,{color:isDark?appColors.whiteColor:appColors.primaryText}]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderVehicleDetails = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => gotoDetails({ cardDetails: item })}
        style={[styles.listContainer,{ backgroundColor: isDark ? appColors.darkPrimary : appColors.whiteColor }, { borderColor: isDark?appColors.darkBorder:appColors.border }]}
      >
        <Image
          source={{
            uri: item?.rental_vehicle_galleries[0],
          }}
          style={styles.carImg}
        />
        <View style={[styles.titleContainer, { flexDirection: viewRTLStyle }]}>
          <Text style={[styles.carBrand,{color:isDark?appColors.whiteColor:appColors.primaryText}]}>{item.name}</Text>
          <View style={[styles.direction, { flexDirection: viewRTLStyle }]}>
            <View style={styles.starIcon}>
              <Star1 />
            </View>
            <Text style={styles.rating}>4.6</Text>
          </View>
        </View>
        <View style={[styles.descContainer, { flexDirection: viewRTLStyle }]}>
          <Text style={styles.engineInfo}>{item.description}</Text>
          <Text style={styles.rentPrice}>
            ${item.vehicle_per_day_price}
            <Text style={styles.perDay}>/{translateData.day}</Text>
          </Text>
        </View>
        <View style={[styles.dashLine,{ borderBottomColor: isDark?appColors.darkBorder:appColors.border }]} />
        <View style={[styles.descContainer, { flexDirection: viewRTLStyle }]}>
          <Text style={[styles.driverTitle,{color:isDark?appColors.whiteColor:appColors.primaryText}]}>{translateData.driverPrice}</Text>
          <Text style={styles.rentPrice}>
            ${item.driver_per_day_charge}
            <Text style={styles.perDay}>/{translateData.day}</Text>
          </Text>
        </View>
        <View style={[styles.tagContainer, { flexDirection: viewRTLStyle }]}>
          <View style={[styles.iconBox, { flexDirection: viewRTLStyle },{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }]}>
            <CarType />
            <Text style={styles.iconTitle}>{item.vehicle_subtype}</Text>
          </View>
          <View style={[styles.iconBox, { flexDirection: viewRTLStyle },{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }]}>
            <FuelType />
            <Text style={styles.iconTitle}>{item.fuel_type}</Text>
          </View>
          <View style={[styles.iconBox, { flexDirection: viewRTLStyle },{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }]}>
            <Milage />
            <Text style={styles.iconTitle}>{item.mileage}km/ltr</Text>
          </View>
          <View style={[styles.iconBox, { flexDirection: viewRTLStyle },{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }]}>
            <GearType />
            <Text style={styles.iconTitle}>{item.gear_type}</Text>
          </View>
          <View style={[styles.iconBox, { flexDirection: viewRTLStyle },{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }]}>
            <Seat />
            <Text style={styles.iconTitle}>{item.seatingCapacity} {translateData.seat}</Text>
          </View>
          <View style={[styles.iconBox, { flexDirection: viewRTLStyle },{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }]}>
            <Speed />
            <Text style={styles.iconTitle}>{item.vehicle_speed}/h</Text>
          </View>
          <View style={[styles.iconBox, { flexDirection: viewRTLStyle },{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }]}>
            <Ac />
            <Text style={styles.iconTitle}>{item.vehicle_speed}/h</Text>
          </View>
          <View style={[styles.iconBox, { flexDirection: viewRTLStyle },{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }]}>
            <Bag />
            <Text style={styles.iconTitle}>{item.vehicle_speed}/h</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: linearColorStyle }]}>
      <Header value={translateData.selectRide} />
      <Text style={[styles.title, { color: textColorStyle }]}>{translateData.vehicletype}</Text>
      <View style={styles.vehicleContainer}>
        <FlatList
          data={rentalVehicleData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVehicleItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>

      {rentalVehicleLists?.data?.length > 0 ? (
        <View style={styles.listDateContainer}>
          <FlatList
            data={rentalVehicleLists?.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderVehicleDetails}
            contentContainerStyle={styles.listStyle}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.noDateContainer}>
          <Image source={isDark ? Images.noVehicleDark : Images.noVehicle} style={styles.noData} />
          <View style={[styles.direction, { flexDirection: viewRTLStyle }]}>
            <Text style={[styles.titles, { color: textColorStyle }]}>{translateData.emptyVehicle}</Text>
            <View style={styles.icon}>
              <Info />
            </View>
          </View>
          <Text style={styles.subTitle}>
            {translateData.noVehicle}
          </Text>
        </View>
      )}
    </View>
  );
}
