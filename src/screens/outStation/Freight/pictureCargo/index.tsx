import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { Download } from '@utils/icons';
import { styles } from './styles';
import { useValues } from '../../../../../App';
import { appColors } from '@src/themes'; 

export function PictureCargo({ onImageSelect, categoryOption }) {
  const { textColorStyle, isDark, bgContainer,textRTLStyle } = useValues();
  const [image, setimage] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
      } else if (response.errorMessage) {
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setimage(source.uri)
        onImageSelect(response.assets);
      } else {
      }
    });
  };


  return (
    <TouchableOpacity activeOpacity={1} onPress={openImagePicker}>
      {categoryOption === 'Freight' ? (
        <Text style={[styles.cargoText, { color: textColorStyle },{textAlign:textRTLStyle }]}>
          Picture of your cargo
        </Text>
      ) : categoryOption === 'Parcel' ? (
        <Text style={[styles.cargoText, { color: textColorStyle },{textAlign:textRTLStyle }]}>
          Picture of your Packed Parcel
        </Text>
      ) : null}

      <View style={[styles.cargoView, { backgroundColor: bgContainer, borderColor: isDark ? appColors.darkBorder : appColors.border }]}>
        {image ? (
          <Image source={{ uri: image }} style={styles.selectedImage} />
        ) : (
          <>
            <View style={styles.dashedBorder}>
              <Download />
              <Text style={styles.uploadText}>update</Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};
