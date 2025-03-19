import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { getValue, setValue } from "@src/utils/localstorage";
import { languageDataGet, settingDataGet, translateDataGet } from "@src/api/store/actions";
import { useAppNavigation } from "@src/utils/navigation";
import { useValues } from "../../../../App";
import { BackArrow } from "@utils/icons";
import Images from "@utils/images";
import {  useSlides } from "../../../data/onBoardingData/index";
import { styles } from "./styles";
import { external } from "../../../styles/externalStyle";
import { appColors, windowHeight, windowWidth } from "@src/themes";

export function Onboarding() {
  const { colors } = useTheme()
  const dispatch = useDispatch();
  const { navigate } = useAppNavigation();
  const swiperRef = useRef<Swiper | null>(null);
  const { settingData, languageData, translateData } = useSelector(
    (state: any) => state.setting
  );
  const { isDark, bgFullStyle, textColorStyle, viewRTLStyle } = useValues();
  const imageDarkBottom = isDark ? Images.bgDarkOnboard : Images.bgOnboarding;
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [items, setItems] = useState<
    { label: string; value: string; icon: () => JSX.Element }[]
  >([]);
  const slides = useSlides();

  useFocusEffect(
    useCallback(() => {
      dispatch(languageDataGet());
      dispatch(settingDataGet());
      dispatch(translateDataGet())
    }, [dispatch])
  );

  useEffect(() => {
    const setDefaultLanguage = async () => {
      const defaultLang = settingData.values.general.default_language.locale;
      await setValue("defaultLanguage", defaultLang);
    };
    setDefaultLanguage();
  }, [settingData]);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLang = await getValue("selectedLanguage");
        if (storedLang) {
          setSelectedLanguage(storedLang);
          return;
        }

        if (!settingData?.values?.general?.default_language) {
          return;
        }

        const defaultLangObj = settingData.values.general.default_language;

        if (typeof defaultLangObj !== "object" || !defaultLangObj.locale) {
          return;
        }

        const defaultLang = defaultLangObj.locale;
        if (!languageData?.data || languageData.data.length === 0) {
          return;
        }

        const matchingLang = languageData.data.find(
          (lang) => lang.locale === defaultLang
        );

        if (matchingLang) {
          setSelectedLanguage(matchingLang.locale);
          await setValue("selectedLanguage", matchingLang.locale);
        } else {
        }
      } catch (error) { }
    };

    loadLanguage();
  }, [settingData, languageData]);

  useEffect(() => {
    if (languageData?.data) {
      const formattedItems = languageData.data.map((lang) => ({
        label: lang.name,
        value: lang.locale,
        icon: () => (
          <Image source={{ uri: lang.flag }} style={styles.flagImage} />
        ),
      }));
      setItems(formattedItems);
    }
  }, [languageData]);

  const handleLanguageChange = async (selectedValue: string | null) => {
    if (!selectedValue) return;
    setSelectedLanguage(selectedValue);
    try {
      await setValue("selectedLanguage", selectedValue);
    } catch (error) { }
  };

  const handleNavigation = () => {
    if (settingData?.values?.activation?.login_number == 1) {
      navigate("SignIn");
    } else {
      navigate("SignInWithMail");
    }
  };

  const handleNext = (index: number) => {
    if (index < slides.length - 1) {
      swiperRef?.current?.scrollBy(1);
    } else {
      handleNavigation();
    }
  };

  return (
    <Swiper
      loop={false}
      ref={swiperRef}
      activeDotStyle={styles.activeStyle}
      removeClippedSubviews={true}
      dotColor={isDark ? appColors.dotDark : appColors.dotLight}
      dotStyle={styles.dotStyles}
      paginationStyle={styles.paginationStyle}
    >
      {slides.map((slide, index) => (
        <View
          key={index}
          style={[styles.slideContainer, { backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }]}
        >
          <View
            style={[styles.languageContainer, { flexDirection: viewRTLStyle }]}
          >
            <DropDownPicker
              open={open}
              value={selectedLanguage}
              items={items}
              setOpen={setOpen}
              setValue={async (callback) => {
                const selectedValue =
                  callback instanceof Function
                    ? callback(selectedLanguage)
                    : callback;
                if (!selectedValue) return;

                setSelectedLanguage(selectedValue);
                dispatch(settingDataGet());
                dispatch(translateDataGet())

                try {
                  await setValue(
                    "selectedLanguage",
                    JSON.stringify(selectedValue)
                  );
                } catch (error) {
                }
              }}
              setItems={setItems}
              onChangeValue={handleLanguageChange}
              placeholder={selectedLanguage ? undefined : "language"}
              dropDownContainerStyle={[
                styles.dropdownManu,
                { backgroundColor: bgFullStyle },
              ]}
              labelStyle={[styles.labelStyle, { color: textColorStyle }]}
              containerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              textStyle={{ color: textColorStyle }}
              theme={isDark ? "DARK" : "LIGHT"}
            />
            <TouchableOpacity style={{
              borderWidth: 1,
              borderColor: colors.border,
              alignContent: 'center',
              justifyContent: 'center',
              paddingHorizontal: windowWidth(12),
              paddingVertical: windowHeight(4),
              borderRadius:windowHeight(4),
              marginHorizontal:windowWidth(15)
            }} activeOpacity={0.7} onPress={handleNavigation}>
              <Text style={[styles.skipText, { color: appColors.regularText }]}>
                {translateData.skip}
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            style={styles.imageBackground}
            source={isDark ? slide.imagesDark : slide.image}
          />
          <View style={[styles.imageBgView, { backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }]}>
            <ImageBackground
              resizeMode="stretch"
              style={styles.img}
              source={imageDarkBottom}
            >
              <Text style={[styles.title, { color: textColorStyle }]}>
                {slide.text}
              </Text>
              <Text style={[styles.description, external.as_center]}>
                {translateData.description}
              </Text>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => handleNext(index)}
              >
                <BackArrow
                  colors={appColors.whiteColor}
                  width={21}
                  height={21}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      ))}
    </Swiper>
  );
}
