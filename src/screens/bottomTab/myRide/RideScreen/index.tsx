import { Image, SafeAreaView, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, HeaderTab } from "@src/commonComponent";
import { commonStyles } from "../../../../styles/commonStyle";
import { RideStatus } from "../rideStatus/index";
import { styles } from "./styles";
import { useValues } from "../../../../../App";
import Images from "@src/utils/images";
import {
  appColors
} from "@src/themes";
import { clearValue, getValue } from "@src/utils/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "@src/api/store/reducers";
import { settingDataGet } from "@src/api/store/actions";
import { useAppNavigation } from "@src/utils/navigation";

export function RideScreen() {
  const { bgFullStyle, linearColorStyle,setIsRTL, setIsDark } = useValues();
  const dispatch = useDispatch();
  const { settingData, translateData } = useSelector((state: any) => state.setting);
  const { reset } = useAppNavigation();
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Tokenvalue = async () => {
      const value = await getValue("token");
      setToken(value);
      setLoading(false);
    };
    Tokenvalue();
  }, []);

  const gotoSignIn = () => {
    clearValue();
    dispatch(resetState());

    setIsRTL();
    setIsDark();
    dispatch(settingDataGet());
    if (settingData?.values?.activation?.login_number == 1) {
      reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      });
    } else if (settingData?.values?.activation?.login_number == 0) {
      reset({
        index: 0,
        routes: [{ name: "SignInWithMail" }],
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeAreaContainer, { backgroundColor: bgFullStyle }]}
    >
      <View
        style={[
          styles.container,
          commonStyles.heightHeader,
          { backgroundColor: bgFullStyle },
        ]}
      >
        <HeaderTab tabName={translateData.rideTitle} />
      </View>
      <View
        style={[
          commonStyles.flexContainer,
          { backgroundColor: linearColorStyle},
        ]}
      >
        {loading ? (
          <View
            style={styles.loadingView}
          >
            <ActivityIndicator size="large" color={appColors.primaryText} />
          </View>
        ) : token ? (
          <RideStatus />
        ) : (
          <View
            style={styles.mainView}
          >
            <Image
              source={Images.noSignin}
              style={styles.imag}
            />
            <Text
              style={styles.signInText}
            >
              {translateData.signIn}
            </Text>
            <Text
              style={styles.accountText}
            >
              {translateData.signInNote}
            </Text>
            <View style={styles.buttonMainView}>
              <View style={styles.buttonView}>
                <Button
                  title={translateData.signIn}
                  textColor={appColors.whiteColor}
                  backgroundColor={appColors.buttonBg}
                  onPress={gotoSignIn}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
