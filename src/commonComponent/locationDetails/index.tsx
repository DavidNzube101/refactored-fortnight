import { Text, View } from 'react-native';
import React from 'react';
import { external } from '../../styles/externalStyle';
import { styles } from './styles';
import { Gps, PickLocation } from '@utils/icons';
import { useValues } from '../../../App';

export function LocationDetails({locationDetails}) {
  const {
    bgFullStyle,
    textColorStyle,
    iconColorStyle,
    viewRTLStyle,
    textRTLStyle,
    t
  } = useValues();  

  return (
    <View
      style={[
        styles.addressContainer,
        { flexDirection: viewRTLStyle },
        { backgroundColor: bgFullStyle },
      ]}>
      <View style={[external.fd_column, external.mh_15, external.mt_8]}>
        <PickLocation height={12} width={12} colors={iconColorStyle} />
        <View style={styles.icon} />
        <Gps height={12} width={12} colors={iconColorStyle} />
      </View>
      <View style={[external.pv_10, external.mh_5]}>
        <Text
          style={[
            styles.itemStyle,
            { color: textColorStyle },
            { textAlign: textRTLStyle },
          ]}>
          {locationDetails[0]}
        </Text>
        <View style={styles.dashedLine} />
        <Text style={[styles.pickUpLocationStyles, { color: textColorStyle }]}>
          {locationDetails[1]}
        </Text>
      </View>
    </View>
  );
};
