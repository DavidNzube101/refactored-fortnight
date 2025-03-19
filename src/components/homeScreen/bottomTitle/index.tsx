import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../../screens/homeScreen/home/styles'
import { Heart } from '@src/utils/icons'
import { useSelector } from 'react-redux'

const BottomTitle = () => {
    const { translateData } = useSelector((state: any) => state.setting);

    return (
        <View>
            <View style={styles.homeBottom}>
                <Text style={styles.title}>#GoTaxido</Text>
                <View style={styles.madeByContainer}>
                    <Heart />
                    <Text style={styles.madeBy}> {translateData.madeBy} Pixelstrap</Text>
                </View>
            </View>
        </View>
    )
}

export default BottomTitle