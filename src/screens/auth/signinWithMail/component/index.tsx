import React from "react";
import { View, Image, TouchableOpacity, ImageProps } from "react-native";
import { Back } from "@src/utils/icons";
import { style } from "../otpverify/styles";
import { useNavigation } from "@react-navigation/native";
import { useValues } from "@App";
import { appColors } from "@src/themes";

type authTemplate = {
  children: any,
  image: ImageProps | any
}
export function AuthTemplate({ children, image }: authTemplate) {
  const { goBack } = useNavigation();
  const { isDark, linearColorStyle,bgContainer ,imageRTLStyle} = useValues()
  return (
    <View style={[style.container, { backgroundColor: isDark ? linearColorStyle : appColors.lightGray }]}>
      <View style={style.topContainer}>
        <TouchableOpacity onPress={goBack} style={[style.backBtn, { borderColor: isDark ? appColors.darkBorder : appColors.border },{ backgroundColor: isDark ? linearColorStyle : appColors.lightGray },{ transform: [{ scale: imageRTLStyle }] }
        ]}>
          <Back />
        </TouchableOpacity>
        <View style={style.imgContainer}>
          <Image source={image} style={style.img} />
        </View>
      </View>
      <View style={[style.bottomContainer, { backgroundColor: bgContainer }]}>{children}</View>
    </View>
  );
}
