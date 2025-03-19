import { Image, Text, View } from "react-native";
import React from "react";
import { TaxiDetails } from "../../completeRideScreen/detailContainer/taxiDetails/index";
import { BillDetails } from "../../completeRideScreen/detailContainer/billDetails/index";
import { commonStyles } from "../../../../../styles/commonStyle";
import { external } from "../../../../../styles/externalStyle";
import { styles } from "./styles";
import { windowHeight } from "@src/themes";
import { useValues } from "../../../../../../App";
import { appColors, appFonts } from "@src/themes";
import { vehicleInterface } from "@src/api/interface/vehicleTypeInterface";
import { rideDetailsInterface } from "@src/api/interface/rideRequestInterface";
import { useTheme } from "@react-navigation/native";

type pendingdetailsProps = {
  rideDetails: rideDetailsInterface,
  vehicleData: vehicleInterface
}

export function PendingDetails({ rideDetails, vehicleData }: pendingdetailsProps) {
  const { bgFullStyle, viewRTLStyle, textRTLStyle} = useValues();
  const { colors } = useTheme()

  return (
    <>
      <View
        style={[
          styles.pendingViewContainer,
          {
            flexDirection: viewRTLStyle,

            borderColor: colors.border,

          },
        ]}
      >
        <Text
          style={[
            commonStyles.regularText,
            external.fg_1,
            [styles.rideOTPText,
            {
              textAlign: textRTLStyle,

            }]
          ]}
        >
          Ride OTP
        </Text>
        <View style={{ flexDirection: viewRTLStyle }}>
          {rideDetails.otp
            ? rideDetails.otp
              .toString()
              .split("")
              ?.map((digit, index) => (
                <Text key={index} style={styles.pin}>
                  {digit}
                </Text>
              ))
            : null}
        </View>
      </View>
      <View style={[styles.container, { backgroundColor: bgFullStyle }]}>
        <TaxiDetails
          texiDetail={rideDetails}
          paddingHorizontal={windowHeight(10)}
          vehicleData={vehicleData}
        />

        {rideDetails?.service?.slug == "parcel" ||
          (rideDetails?.service?.slug == "fright" && (
            <View style={styles.rideDetailsView}>
              <Image
                source={{
                  uri: "",
                }}
                style={styles.cargoImg}
              />
              <Text
                style={styles.paragraphText}
              >
                A cargo container is a large, standardized, and durable shipping
                box designed to transport goods across various modes of
                transportation, such as ships, trains, and trucks.
              </Text>
              {rideDetails?.service?.slug == "parcel" && (
                <>
                  <View
                    style={[styles.parcelView,{flexDirection:viewRTLStyle}]}
                  >
                    <Text
                      style={styles.textStyle}
                    >
                      Receiver Name
                    </Text>
                    <Text
                      style={styles.textStyle}
                    >
                      Kamlesh Chaiwala
                    </Text>
                  </View>

                  <View
                    style={[styles.dataContainer, { flexDirection: viewRTLStyle }]}
                  >
                    <Text
                      style={styles.textStyle}
                    >
                      Receiver No.
                    </Text>
                    <Text
                      style={{
                        color: appColors.primaryText,
                        fontFamily: appFonts.regular,
                      }}
                    >
                      +91 12345 67890
                    </Text>
                  </View>
                  <View
                    style={[styles.dataContainer,{flexDirection:viewRTLStyle}]}
                  >
                    <Text
                      style={styles.textStyle}
                    >
                      Parcel Weight
                    </Text>
                    <Text
                      style={styles.textStyle}
                    >
                      1000KG
                    </Text>
                  </View>
                </>
              )}
            </View>
          ))}

        <BillDetails billDetail={rideDetails} />
      </View>
    </>
  );
}
