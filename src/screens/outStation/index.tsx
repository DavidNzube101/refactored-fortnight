import React from 'react';
import { View, Text,ScrollView } from 'react-native';
import { Header } from '@src/commonComponent';
import { commonStyles } from '../../styles/commonStyle';
import { external } from '../../styles/externalStyle';
import { Freight } from './Freight/index';
import { styles } from './style';
import { Driving } from '@utils/icons';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export function Outstation() {
  const route = useRoute();
  const { pickupLocation, stops, destination, categoryId, zoneValue,categoryOption,categoryOptionID } = route.params;
  const { translateData } = useSelector((state) => state.setting);


  return (
    <View style={[commonStyles.flexContainer]}>
      <Header
        value={`${categoryOption} ${translateData.details}`}
        container={
          <ScrollView
            contentContainerStyle={[external.Pb_80]}
            showsVerticalScrollIndicator={false}>
            <View style={styles.viewContainer}>
              <Driving />
              <Text style={styles.fareStyle}>{translateData.note}</Text>
            </View>
            <View style={[external.mh_20]}>
              <Freight pickupLocation={pickupLocation} stops={stops} destination={destination} categoryId={categoryId} zoneValue={zoneValue} categoryOption={categoryOption} categoryOptionID={categoryOptionID} />
            </View>
          </ScrollView>
        }
      />
    </View>
  );
};
