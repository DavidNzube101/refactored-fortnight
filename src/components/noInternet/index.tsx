import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Info } from "@src/utils/icons";
import { Menu, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import { commonStyles } from "@src/styles/commonStyle";
import { useValues } from "@App";
import { appColors } from "@src/themes";

type nointernetprops = {
  onRefresh?: any
  title?: string,
  details?: string,
  image: any,
  btnHide?: boolean,
  status?: string,
  infoIcon?: boolean
}
export function NoInternet({ onRefresh, title, details, image, btnHide, status, infoIcon }: nointernetprops) {
  const { viewRTLStyle,isDark } = useValues()
  const { Popover } = renderers;
  return (
    <View
      style={styles.mainContainer}
    >
      <Image source={image} style={styles.image} />
      <View style={[styles.mainView, { flexDirection: viewRTLStyle }]}>
        <Text style={[styles.title, { color: isDark?appColors.whiteColor:appColors.primaryText }]}>{title}</Text>
        {
          infoIcon && (
            <Menu renderer={Popover} rendererProps={{ preferredPlacement: "bottom", }} >
              <MenuTrigger style={styles.info}>
                <Info />
              </MenuTrigger>
              <MenuOptions customStyles={{ optionsContainer: commonStyles.popupContainer }}>
                <Text style={[commonStyles.popupText]}>{status}</Text>
              </MenuOptions>
            </Menu>
          )
        }

      </View>
      <Text style={styles.details}>{details}</Text>
      {!btnHide && (
        <TouchableOpacity
          style={styles.refButton}
          activeOpacity={0.7}
          onPress={onRefresh}
        >
          <Text style={styles.refText}>Refresh</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
