import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../styles'
import { useValues } from '../../../../../App'
import { useSelector } from 'react-redux';

export function TotalFare({ handlePress, fareAmount, rideStatus }) {
    const { viewRTLStyle, textColorStyle, currPrice, currSymbol } = useValues();
    const { translateData } = useSelector((state) => state.setting);

    return (
        <View style={[styles.topView, { flexDirection: viewRTLStyle }]}>
            <View style={[styles.fareView,{flexDirection:viewRTLStyle}]}>
                <Text style={[styles.total, { color: textColorStyle }]}>{translateData.totalFare}</Text>
                <Text style={styles.amount}> {currSymbol}{currPrice * fareAmount}</Text>
            </View>
            {rideStatus === 'Completed' && (
                <TouchableOpacity style={styles.btnRetry} onPress={handlePress}>
                    <Text style={styles.retry}>{translateData.payNow}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}
