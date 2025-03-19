import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { styles } from "../../style";
import Images from "@src/utils/images";
import { useValues } from "@App";
import { appColors } from "@src/themes";
import { Copied } from "@src/utils/icons";
import Clipboard from "@react-native-clipboard/clipboard";
import { useAppNavigation } from "@src/utils/navigation";
import { useSelector } from "react-redux";
import { notificationHelper } from "@src/commonComponent";

export function Coupons({ couponsList, route }) {
  const { isDark, textColorStyle, viewRTLStyle, textRTLStyle, t } = useValues();
  const bgImage = isDark ? Images.promoCodeList : Images.promoCodeBg;
  const { navigate, goBack } = useAppNavigation();
  const { translateData } = useSelector((state: any) => state.setting);


  const copyToClipboard = (coupon) => {
    Clipboard.setString(coupon.code);
    notificationHelper("Coppied", translateData.copyClipboard, "warning")
    if (route?.params?.getCoupon) {
      route.params.getCoupon(coupon);
    }
    if (route?.params?.from == "payment") {
      goBack({
        couponCode: coupon.code,
      });
    } else {

    }
  };

  const gotoDetails = (value: number) => {
    navigate("PromoCodeDetail", { item: value });
  };

  return (
    <>
      {couponsList?.data?.map((item, index) => {
        const discountText =
          item.type === "percentage"
            ? `${translateData.flat} ${Math.round(item.amount)}${translateData.offPercentage}`
            : `${translateData.flatDoller}${Math.round(item.amount)} ${translateData.off}`;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => gotoDetails(item)}
            activeOpacity={0.7}
            style={styles.mainContainer}
          >
            <ImageBackground
              resizeMode="stretch"
              style={styles.promoCodeImageBackground}
              source={bgImage}
            >
              <View
                style={[
                  styles.promoCodeValidityContainer,
                  { flexDirection: viewRTLStyle },
                ]}
              >
                <View>
                  <Text
                    style={[styles.promoCodeText, { color: textColorStyle }, { textAlign: textRTLStyle }]}
                  >
                    {discountText}
                  </Text>
                  <Text
                    style={[
                      styles.promoCodeSubtitle,
                      { textAlign: textRTLStyle },
                    ]}
                  >
                    {item.description.length > 90
                      ? `${item.description.slice(0, 90)}...`
                      : item.description}
                  </Text>
                  {item.end_date && (
                    <Text
                      style={[
                        styles.promoCodeSubtitle,
                        {
                          textAlign: textRTLStyle,
                        },
                      ]}
                    >
                      {translateData.validTill} : {item.end_date}
                    </Text>
                  )}
                </View>
                <View>
                  <Image
                    source={Images.discount}
                    style={styles.discountImage}
                  />
                </View>
              </View>

              <View style={[styles.dashedLine, { borderColor: isDark ? appColors.darkBorder : appColors.primaryGray }]} />
              <View
                style={[
                  styles.promoCodeValidityContainer,
                  { flexDirection: viewRTLStyle },
                ]}
              >
                <View style={styles.promoCodeCodeContainer}>
                  <Text style={styles.promoCodeCodeText}>{item.code}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => copyToClipboard(item)}
                  style={[styles.copyView, { flexDirection: viewRTLStyle }]}
                >
                  <Copied />
                  <Text
                    style={[
                      styles.promoCodeUseNow,
                      { color: appColors.buttonBg },
                    ]}
                  >
                    {translateData.copy}
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
    </>
  );
}
