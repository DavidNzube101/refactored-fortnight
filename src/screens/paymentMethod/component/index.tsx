import { View, Text } from "react-native";
import React from "react";
import styles from "../styles";
import { useValues } from "@App";

const PaymentDetails = ({ title, rideAmount } :{title : string , rideAmount : number }) => {
  const { textColorStyle ,viewRTLStyle} = useValues();
  return (
    <View
      style={[styles.rideContainer,{flexDirection:viewRTLStyle}] }
    >
      <Text style={[styles.billTitle, { color: textColorStyle }]}>{title}</Text>
      <Text style={{ color: textColorStyle }}>${rideAmount}</Text>
    </View>
  );
};

export default PaymentDetails;
