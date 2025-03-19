import { SafeAreaView, ScrollView, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, HeaderTab } from "@src/commonComponent";
import { external } from "../../../../styles/externalStyle";
import { commonStyles } from "../../../../styles/commonStyle";
import { UserContainer } from "./profileComponent/userContainer/index";
import { ProfileContainer } from "./profileComponent/profileScreen/ProfileContainer";
import { styles } from "./style";
import { useValues } from "../../../../../App";
import { appColors } from "@src/themes";
import { getValue } from "@src/utils/localstorage";
import { useSelector } from "react-redux";

export function ProfileSetting() {
  const { bgFullStyle, linearColorStyle } = useValues();
  const profileContainerRef = useRef(null);
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const { translateData } = useSelector((state: any) => state.setting);

  const handleSignIn = () => {
    if (profileContainerRef.current) {
      profileContainerRef.current.gotoLogout();
    }
  };

  useEffect(() => {
    const Tokenvalue = async () => {
      const value = await getValue("token");
      setToken(value);
    };
    Tokenvalue();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgFullStyle }]}>
      <View style={[commonStyles.heightHeader]}>
        <HeaderTab tabName={`${translateData.settingTitle}`} />

      </View>
      <ScrollView
        contentContainerStyle={[external.Pb_30]}
        showsVerticalScrollIndicator={false}
        style={[
          commonStyles.flexContainer,
          external.pt_15,
          { backgroundColor: linearColorStyle },
        ]}
      >
        <UserContainer />
        <ProfileContainer ref={profileContainerRef} />
      </ScrollView>
      {token ? null : (
        <View
          style={styles.signInMainView}
        >
          <View style={styles.signInView}>
            <Button
              title={translateData.signIn}
              textColor={appColors.whiteColor}
              backgroundColor={appColors.buttonBg}
              onPress={handleSignIn}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
