import { TextInput, View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button, CommonModal } from '@src/commonComponent';
import { external } from '../../../styles/externalStyle';
import { DescriptionText } from './descriptionText/index';
import { PictureCargo } from './pictureCargo/index';
import { useValues } from '../../../../App';
import { Calander } from '../../../screens/dateTimeSchedule/index';
import { appColors } from '@src/themes';
import { CountryCodeContainer } from '@src/screens/auth/signIn/signInComponents';
import { useAppNavigation } from '@src/utils/navigation';
import styles from './styles';
import { useSelector } from 'react-redux';

export function Freight({ pickupLocation, stops, destination, categoryId, zoneValue, categoryOption,categoryOptionID }) {
  const { navigate } = useAppNavigation();
  const [selected, setSelected] = useState(false);
  const { bgContainer, textColorStyle, textRTLStyle, isDark } = useValues();
  const [selectedGender, setSelectedGender] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [parcelWeight, setParcelWeight] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');  
  const { translateData } = useSelector((state) => state.setting);

  const handleDescriptionChange = (text) => {
    setDescriptionText(text);
  };

  const handleImageSelect = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const handleSelectGender = (gender: string) => {
    setSelectedGender(gender);
    setIsMenuOpen(false);
  };
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const closeModal = () => {
    setSelected(false)
  }

  const gotoRide = () => {
    navigate('BookRide', {
      destination,
      stops,
      pickupLocation,
      categoryId,
      zoneValue,
      descriptionText,
      selectedImage,
      parcelWeight,
      categoryOption,
      receiverName,
      countryCode,
      phoneNumber,
      categoryOptionID
    });
  }


  return (
    <View>
      {categoryOption === 'Parcel' ? (
        <View>
          <Text style={[styles.weightText,{ color: textColorStyle, textAlign: textRTLStyle }]}>
            Parcel Receiver Name
          </Text>
          <TextInput
            style={[styles.inputView,{
              backgroundColor: bgContainer,
              borderColor: isDark ? appColors.darkBorder : appColors.border,
           
              color: textColorStyle,
           
              textAlign: textRTLStyle,
            }]}
            keyboardType="ascii-capable"
            placeholder="Enter Receiver Name"
            placeholderTextColor={appColors.regularText}
            value={receiverName}
            onChangeText={(text) => setReceiverName(text)}
          />
          <Text style={[styles.parcelText, { color: textColorStyle, textAlign: textRTLStyle }]}>
            Parcel Receiver Number
          </Text>
          <CountryCodeContainer
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            backGroundColor={bgContainer}
            borderColor={isDark ? appColors.darkBorder : appColors.border}
          />

          <Text style={[styles.weightText, { color: textColorStyle, textAlign: textRTLStyle }]}>
            Weight (KG)
          </Text>
          <TextInput
            style={[styles.inputView, {
              backgroundColor: bgContainer,
              borderColor: isDark ? appColors.darkBorder : appColors.border,
              color: textColorStyle,
              textAlign: textRTLStyle
            }]}
            keyboardType="number-pad"
            placeholder="Enter Parcel Weight"
            placeholderTextColor={appColors.regularText}
            value={parcelWeight}
            onChangeText={(text) => setParcelWeight(text)}
          />
        </View>
      ) : null}

      <DescriptionText onTextChange={handleDescriptionChange} />
      <PictureCargo onImageSelect={handleImageSelect} categoryOption={categoryOption} />

      <View style={[external.mv_15]}>
        <Button title={translateData.bookRide} onPress={gotoRide} />
      </View>
      <CommonModal
        isVisible={selected}
        onPress={() => setSelected(false)}
        value={
          <View>
            <Calander onPress={closeModal} />
            <View style={styles.buttonView}>
              <Button title={translateData.Continue} onPress={() => setSelected(false)} />
            </View>
          </View>
        }
      />
    </View>
  );
};
