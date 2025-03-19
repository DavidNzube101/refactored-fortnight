import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AuthTemplate } from "../component";
import { AuthText } from "@src/components";
import { Button, notificationHelper } from "@src/commonComponent";
import { appColors } from "@src/themes";
import Images from "@src/utils/images";
import { style } from "./styles";
import { useNavigation } from "@react-navigation/native";
import OTPTextView from "react-native-otp-inputs";
import { useValues } from "@App";
import { useAppRoute } from "@src/utils/navigation";
import { VerifyOtpInterface } from "@src/api/interface/authInterface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@src/api/store";
import { userVerifyOtp, selfData } from "@src/api/store/actions";
import { setValue } from "@src/utils/localstorage";

export function OtpVerify() {
  const route = useAppRoute();
  const { navigate } = useNavigation();
  const { bgFullLayout, isDark, viewRTLStyle } = useValues();
  const email = route.params?.email ?? "";
  const demouser = route.params || {};
  const [otp, setOtp] = useState(demouser?.demouser ? "123456" : "");
  const [fcmToken, setFcmToken] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const { loading } = useSelector((state: any) => state.auth);
  const { translateData } = useSelector((state: any) => state.setting);

  useEffect(() => {
    const fetchToken = async () => {
      let fcmToken = await AsyncStorage.getItem("fcmToken");
      if (fcmToken) {
        setFcmToken(fcmToken);
      }
    };
    fetchToken();
  }, []);

  const handleVerify = () => {
    let payload: VerifyOtpInterface = {
      phone: null,
      country_code: null,
      token: otp,
      email: email,
      fcm_token: fcmToken,
    };

    dispatch(userVerifyOtp(payload))
      .unwrap()
      .then(async (res: any) => {
        if (!res.success) {
          notificationHelper("OTP Verify", translateData.invalidOtp, "error")
        } else if (res.success && res.is_registered) {
          setValue("token", res.access_token);
          navigate("MyTabs");
          dispatch(selfData());
        } else {
          if (!res.is_registered) {
            navigate("SignUp");
            setSuccess(false);
            setMessage(
              "No account linked to the given number. Please sign up."
            );
          } else {
            notificationHelper("OTP Verify", translateData.invalidOtp, "error")
            setSuccess(false);
            setMessage("The OTP you entered is incorrect. Please try again.");
          }
        }
      })
      .catch((error: any) => {
        setSuccess(false);
        setMessage("An error occurred during verification. Please try again.");
      });
  };

  return (
    <AuthTemplate image={isDark ? Images.otpDark : Images.otpVerify}>
      <AuthText
        title={translateData.otpVerification}
        subtitle={`${translateData.otpSendTo} ${email}`}
      />
      <View style={style.otpContainer}>
        <OTPTextView
          containerStyle={[style.otpField, { flexDirection: viewRTLStyle }]}
          textInputStyle={[
            style.otpInput,
            {
              backgroundColor: bgFullLayout,
              color: isDark ? appColors.whiteColor : appColors.blackColor,
            },
          ]}
          handleChange={setOtp}
          numberOfInputs={6}
          inputStyles={[
            style.otpTextInput,
            {
              backgroundColor: bgFullLayout,
              borderColor: isDark ? appColors.darkBorder : appColors.border,
              color: isDark ? appColors.darkText : appColors.primaryText,
            },
          ]}
          selectionColor={appColors.subtitle}
          autofillFromClipboard={false}
          defaultValue={otp}
        />
      </View>
      <View style={style.sendBtn}>
        <Button
          backgroundColor={appColors.buttonBg}
          title={translateData.verify}
          textColor={appColors.whiteColor}
          onPress={handleVerify}
          loading={loading}
        />
      </View>
    </AuthTemplate>
  );
}
