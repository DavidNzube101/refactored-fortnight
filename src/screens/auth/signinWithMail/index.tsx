import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { external } from "../../../styles/externalStyle";
import { AuthContainer } from "../../../components/authComponents/authContainer/index";
import { Button, AnimatedAlert, InputText, notificationHelper } from "@src/commonComponent";
import { SignInTextContainer } from "../signIn/signInComponents";
import { useValues } from "../../../../App";
import { windowHeight } from "@src/themes";
import { UserLoginEmailInterface } from "../../../api/interface/authInterface";
import { translateDataGet, userMailLogin } from "../../../api/store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../api/store/index";
import styles from "../signIn/styles";
import { appColors } from "@src/themes";
import { Mail } from "@src/utils/icons";
import { useAppNavigation } from "@src/utils/navigation";
import { useFocusEffect } from "@react-navigation/native";

export function SignInWithMail() {
  const { navigate } = useAppNavigation();
  const { isDark } = useValues();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [demouser, setDemouser] = useState(false);
  const { loading } = useSelector((state: any) => state.auth);
  const [emailWarning, setEmailWarning] = useState<string | null>(null);

    useFocusEffect(
      useCallback(() => {
          dispatch(translateDataGet());
      }, [dispatch])
  );

  interface AnimatedAlertRef {
    animate: () => void;
  }
  const messageRef = useRef<AnimatedAlertRef>();
  const { translateData } = useSelector((state: any) => state.setting);

  const goDemoUser = () => {
    setEmail("rider@example.com");
    setDemouser(true);
    setEmailWarning(null);
  };

  const handleSignIn = () => {
    if (!email.trim()) {
      setEmailWarning(`${translateData.enterEmailId}`);
      return;
    } else {
      setEmailWarning(null);
    }

    let payload: UserLoginEmailInterface = {
      email: email,
      password: null,
    };
    dispatch(userMailLogin(payload))
      .unwrap()
      .then((res: any) => {
        if (res?.success) {
          notificationHelper("OTP Send", translateData.otpSend, "success")
          navigate("OtpVerify", { email, demouser });
        } else {
          messageRef.current?.animate();
          if (res.message.includes("Connection")) {
            setMessage("Something Went Wrong Please Try Again Later");
          } else if (
            res.message === "There is no account linked to the given number."
          ) {
          } else {
            setMessage(res.message);
          }
        }
      });
  };

  return (
    <AuthContainer
      topSpace={windowHeight(40)}
      imageShow={true}
      container={
        <View>
          <SignInTextContainer />
          <View>
            <InputText
              placeholder= {`${translateData.enterEmail}`}
              icon={<Mail />}
              show={true}
              backgroundColor={isDark ? appColors.bgDark : appColors.lightGray}
              borderColor={isDark ? appColors.bgDark : appColors.lightGray}
              onChangeText={(text) => {
                setEmail(text);
                setEmailWarning(null);
              }}
              borderColor={appColors.border}
              value={email}
              warningText={emailWarning}
              keyboard="email-address"
              
            />
            <View style={[external.mt_25]}>
              <Button
                title={translateData.login}
                onPress={handleSignIn}
                loading={loading}
              />
            </View>
            {/* {settingData?.values?.activation?.social_login_enable == 1 && (
              <>
                <View style={styles.imgContainer}>
                  <Image source={Images.or} style={styles.orImg} />
                </View>
                <View
                  style={[
                    styles.socialContainer,
                    { flexDirection: viewRTLStyle },
                  ]}
                >
                  <View
                    style={[styles.socialView, { flexDirection: viewRTLStyle }]}
                  >
                    <Google />
                    <Text style={styles.sociallogin}>With Google</Text>
                  </View>
                  <View
                    style={[styles.socialView, { flexDirection: viewRTLStyle }]}
                  >
                    <Apple />
                    <Text style={styles.sociallogin}>With Apple Id</Text>
                  </View>
                </View>
                <View
                  style={[styles.faceBook, { flexDirection: viewRTLStyle }]}
                >
                  <Facebook />
                  <Text style={styles.sociallogin}>With Facebook</Text>
                </View>
              </>
            )} */}
            <TouchableOpacity
              style={styles.demoBtn}
              activeOpacity={0.7}
              onPress={goDemoUser}
            >
              <Text style={styles.demoBtnText}>{translateData.demoUser}</Text>
            </TouchableOpacity>
          </View>
          <AnimatedAlert
            text={message}
            ref={messageRef}
            color={success ? appColors.alertBg : appColors.textRed}
          />
        </View>
      }
    />
  );
}
