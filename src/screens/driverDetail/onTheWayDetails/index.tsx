import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { external } from '../../../styles/externalStyle';
import {DetailScreen} from './detailScreen/index';
import {HeaderContainer, CommonModal, VerticalLine} from '@src/commonComponent';
import { commonStyles } from '../../../styles/commonStyle';
import { appColors } from '@src/themes'; 
import { BackArrow } from '@utils/icons';
import cancelReason from '../../rideActive/data';
import styles from './styles';
import { useValues } from '@App';

export function OnTheWayDetails({ height }) {
  const [selected, setSelected] = useState(true);
  const {viewRTLStyle}=useValues()
  const renderItem = ({ item }) => {
    return (
      <View
        style={[styles.renderView,{flexDirection:viewRTLStyle}]}>
        <BackArrow />
        <VerticalLine dynamicHeight={'50%'} />
        <Text style={[commonStyles.mediumTextBlack12]}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View style={[external.fx_1]}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <HeaderContainer
        show={true}
        icon={
          <Text style={[commonStyles.mediumText23, { color: appColors.buttonBg }]}>
            Cancel
          </Text>
        }
        onPressIcon={() => setSelected(!selected)}
      />
      <View
        style={styles.textView}>
        <View style={[styles.viewText,{ flexDirection: viewRTLStyle }]}>
          <Text style={[commonStyles.mediumTextBlack, { color: appColors.whiteColor }]}>
            The driver’s on the way
          </Text>
          <Text style={[commonStyles.extraBold, { color: appColors.whiteColor }]}>6 min</Text>
        </View>
        <Text
          style={[commonStyles.regularText, external.mt_3, { color:appColors.categoryTitle }]}>
          Please don’t be late
        </Text>
      </View>
      <DetailScreen />
      <CommonModal
        isVisible={selected}
        onPress={() => setSelected(false)}
        value={
          <TouchableOpacity onPress={() => setSelected(!selected)}>
            <Text style={[commonStyles.mediumTextBlack, external.ti_center]}>
              Why do you want to cancel?
            </Text>
            <FlatList
              renderItem={renderItem}
              data={cancelReason}
              contentContainerStyle={styles.listStyle}
            />
          </TouchableOpacity>
        }
      />
    </View>
  );
};
