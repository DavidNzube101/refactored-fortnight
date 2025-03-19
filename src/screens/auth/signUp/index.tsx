import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AuthContainer } from "../../../components/authComponents/authContainer/index";
import { InputText, Button } from "@src/commonComponent";
import { AuthText } from "../../../components/authComponents/authText/index";
import { external } from "../../../styles/externalStyle";
import { appColors, appFonts, windowHeight } from "@src/themes";
import { useValues } from "../../../../App";
import { EyeClose, EyeOpen } from "@utils/icons";
import { CountryCodeContainer } from "../signIn/signInComponents/countryCodeContainer/index";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { selfData, userRegistration } from "@src/api/store/actions";
import { setValue } from "@src/utils/localstorage";
import { useAppNavigation } from "@src/utils/navigation";

export function SignUp() {
  const { isDark, textRTLStyle, setToken } = useValues();
  const [userName, setUserName] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [referralID, setReferralID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [fcmToken, setFcmToken] = useState<string>("");
  const dispatch = useDispatch();
  const [success, setSuccess] = useState<boolean>(false);
  const { replace } = useAppNavigation();
  const { translateData } = useSelector((state: any) => state.setting);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("fcmToken");
      setFcmToken(token || "");
    };

    fetchToken();
  }, [dispatch]);

  const handleRegister = () => {
    let isValid = true;

    if (!userName.trim()) {
      setUserNameError(true);
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError(true);
      isValid = false;
    } else if (emailError) {
      setEmailError(false);
    }

    if (!phoneNumber.trim()) {
      setNumberError(translateData.validNo);
      isValid = false;
    } else if (phoneNumber.length !== 10) {
      setNumberError(translateData.numberDigit);
      isValid = false;
    } else {
      setNumberError("");
    }

    if (!password) {
      setPasswordError(translateData.errorPassword);
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError(translateData.passwordDigit);
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError(translateData.errorConfirmPassword);
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(translateData.passwordError);
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }


    if (!isValid) {
      return;
    }

    setLoading(true);
    const payload = {
      username: userName,
      name: userName,
      email: email,
      country_code: countryCode,
      phone: phoneNumber,
      fcm_token: fcmToken,
      password: password,
      password_confirmation: confirmPassword,
    };

    dispatch(userRegistration(payload))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          setValue("token", res.access_token);
          setToken(res.access_token);
          replace("MyTabs");
          dispatch(selfData());
        } else {
          setSuccess(false);
        }
      })
      .finally(() => setLoading(false));
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={external.main}>
        <AuthContainer
          imageShow={false}
          topSpace={windowHeight(100)}
          container={
            <View
              showsVerticalScrollIndicator={false}
            >
              <AuthText
                title={translateData.createAccount}
                subtitle={translateData.registerContent}
              />
              <View>
                <InputText
                  showTitle={true}
                  title={translateData.userName}
                  borderColor={isDark ? appColors.bgDark : appColors.lightGray}
                  placeholder={translateData.enterUserName}
                  placeholderTextColor={
                    isDark ? appColors.darkText : appColors.regularText
                  }
                  customColor={
                    isDark ? appColors.whiteColor : appColors.blackColor
                  }
                  backgroundColor={
                    isDark ? appColors.bgDark : appColors.lightGray
                  }
                  show
                  value={userName}
                  onChangeText={(text) => {
                    setUserName(text);
                    setUserNameError(!text.trim());
                  }}
                  warningText={
                    userNameError ? `${translateData.enterUserName}` : ""
                  }
                />

                <Text style={[styles.numberTitle, { textAlign: textRTLStyle, color: isDark ? appColors.whiteColor : appColors.primaryText }]}>
                  {translateData.mobileNumber}
                </Text>
                <View style={styles.countryCodeContainer}>
                  <CountryCodeContainer
                    countryCode={countryCode}
                    setCountryCode={setCountryCode}
                    phoneNumber={phoneNumber}
                    borderColor={
                      isDark ? appColors.bgDark : appColors.lightGray
                    }
                    borderColor1={
                      isDark ? appColors.bgDark : appColors.lightGray
                    }
                    setPhoneNumber={(text) => {
                      const numericText = text.replace(/[^0-9]/g, "");
                      setPhoneNumber(numericText);

                      if (numericText.length < 10) {
                        setNumberError(translateData.validNo);
                      } else {
                        setNumberError("");
                      }
                    }}


                    backGroundColor={
                      isDark ? appColors.bgDark : appColors.lightGray
                    }
                    warning={
                      numberError ? `${translateData.validNo}` : ""
                    }

                  />
                </View>
                <View style={styles.emailView}>
                  <InputText
                    showTitle={true}
                    title={translateData.email}
                    placeholder={translateData.enterEmail}
                    borderColor={
                      isDark ? appColors.bgDark : appColors.lightGray
                    }
                    customColor={
                      isDark ? appColors.darkText : appColors.regularText
                    }
                    placeholderTextColor={
                      isDark ? appColors.darkText : appColors.regularText
                    }
                    backgroundColor={
                      isDark ? appColors.bgDark : appColors.lightGray
                    }
                    keyboard={"email-address"}
                    show
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      setEmailError(!emailRegex.test(text.trim()));
                    }}
                    warningText={
                      emailError ? `${translateData.enterEmailId}` : ""
                    }
                  />
                </View>
                <View style={styles.referralIdView}>
                  <InputText
                    showTitle={true}
                    title={translateData.referralId}
                    placeholder={translateData.enterReferralId}
                    borderColor={
                      isDark ? appColors.bgDark : appColors.lightGray
                    }
                    customColor={
                      isDark ? appColors.darkText : appColors.regularText
                    }
                    placeholderTextColor={
                      isDark ? appColors.darkText : appColors.regularText
                    }
                    backgroundColor={
                      isDark ? appColors.bgDark : appColors.lightGray
                    }
                    show
                    value={referralID}
                    onChangeText={setReferralID}
                  />
                </View>
                <View style={styles.passwordView}>
                  <InputText
                    showTitle={true}
                    title={translateData.password}
                    placeholder={translateData.enterPassword}
                    borderColor={
                      isDark ? appColors.bgDark : appColors.lightGray
                    }
                    customColor={
                      isDark ? appColors.darkText : appColors.regularText
                    }
                    placeholderTextColor={
                      isDark ? appColors.darkText : appColors.regularText
                    }
                    backgroundColor={
                      isDark ? appColors.bgDark : appColors.lightGray
                    }
                    show
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setPasswordError(text && text.length < 8 ? translateData.passwordDigit : "");
                    }}

                    rightIcon={
                      <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={{ paddingHorizontal: windowHeight(0) }}
                      >
                        {isPasswordVisible ? <EyeOpen /> : <EyeClose />}
                      </TouchableOpacity>
                    }
                    secureText={!isPasswordVisible}
                    warningText={passwordError}

                  />
                </View>
                <View style={styles.confirmPasswordView}>
                  <InputText
                    showTitle={true}
                    title={translateData.confirmPassword}
                    placeholder={translateData.enterConfirmPassword}
                    borderColor={
                      isDark ? appColors.bgDark : appColors.lightGray
                    }
                    customColor={
                      isDark ? appColors.darkText : appColors.regularText
                    }
                    placeholderTextColor={
                      isDark ? appColors.darkText : appColors.regularText
                    }
                    backgroundColor={
                      isDark ? appColors.bgDark : appColors.lightGray
                    }
                    show
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      setConfirmPasswordError(
                        text !== password ? translateData.passwordError : ""
                      );
                    }} rightIcon={
                      <TouchableOpacity
                        onPress={() =>
                          setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                        }
                        style={{ paddingHorizontal: windowHeight(0) }}
                      >
                        {isConfirmPasswordVisible ? <EyeOpen /> : <EyeClose />}
                      </TouchableOpacity>
                    }
                    secureText={!isConfirmPasswordVisible}
                    warningText={confirmPasswordError}
                  />
                </View>
              </View>
              <View
                style={styles.btn}
              >
                <Button
                  title={translateData.register}
                  onPress={handleRegister}
                  loading={loading}
                />
              </View>
            </View>
          }
        />
      </View>
    </ScrollView>
  );
}
