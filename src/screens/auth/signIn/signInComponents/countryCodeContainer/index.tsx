import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import { commonStyles } from "../../../../../styles/commonStyle";
import { external } from "../../../../../styles/externalStyle";
import { appColors, windowWidth } from "@src/themes";
import styles from "../../styles";
import { useValues } from "../../../../../../App";
import { CountryPicker } from "react-native-country-codes-picker";
import { useTheme } from "@react-navigation/native";
import { ArrowDownSmall } from "@src/utils/icons";
import { useSelector } from "react-redux";

type CountryCodeContainerProps = {
  countryCode?: string;
  setCountryCode?: (code: string) => void;
  phoneNumber?: string;
  setPhoneNumber?: (number: string) => void;
  width?: number | string;
  backGroundColor?: string;
  textBgColor?: string;
  borderColor?:string;
  borderColor1?:string;
  warning?:boolean;
};

export function CountryCodeContainer({
  countryCode,
  setCountryCode,
  phoneNumber,
  setPhoneNumber,
  width,
  backGroundColor,
  borderColor,
  borderColor1,
  warning
}: CountryCodeContainerProps) {
  const { t, viewRTLStyle, isDark, isRTL, textColorStyle, textRTLStyle } = useValues();
  const { colors } = useTheme();
  const [show, setShow] = useState(false);
  const { translateData } = useSelector(
    (state: any) => state.setting
  );

  const handleBackgroundPress = () => {
    setShow(false);
  };

  const handleTextChange = (text: string) => {
    setPhoneNumber(text);
    if (text.length === 10) {
      Keyboard.dismiss();
    }
  };

  return (
    <View onPress={handleBackgroundPress}>
      <View>
        <View
          style={[
            external.fd_row,
            external.ai_center,
            external.mt_5,
            { flexDirection: viewRTLStyle },
          ]}
        >
          <View
            style={[
              styles.countryCodeContainer,
              {
                backgroundColor: backGroundColor,
                borderColor:  borderColor1 ? borderColor1 :isDark ? appColors.darkPrimary : appColors.border,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShow(true)}
              style={[
                styles.countryCode,
                { flexDirection: viewRTLStyle }
              ]}
            >
              <Text style={styles.dialCode}>{countryCode}</Text>
              <ArrowDownSmall />
            </TouchableOpacity>

            <CountryPicker
              show={show}
              pickerButtonOnPress={(item) => {
                setCountryCode(item.dial_code);
                setShow(false);
              }}
              style={{
                
                modal: {
                  height: 500,
                  backgroundColor: isDark ? appColors.bgDark : appColors.whiteColor,
                  
                },
                countryName: {
                  color: textColorStyle,
                  textAlign: textRTLStyle,

                },
                dialCode: {
                  color: textColorStyle,
                },
                countryButtonStyles: {
                  backgroundColor: isDark ? appColors.darkPrimary : colors.card,
                  flexDirection: isRTL ? "row-reverse" : 'row',

                },
                textInput: {
                  backgroundColor: isDark ? appColors.darkHeader : appColors.lightGray,
                  color: textColorStyle,
                  textAlign: textRTLStyle,
                  paddingHorizontal:windowWidth(20),
                },
                line: {
                  borderColor: colors.border,
                },
              }}
              lang={""}
              flatListProps={{
                contentContainerStyle: { flexDirection: isRTL ? "row-reverse" : 'row' },
              }}
            />

          </View>
          <View
            style={[
              styles.phoneNumberInput,
              {
                width: width || "74%",
                backgroundColor: backGroundColor,
                flexDirection: viewRTLStyle,
                borderColor:borderColor,
              },
            ]}
          >
      
            <TextInput
              style={[[commonStyles.regularText,{color:isDark?appColors.whiteColor:appColors.blackColor}], [styles.inputText,{textAlign:textRTLStyle}]]}
              placeholderTextColor={isDark?appColors.darkText:appColors.regularText}
              placeholder={translateData.enterPhone}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={handleTextChange}
            />
          </View>
        </View>
        {warning && <Text style={styles.warningText}>{translateData.validNo}</Text>}
      </View>
    </View>
  );
}

