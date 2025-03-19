import { FlatList, Pressable, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { commonStyles } from '../../../styles/commonStyle';
import {HeaderContainer, SolidLine, IconBackground} from '@src/commonComponent';
import { Correct, ProfileSetting, UserPlus } from '@utils/icons';
import { external } from '../../../styles/externalStyle';
import { styles } from './styles';
import { useValues } from '../../../../App';
import { appColors } from '@src/themes'; 
import Contacts from 'react-native-contacts';
import { useAppNavigation } from '@src/utils/navigation';
import { useSelector } from 'react-redux';

export function ChooseRiderScreen() {
  const { bgFullStyle, linearColorStyle, textColorStyle, isDark } = useValues();
  const { navigate } = useAppNavigation();
  const [selected, setSelected] = useState<number | null>(null);
  const [contacts, setContacts] = useState([]);
  const { translateData } = useSelector((state) => state.setting);

  useEffect(()=>{
    fetchContacts();
  },[])

  const fetchContacts = () => {
    Contacts.getAll()
      .then((contactsList) => {
        setContacts(contactsList);
      })
      .catch((error) => {
      });
  };

  const handleChange = (index: number) => {
    setSelected(selected === index ? null : index);
  };
  const { textRTLStyle, viewRTLStyle } = useValues();

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    
    return (
      <View style={[external.ph_20]}>
        <Pressable
          onPress={() => handleChange(index)}
          style={[external.ai_center, external.pv_10, { flexDirection: viewRTLStyle }]}>
          <View style={[styles.container, { backgroundColor: bgFullStyle, flexDirection: viewRTLStyle }]}>
            <ProfileSetting />
          </View>
          <View style={[external.ai_center, { flexDirection: viewRTLStyle }]}>
            <Text style={[styles.titleStyle, { color: textColorStyle, textAlign: textRTLStyle }]}>
              {item.displayName}
            </Text>
            {selected === index && <Correct />}
          </View>
        </Pressable>
        <SolidLine color={isDark ? appColors.darkBorder : appColors.border} />
      </View>
    );
  };
  return (
    <View style={[commonStyles.flexContainer, { backgroundColor: bgFullStyle }]}>
      <View style={[styles.viewContainer, { backgroundColor: bgFullStyle }]}>
        <HeaderContainer
          show={true}
          icon={
            <IconBackground
              backgroundColor={linearColorStyle}
              icon={<UserPlus />}
              onPress={() => navigate('AddNewRider')}
              borderColor={linearColorStyle}
            />
          }
          value={translateData.chooseaRider}
        />
      </View>
      <View style={[external.main,{ backgroundColor: linearColorStyle }]}>
        <FlatList renderItem={renderItem} data={contacts}  showsVerticalScrollIndicator={false}/>
      </View>
    </View>
  );
};
