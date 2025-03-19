import React, { useEffect, useState, useCallback } from "react";
import { Image, View } from "react-native";
import { external } from "../../../styles/externalStyle";
import { appColors } from "@src/themes";
import Images from "@utils/images";
import { styles } from "./styles";
import { getValue } from "../../../utils/localstorage/index";
import { useDispatch, useSelector } from "react-redux";
import { selfData, settingDataGet, translateDataGet } from "../../../api/store/actions";
import { NoInternet } from "@src/components";
import { useAppNavigation } from "@src/utils/navigation";
import { useValues } from "@App";

export function Splash() {
  const { replace } = useAppNavigation();
  const { isDark } = useValues();
  const dispatch = useDispatch();
  const { settingData } = useSelector((state: any) => state.setting);
  const [showNoInternet, setShowNoInternet] = useState(false);

  useEffect(() => {
    dispatch(settingDataGet());
    dispatch(translateDataGet());
  }, [dispatch]);

  useEffect(() => {
    if (!settingData?.values?.activation) return;

    const { maintenance_mode } = settingData.values.activation;

    if (maintenance_mode === "1" || maintenance_mode === 1) {
      setShowNoInternet(true);
    } else {
      proceedToNextScreen();
    }
  }, [settingData]);

  const proceedToNextScreen = useCallback(async () => {
    const token = await getValue("token");

    if (token) {
      dispatch(selfData());
      replace("MyTabs");
    } else {
      replace("Onboarding");
    }
  }, [dispatch, replace]);

  const handleRefresh = useCallback(() => {
    dispatch(settingDataGet());
    dispatch(translateDataGet());
  }, [dispatch]);

  if (showNoInternet) {
    return (
      <NoInternet
        onRefresh={handleRefresh}
        title="App Under Maintenance"
        details="We’re enhancing your experience! The app will be back online shortly. Thank you for your patience."
        image={isDark ? Images.maintenanceDark : Images.maintenance}
        infoIcon={false}
      />
    );
  }

  return (
    <View style={[external.fx_1, { backgroundColor: appColors.whiteColor }]}>
      <Image
        source={Images.splashBg}
        style={styles.splashBg}
      />
      <View style={[external.ai_center, external.js_center, external.fx_1]}>
        <Image style={styles.img} source={Images.splash} />
      </View>
    </View>
  );
}
