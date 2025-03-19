import {Text, View} from 'react-native';
import React from 'react';
import { alertData } from '../../../../../../data/alertData/index';
import {styles} from './styles';

export function AlertContainer() {
  return (
    <View style={[styles.container]}>
      <View style={[styles.alertBox]}>
        <Text style={[styles.alertText]}>Alert zone</Text>
        {alertData?.map(item => {
          return (
            <View style={[styles.alertItem]}>
              <View style={[styles.alertIcon]} />
              <Text style={[styles.alertItemText]}>{item.title}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
