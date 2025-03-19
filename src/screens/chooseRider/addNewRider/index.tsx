import { Text, View } from "react-native";
import React, { useState } from "react";
import { Header, InputText, Button } from "@src/commonComponent";
import { CountryCodeContainer } from "../../auth/signIn/signInComponents/countryCodeContainer/index";
import { styles } from "./styles";
import { useValues } from "../../../../App";
import { useAppNavigation } from "@src/utils/navigation";
import { useSelector } from "react-redux";
import { appColors, appFonts } from "@src/themes";

export function AddNewRider() {
  const { navigate } = useAppNavigation();
  const { bgFullStyle, linearColorStyle, isDark, textColorStyle, textRTLStyle } =
    useValues();
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { translateData } = useSelector((state) => state.setting);

  return (
    <View style={[styles.mainContainer, { backgroundColor: linearColorStyle }]}>
      <Header
        value={translateData.ridertitle}
        container={
          <View>
            <Text
              style={[
                styles.textContainer,
                { color: textColorStyle, textAlign: textRTLStyle },
              ]}
            >
              {translateData.riderSubTitle}
            </Text>
            <View
              style={[styles.inputContainer, { backgroundColor: bgFullStyle }]}
            >
              <View style={styles.firstName}>
                <InputText
                  placeholder={translateData.enterYourName}
                  backgroundColor={
                    isDark ? appColors.bgDark : appColors.lightGray
                  } title={translateData.firstName}
                  showTitle={true}
                  borderColor={isDark ? appColors.bgDark : appColors.lightGray} />
              </View>
              <View style={styles.lastName}>
                <InputText
                  placeholder={translateData.enterLastName}
                  backgroundColor={
                    isDark ? appColors.bgDark : appColors.lightGray
                  }
                  title={translateData.lastName}
                  showTitle={true}
                  borderColor={isDark ? appColors.bgDark : appColors.lightGray}

                />
              </View>
              <Text
                style={[
                  {
                    color: isDark ? appColors.whiteColor : appColors.primaryText,
                    fontFamily: appFonts.medium,
                    textAlign: textRTLStyle
                  },
                ]}
              >
                Phone Number        </Text>
              <View style={styles.codeContainer}>
                <CountryCodeContainer
                  width={"72%"}
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  backGroundColor={linearColorStyle}
                  borderColor1={isDark ? appColors.bgDark : appColors.lightGray}
                  borderColor={isDark ? appColors.bgDark : appColors.lightGray}
                />

              </View>
            </View>
          </View>
        }
      />
      <View style={styles.viewContainer}>
        <Button
          title={translateData.addRider}
          onPress={() => navigate("BookRide")}
        />
      </View>
    </View>
  );
}
