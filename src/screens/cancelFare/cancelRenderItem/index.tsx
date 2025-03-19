import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { external } from "../../../styles/externalStyle";
import { styles } from "../style";
import { commonStyles } from "../../../styles/commonStyle";
import { Button, notificationHelper, ProgressBar } from "@src/commonComponent";
import { useValues } from "../../../../App";
import { Star } from "@utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { bidUpdate } from "../../../api/store/actions/index";
import { fontSizes, appColors } from "@src/themes";
import { useAppNavigation } from "@src/utils/navigation";

export function CancelRender({ item } : {item : any}) {
  const { navigate } = useAppNavigation();
  const {
    linearColorStyle,
    bgFullStyle,
    textColorStyle,
    viewRTLStyle,
    textRTLStyle,
    currPrice,
    currSymbol,
  } = useValues();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);  
  const { translateData } = useSelector((state) => state.setting);

  const handleAccept = () => {
    const bid_id = item.id;

    let payload = {
      status: "accepted",
    };

    dispatch(bidUpdate({ payload, bid_id }))
      .unwrap()
      .then((res: any) => {
        if (item?.ride_request?.service_category?.slug == 'schedule') {
          navigate('MyTabs')
          notificationHelper("Ride", "Ride Scheduled", "success")
        } else {
          navigate("RideActive");
        }
      })
      .catch((error: any) => {
        console.error("Bid update error:", error);
      });
  };

  const handleReject = () => {
    const bid_id = item.id;
    let payload = {
      status: "rejected",
    };

    dispatch(bidUpdate({ payload, bid_id }))
      .unwrap()
      .then(() => { })
      .catch((error: any) => {
        console.error("Bid update error:", error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
        }
        return next;
      });
    }, 100);

    const timeout = setTimeout(() => {
      handleReject();
    }, 1000000000000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View>
      <View style={[styles.container, { backgroundColor: bgFullStyle }]}>
        <ProgressBar value={progress} />
        <View style={[external.ph_10]}>
          <TouchableOpacity onPress={() => navigate("DriverDetails")}>
            <View
              style={[
                external.ai_center,
                external.mt_15,
                { flexDirection: viewRTLStyle },
              ]}
            >
              <Image
                style={styles.img}
                source={{ uri: item.driver.profile_image.original_url }}
              />
              <Text
                style={[
                  styles.titleText,
                  {
                    color: textColorStyle,
                    textAlign: textRTLStyle,
                    fontSize: fontSizes.FONT20,
                  },
                ]}
              >
                {item.driver?.name}
              </Text>
              <Text
                style={[
                  commonStyles.mediumTextBlack12,
                  { color: appColors.buttonBg, fontSize: fontSizes.FONT20 },
                ]}
              >
                {currSymbol}
                {currPrice * item.amount}
              </Text>
            </View>
            <View
              style={[
                external.mv_5,
                external.js_space,
                { flexDirection: viewRTLStyle },
              ]}
            >
              <Text
                style={[commonStyles.regularText, { color: textColorStyle }]}
              >
                Driver
              </Text>
              <View style={{flexDirection:viewRTLStyle}}>
                <View style={styles.rating}>
                  <Star />
                </View>
                <Text
                  style={[commonStyles.regularText, { color: textColorStyle }]}
                >
                  {item.rating}
                </Text>
                <Text style={[styles.totalRating, { textAlign: textRTLStyle }]}>
                  {item.totalRating}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={[
              external.mt_3,
              external.js_space,
              { flexDirection: viewRTLStyle },
            ]}
          >
            <Button
              title={translateData.skip}
              width={"48%"}
              backgroundColor={linearColorStyle}
              textColor={textColorStyle}
              onPress={handleReject}
            />
            <Button
              title={translateData.accept}
              width={"48%"}
              backgroundColor={appColors.buttonBg}
              onPress={handleAccept}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
