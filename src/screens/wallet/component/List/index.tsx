import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "./styles";
import { Receipt, PlusAmount, MinusAmount } from "@utils/icons";
import { appColors } from "@src/themes";
import { useValues } from "../../../../../App";
import { useTheme } from "@react-navigation/native";

interface DataItem {
  detail: string;
  type: "debit" | "credit";  
  amount: number;
}

interface ListProps {
  dataList: DataItem[];  
}

export function List({ dataList }  :ListProps) {
  const { currSymbol, currPrice } = useValues();
  const { colors } = useTheme();
  const { viewRTLStyle, textRTLStyle, bgFullLayout } = useValues();

  return (
    <View
      style={[
        styles.dataView,
        { backgroundColor: bgFullLayout, borderColor: colors.border },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {dataList?.map((data, index) => (
          <View key={index}>
            <View style={[styles.list, { flexDirection: viewRTLStyle }]}>
              <View style={{ flexDirection: viewRTLStyle }}>
                <View
                  style={[
                    styles.receiptView,
                    styles.bgStyle
                  ]}
                >
                  <Receipt color={colors.text} />
                </View>
                <View style={styles.detailView}>
                  <Text
                    style={[styles.description, { textAlign: textRTLStyle }]}
                  >
                    {data.detail}
                  </Text>
                </View>
              </View>

              <View style={[styles.amountView,{flexDirection:viewRTLStyle}]}>
                <View style={styles.icons}>
                  {data.type === "debit" ? <MinusAmount /> : <PlusAmount />}
                </View>
                <Text
                  style={[
                    styles.amount,
                    {
                      color:
                        data.type === "debit"
                          ? appColors.alertRed
                          : appColors.price,
                    },
                  ]}
                >
                  {currSymbol}
                  {currPrice * data.amount}
                </Text>
              </View>
            </View>
            <View style={[styles.dash, { borderColor: colors.border }]} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
