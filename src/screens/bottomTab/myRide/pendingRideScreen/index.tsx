import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Button, Header, notificationHelper } from "@src/commonComponent";
import RideContainer from "../rideContainer";
import { external } from "../../../../styles/externalStyle";
import { PendingDetails } from "./pendingDetails/index";
import { appColors, appFonts, windowHeight, windowWidth } from "@src/themes";
import { useValues } from "../../../../../App";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  CalenderSmall,
  ClockSmall,
  Close,
  Gps,
  PickLocation,
  RatingEmptyStart,
  RatingHalfStar,
  RatingStar,
  StarEmpty,
  StarFill,
} from "@src/utils/icons";
import { styles } from "../rideContainer/style";
import Images from "@src/utils/images";
import { useDispatch, useSelector } from "react-redux";
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import { getValue } from "@src/utils/localstorage";
import {
  allRide,
  paymentsData,
  driverReviewPost,
} from "@src/api/store/actions";
import { URL } from "@src/api/config";

export function PendingRideScreen() {
  const {
    bgFullStyle,
    textColorStyle,
    viewRTLStyle,
    textRTLStyle,
    t,
    isRTL,
    isDark,
  } = useValues();
  const route = useRoute();
  const { item, vehicleDetail, rideStatus } = route.params;
  const dispatch = useDispatch();
  const orderNumber = item?.ride_number;
  const { navigate } = useNavigation();
  const { rideData } = useSelector((state: any) => state.allRide);
  const [rating, setRating] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState<string>("");
  const { translateData } = useSelector((state) => state.setting);

  const downloadInvoice = async () => {
    const token = await getValue("token");
    const filePath = `${RNFS.DownloadDirectoryPath}/invoice/${orderNumber}.pdf`;
    try {
      const response = await fetch(
        `${URL}/api/ride/invoice/${rideData.ride_number}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Fetch failed, status code: ${response.status}`);
      }

      const responseBlob = await response.blob();
      const fileReader = new FileReader();

      fileReader.onloadend = async () => {
        const base64data = fileReader.result.split(",")[1];
        await RNFetchBlob.fs.writeFile(filePath, base64data, "base64");
        Alert.alert(
          `${translateData.downloadSuccessful}`,
          `${translateData.fileSave} ${filePath}`
        );
      };

      fileReader.readAsDataURL(responseBlob);
    } catch (error) {
      console.error("Fetch Error:", error);
      Alert.alert(`${translateData.downloadError}`, error.message);
    }
  };

  const gotoTrack = () => {
    if (item?.service_category.slug === "package") {
      navigate("PaymentRental", { rideDetails: item });
    } else {
      navigate("Payment");
    }
  };

  const payNow = () => {
    const rideData = item;
    navigate("PaymentMethod", { rideData });
  };

  const review = () => {
    setModalVisible(true);
  };
  const reviewSubmit = async () => {
    let payload: UserRegistrationPayload = {
      ride_id: item?.id,
      driver_id: item?.driver_id,
      rating: rating,
      message: reviewText,
    };
    dispatch(driverReviewPost(payload))
      .unwrap()
      .then((res: any) => {
        setModalVisible(false);
        notificationHelper("Review", translateData.reviewSubmited, "success")
      });
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(paymentsData());
      dispatch(allRide({ ride_id: item.id }));
    }, [item.id])
  );

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const formatDates = (dateString) => {
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
  const formattedDate = formatDates(item.created_at);

  return (
    <Header
      value={`${rideStatus} ${translateData.ride}`}
      container={
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: windowHeight(150) }}
        >
          <TouchableOpacity style={[styles.container]} activeOpacity={0.9}>
            <View
              style={[
                styles.rideInfoContainer,
                { backgroundColor: bgFullStyle },
              ]}
            >
              <View
                style={[
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
                    <Text
                      style={[styles.carInfoText, { textAlign: textRTLStyle }]}
                    >
                      {item?.driver?.vehicle_info?.model}
                    </Text>
                  </View>
                </View>

                <View style={styles.PendingRideContainer}>
                  <View style={{ flexDirection: viewRTLStyle }}>
                    {Array.from({ length: 5 }).map((_, index) => {
                      const fullStarThreshold = index + 1;
                      const halfStarThreshold = index + 0.5;
                      if (item?.driver?.rating_count >= fullStarThreshold) {
                        return <RatingStar key={index} />;
                      } else if (
                        item?.driver?.rating_count >= halfStarThreshold
                      ) {
                        return <RatingHalfStar key={index} />;
                      } else {
                        return <RatingEmptyStart key={index} />;
                      }
                    })}
                  </View>
                  <Text style={{ color: appColors.blackColor }}>
                    {item?.driver?.rating_count}
                    <Text style={{ color: appColors.regularText }}>
                      ({item?.driver?.reviews_count})
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={styles.dashedLine} />
              <View style={{ flexDirection: viewRTLStyle }}>
                <Image
                  style={styles.tripImage}
                  source={{ uri: vehicleDetail?.vehicle_image?.original_url }}
                />
                <View style={styles.tripTextContainer}>
                  <Text
                    style={[
                      styles.tripIDText,
                      { color: textColorStyle, textAlign: textRTLStyle },
                    ]}
                  >
                    #{item.ride_number}
                  </Text>
                  <Text
                    style={[styles.tripCostText, { textAlign: textRTLStyle }]}
                  >
                    ${item.total}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "flex-end",
                    height: windowHeight(32),
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: viewRTLStyle,
                      alignItems: "center",
                    }}
                  >
                    <CalenderSmall />
                    <Text style={styles.tripDateText}>
                      {formattedDate.date}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: viewRTLStyle,
                      alignItems: "center",
                    }}
                  >
                    <ClockSmall />
                    <Text style={styles.tripDateText}>
                      {formattedDate.time}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  borderBottomWidth: 1,
                  borderColor: appColors.border,
                  borderStyle: "dashed",
                  marginVertical: windowHeight(10),
                }}
              />
              <View style={{ flexDirection: viewRTLStyle }}>
                <View style={[external.mh_5]}>
                  <View
                    style={{
                      flexDirection: viewRTLStyle,
                      alignItems: "center",
                    }}
                  >
                    <PickLocation
                      height={12}
                      width={12}
                      colors={appColors.primaryText}
                    />
                    <Text
                      style={[
                        styles.itemStyle,
                        { color: textColorStyle },
                        {
                          textAlign: textRTLStyle,
                          marginHorizontal: windowWidth(10),
                        },
                      ]}
                    >
                      {item.locations[0]}
                    </Text>
                  </View>
                  <View style={styles.dashedLine} />
                  <View
                    style={{
                      flexDirection: viewRTLStyle,
                      alignItems: "center",
                    }}
                  >
                    <Gps
                      height={12}
                      width={12}
                      colors={appColors.primaryText}
                    />
                    <Text
                      style={[
                        styles.pickUpLocationStyles,
                        {
                          color: textColorStyle,
                          marginHorizontal: windowWidth(10),
                        },
                      ]}
                    >
                      {item.locations[1]}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {item?.service_category?.slug === "rental" && (
            <View style={{ marginVertical: windowHeight(10) }}>
              <View
                style={{
                  flexDirection: viewRTLStyle,
                  backgroundColor: appColors.whiteColor,
                  justifyContent: "space-between",
                  marginHorizontal: windowWidth(20),
                }}
              >
                <View
                  style={{ flexDirection: "column", padding: windowHeight(8) }}
                >
                  <Text
                    style={{
                      color: appColors.primaryText,
                      fontFamily: appFonts.medium,
                    }}
                  >
                    {translateData.startDate}
                  </Text>
                  <View
                    style={{
                      flexDirection: viewRTLStyle,
                      marginTop: windowHeight(5),
                    }}
                  >
                    <CalenderSmall />
                    <Text
                      style={{
                        color: appColors.regularText,
                        fontFamily: appFonts.regular,
                      }}
                    >
                      {" "}
                      {formattedDate.date}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderLeftWidth: 1,
                    borderColor: appColors.border,
                    height: windowHeight(42),
                    borderStyle: "dashed",
                  }}
                />
                <View
                  style={{ flexDirection: "column", padding: windowHeight(8) }}
                >
                  <Text
                    style={{
                      color: appColors.primaryText,
                      fontFamily: appFonts.medium,
                    }}
                  >
                    {translateData.startTime}
                  </Text>
                  <View
                    style={{
                      flexDirection: viewRTLStyle,
                      marginTop: windowHeight(5),
                    }}
                  >
                    <ClockSmall />
                    <Text
                      style={{
                        color: appColors.regularText,
                        fontFamily: appFonts.regular,
                      }}
                    >
                      {" "}
                      {formattedDate.time}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: viewRTLStyle,
                  backgroundColor: appColors.whiteColor,
                  justifyContent: "space-between",
                  marginHorizontal: windowWidth(20),
                }}
              >
                <View
                  style={{ flexDirection: "column", padding: windowHeight(8) }}
                >
                  <Text
                    style={{
                      color: appColors.primaryText,
                      fontFamily: appFonts.medium,
                    }}
                  >
                    {translateData.endDate}
                  </Text>
                  <View
                    style={{
                      flexDirection: viewRTLStyle,
                      marginTop: windowHeight(5),
                    }}
                  >
                    <CalenderSmall />
                    <Text
                      style={{
                        color: appColors.regularText,
                        fontFamily: appFonts.regular,
                      }}
                    >
                      {" "}
                      {formattedDate.date}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderLeftWidth: 1,
                    borderColor: appColors.border,
                    height: windowHeight(42),
                    borderStyle: "dashed",
                  }}
                />
                <View
                  style={{ flexDirection: "column", padding: windowHeight(8) }}
                >
                  <Text
                    style={{
                      color: appColors.primaryText,
                      fontFamily: appFonts.medium,
                    }}
                  >
                    {translateData.endTime}
                  </Text>
                  <View
                    style={{
                      flexDirection: viewRTLStyle,
                      marginTop: windowHeight(5),
                    }}
                  >
                    <ClockSmall />
                    <Text
                      style={{
                        color: appColors.regularText,
                        fontFamily: appFonts.regular,
                      }}
                    >
                      {" "}
                      {formattedDate.time}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: viewRTLStyle,
                  backgroundColor: appColors.whiteColor,
                  justifyContent: "space-between",
                  marginHorizontal: windowWidth(20),
                }}
              >
                <View
                  style={{
                    marginHorizontal: windowWidth(10),
                    marginVertical: windowHeight(10),
                  }}
                >
                  <Text
                    style={{
                      color: appColors.primaryText,
                      fontFamily: appFonts.medium,
                    }}
                  >
                    {translateData.totalDays}
                  </Text>
                  <View
                    style={{
                      flexDirection: viewRTLStyle,
                      marginTop: windowHeight(5),
                    }}
                  >
                    <CalenderSmall />
                    <Text
                      style={{
                        fontFamily: appFonts.regular,
                        color: appColors.regularText,
                      }}
                    >
                      {" "}
                      5 Days
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          {item?.service_category?.slug === "schedule" && (
            <View
              style={{
                flexDirection: viewRTLStyle,
                backgroundColor: appColors.whiteColor,
                justifyContent: "space-between",
                marginVertical: windowHeight(10),
                marginHorizontal: windowWidth(20),
                borderWidth: 1,
                borderColor: appColors.border,
                borderRadius: windowHeight(5),
              }}
            >
              <View
                style={{ flexDirection: "column", padding: windowHeight(8) }}
              >
                <Text
                  style={{
                    color: appColors.primaryText,
                    fontFamily: appFonts.medium,
                  }}
                >
                  {translateData.startDate}
                </Text>
                <View
                  style={{
                    flexDirection: viewRTLStyle,
                    marginTop: windowHeight(5),
                  }}
                >
                  <CalenderSmall />
                  <Text
                    style={{
                      color: appColors.regularText,
                      fontFamily: appFonts.regular,
                    }}
                  >
                    {" "}
                    {formattedDate.date}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderLeftWidth: 1,
                  borderColor: appColors.border,
                  height: windowHeight(42),
                  borderStyle: "dashed",
                }}
              />
              <View
                style={{ flexDirection: "column", padding: windowHeight(8) }}
              >
                <Text
                  style={{
                    color: appColors.primaryText,
                    fontFamily: appFonts.medium,
                  }}
                >
                  {translateData.startTime}
                </Text>
                <View
                  style={{
                    flexDirection: viewRTLStyle,
                    marginTop: windowHeight(5),
                  }}
                >
                  <ClockSmall />
                  <Text
                    style={{
                      color: appColors.regularText,
                      fontFamily: appFonts.regular,
                    }}
                  >
                    {formattedDate.time}
                  </Text>
                </View>
              </View>
            </View>
          )}
          <RideContainer
            mapShow={true}
            status={translateData.pending}
            color={appColors.buttonBg}
          />
          <View style={[external.mt_10]}>
            {item.ride_status.slug === "cancelled" ? (
              <View style={{ marginHorizontal: windowWidth(20) }}>
                <Text
                  style={{
                    color: appColors.textRed,
                    fontFamily: appFonts.regular,
                  }}
                >
                  {translateData.reason}
                </Text>

                <View
                  style={{
                    backgroundColor: appColors.warnBg,
                    width: "100%",
                    padding: windowHeight(8),
                    borderRadius: windowWidth(10),
                    marginTop: windowHeight(4),
                  }}
                >
                  <Text
                    style={{
                      color: appColors.textRed,
                      fontFamily: appFonts.regular,
                    }}
                  >
                    Lorem Ipsum is simply dummy text of the printing Lore Ipsum
                    is simply dummy text of the printing
                  </Text>
                </View>
              </View>
            ) : (
              <PendingDetails rideDetails={item} vehicleData={vehicleDetail} />
            )}
          </View>
          {item.ride_status.slug != "cancelled" && (
            <View
              style={[
                {
                  backgroundColor: appColors.whiteColor,
                  height: windowHeight(110),
                  marginHorizontal: windowWidth(25),
                },
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  backgroundColor: appColors.border,
                  height: 1,
                  width: "100%",
                  bottom: 0,
                  justifyContent: "center",
                }}
              />

              <View
                style={{
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderColor: isDark ? appColors.darkBorder : appColors.border,
                }}
              >
                <Text
                  style={[
                    styles.title,
                    { color: appColors.primaryText, textAlign: textRTLStyle },
                  ]}
                >
                  {translateData.paymentMethod}
                </Text>
                <View
                  style={[styles.border, { borderColor: appColors.border }]}
                />
                <View style={[styles.contain, { flexDirection: viewRTLStyle }]}>
                  <Text style={[styles.type, { color: appColors.regularText }]}>
                    {translateData.paymentMode}
                  </Text>
                  <Text style={[styles.type, { color: appColors.primaryText }]}>
                    {item?.payment_mode}
                  </Text>
                </View>
                <View style={[styles.contain, { flexDirection: viewRTLStyle }]}>
                  <Text style={[styles.type, { color: appColors.regularText }]}>
                    {translateData.paymentMethod}
                  </Text>
                  <Text style={[styles.type, { color: appColors.primaryText }]}>
                    {item?.payment_method}
                  </Text>
                </View>
                <View style={[styles.contain, { flexDirection: viewRTLStyle }]}>
                  <Text style={[styles.type, { color: appColors.regularText }]}>
                    {translateData.status}
                  </Text>
                  <Text style={[styles.type, { color: appColors.primaryText }]}>
                    {item?.payment_status}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.leftRadius,
                  { backgroundColor: appColors.lightGray },
                ]}
              />
              <View
                style={[
                  styles.rightRadius,
                  { backgroundColor: appColors.lightGray },
                ]}
              />
            </View>
          )}

          <View
            style={{
              marginHorizontal: windowWidth(20),
              width: windowWidth(435),
              marginVertical: windowHeight(8),
            }}
          >
            <Text
              style={{
                color: appColors.buttonBg,
                textAlign: isRTL ? "left" : "right",
                fontFamily: appFonts.regular,
              }}
            >
              {translateData.needHelp}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: windowWidth(15),
              marginTop: windowHeight(10),
              gap: 15,
            }}
          >
            {item?.ride_status?.slug == "completed" &&
              item?.payment_status == "PENDING" && (
                <Button title="Pay Now" onPress={payNow} />
              )}
            {item?.ride_status?.slug == "completed" &&
              item?.payment_status == "COMPLETED" && (
                <Button title="Review" onPress={review} />
              )}
            {item?.ride_status?.slug == "started" && (
              <Button title="Track Ride" onPress={gotoTrack} />
            )}
            {item?.ride_status?.slug == "completed" &&
              item?.payment_status == "COMPLETED" && (
                <Button title="Download Invoice" onPress={downloadInvoice} />
              )}
          </View>
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.bgmodal}>
              <View
                style={[styles.background, { backgroundColor: bgFullStyle }]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={{
                    position: "absolute",
                    right: windowHeight(10),
                    top: windowHeight(10),
                  }}
                >
                  <Close />
                </TouchableOpacity>
                <Text style={[styles.title, { color: textColorStyle }]}>
                  {translateData.modalTitle}
                </Text>
                <View style={styles.userAlign}>
                  <Image
                    source={
                      item?.driver?.profile_image?.original_url
                        ? { uri: item?.driver?.profile_image?.original_url }
                        : Images.defultImage
                    }
                    style={styles.modalImage}
                  />
                  <Text style={[styles.modalName, { color: textColorStyle }]}>
                    {item?.driver?.name}
                  </Text>
                  <Text style={[styles.modalMail, { color: textColorStyle }]}>
                    {item?.driver?.email}
                  </Text>
                </View>
                <Image source={Images.lineBottom} style={styles.lineImage} />
                <Text
                  style={[
                    styles.rate,
                    { color: textColorStyle, textAlign: textRTLStyle },
                  ]}
                >
                  {translateData.driverRating}
                </Text>
                <View
                  style={[
                    styles.containerReview,
                    { flexDirection: viewRTLStyle },
                  ]}
                >
                  {[1, 2, 3, 4, 5]?.map((index) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      onPress={() => handleStarPress(index)}
                      style={styles.starIcon}
                    >
                      {index <= rating ? <StarFill /> : <StarEmpty />}
                    </TouchableOpacity>
                  ))}

                  <View
                    style={[styles.ratingView, { flexDirection: viewRTLStyle }]}
                  >
                    <View style={styles.borderVertical} />
                    <Text style={[styles.rating, { color: textColorStyle }]}>
                      {rating}/5
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.comment,
                    { color: textColorStyle, textAlign: textRTLStyle },
                  ]}
                >
                  {translateData.addComments}
                </Text>
                <TextInput
                  style={[
                    styles.textinput,
                    { color: textColorStyle, textAlign: textRTLStyle },
                  ]}
                  multiline={true}
                  textAlignVertical="top"
                  value={reviewText}
                  onChangeText={(text) => setReviewText(text)}
                />
                <View style={styles.border2} />
                <View
                  style={{
                    alignContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    width={330}
                    backgroundColor={appColors.buttonBg}
                    textColor={appColors.whiteColor}
                    title={translateData.submit}
                    onPress={reviewSubmit}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      }
    />
  );
}
