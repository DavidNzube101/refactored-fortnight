import { Image, Text, View } from "react-native";
import React from "react";
import { commonStyles } from "../../../../../../styles/commonStyle";
import { external } from "../../../../../../styles/externalStyle";
import { styles } from "./styles";
import { useValues } from "../../../../../../../App";
import { appColors } from "@src/themes";
import { PlatNumber } from "@src/utils/icons";
import {  taxidetailsObject, vehicleInterface } from "@src/api/interface/vehicleTypeInterface";

type taxidetailsProps  = { 
  paddingHorizontal : any;
   texiDetail?: taxidetailsObject;
   vehicleData?: vehicleInterface,
} 
export function TaxiDetails({ paddingHorizontal, texiDetail, vehicleData } : taxidetailsProps) {
  const { viewRTLStyle, textRTLStyle } = useValues();

  return (
    <View>
      <View
        style={[
          styles.container,
          { paddingHorizontal: paddingHorizontal },
          {
            backgroundColor: appColors.whiteColor,
            flexDirection: viewRTLStyle,
          },
        ]}
      >
        <View
          style={styles.vehicleContainer}
        >
          <Image
            style={styles.imgContainer}
            source={{ uri: vehicleData?.vehicle_image?.original_url }}
          />
        </View>
        <View>
          <View style={{ flexDirection: viewRTLStyle }}>
            <View
              style={styles.vehicleView}
            >
              <Text
                style={[
                  commonStyles.mediumTextBlack,
                  external.mt_3,
                  { textAlign: "center" },
                ]}
              >
                {texiDetail?.driver?.vehicle_info?.model}
              </Text>
              <View
                style={[styles.platNumberView,{
                  flexDirection: viewRTLStyle
                
                }]}
              >
                <PlatNumber />
                <Text
                  style={[styles.vehicle_info,
                    commonStyles.mediumTextBlack,
                    external.as_end,
                    {
                      textAlign: textRTLStyle,
                 
                    },
                  ]}
                >
                  {texiDetail?.driver?.vehicle_info?.plate_number}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
