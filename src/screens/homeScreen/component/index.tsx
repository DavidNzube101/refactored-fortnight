import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Calendar } from "react-native-calendars";
import { RightArrows, LeftArrow, Back } from "@utils/icons";
import styles from "./styles";
import { months, years } from "../../dateTimeSchedule/data";
import Images from "@utils/images";
import { appColors, appFonts, fontSizes, windowHeight, windowWidth } from "@src/themes";
import { useValues } from "../../../../App";
import { Button, LineContainer } from "@src/commonComponent";
import { useAppNavigation, useAppRoute } from "@src/utils/navigation";
import { useSelector } from "react-redux";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function Calander({ }) {
  const [selecte, setSelecte] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(monthNames[new Date().getMonth()]);
  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [periods, setPeriods] = useState(["AM", "PM"]);
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);
  const [day, setday] = useState(new Date().getDate().toString());
  const [datee, setDate] = useState("");
  const [time, setTime] = useState("00");
  const { navigate, goBack } = useAppNavigation();
  const route = useAppRoute();
  const { fieldValue, categoryId, categorySlug } = route.params || {};
  const { linearColorStyle, textColorStyle, isDark, bgContainer, viewRTLStyle, textRTLStyle, isRTL } = useValues()
  const { translateData } = useSelector((state) => state.setting);


  const currentYear = new Date().getFullYear().toString();

  const years = Array.from({ length: 5 }, (_, i) => {
    const year = (parseInt(currentYear) + i).toString();
    return { label: year, value: year, disabled: true }; 
  });

  const [selectedYear, setSelectedYear] = useState(currentYear);


  const gotoBack = () => {
    if (fieldValue === 'Ride') {
      navigate("Ride", {
        DateValue: `${day} ${selectedMonth} ${selectedYear}`,
        TimeValue: `${hour}:${time} ${periods[selectedPeriodIndex]}`,
        field: 'schedule',
        categoryOption: 'Cab',
        categoryId: categoryId,
        categorySlug: categorySlug,
      });
    } else {
      navigate("RentalBooking", {
        DateValue: `${day} ${selectedMonth} ${selectedYear}`,
        TimeValue: `${hour}:${time} ${periods[selectedPeriodIndex]}`,
        field: fieldValue,
        categoryId: categoryId
      });
    }
  };

  const handleLeftArrowClick = () => {
    setSelectedPeriodIndex(0);
  };

  const handleRightArrowClick = () => {
    setSelectedPeriodIndex(1);
  };

  const handleDecrease = () => {
    let newTime = parseInt(time, 10) - 1;
    if (newTime >= 0) {
      setTime(newTime.toString().padStart(2, "0"));
    }
  };

  const handleIncrease = () => {
    let newTime = parseInt(time, 10) + 1;
    if (newTime <= 60) {
      setTime(newTime.toString().padStart(2, "0"));
    }
  };

  const [hour, setHour] = useState("00");
  const handleDecreaseHour = () => {
    let newHour = parseInt(hour, 10) - 1;
    if (newHour >= 0) {
      setHour(newHour.toString().padStart(2, "0"));
    }
  };

  const handleIncreaseHour = () => {
    let newHour = parseInt(hour, 10) + 1;
    if (newHour <= 12) {
      setHour(newHour.toString().padStart(2, "0"));
    }
  };

  useEffect(() => {
    const selectedMonthObject = months.find(
      (month) => month.value === selectedMonth
    );
    if (selectedMonthObject) {
      setDate(`${selectedYear}-${selectedMonthObject.no}-01`);
    }
  }, [selectedMonth, selectedYear]);

  return (
    <ScrollView style={{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray }} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={[styles.backBtn, {
        backgroundColor: bgContainer,
        borderColor: isDark ? appColors.darkBorder : appColors.border,
      }]} onPress={goBack}>
        <Back />
      </TouchableOpacity>
      <View style={[styles.header]}>
        <Text style={[styles.headerTitle, { color: textColorStyle }]}>{translateData.dateTimeSchedule}</Text>
      </View>
      <View style={[styles.banner, { backgroundColor: isDark ? appColors.darkPrimary : appColors.whiteColor }]}>
        <Text style={[styles.bannerTitle, { color: textColorStyle }]}>{translateData.timeNote} </Text>
        <Text style={[styles.bannerTitle, { color: textColorStyle }]}>{translateData.pickedUp}</Text>
      </View>
      <View style={[styles.lineContainer, { flexDirection: viewRTLStyle }]}>
        <Image source={Images.line2} style={styles.line2} />
        <Image source={Images.line2} style={styles.line2} />
      </View>
      <View style={styles.dateView1}>
        <View style={[styles.subContainer, { backgroundColor: isDark ? appColors.darkPrimary : appColors.whiteColor, borderColor: isDark ? appColors.darkPrimary : appColors.border }]}>
          <Text style={[styles.selectDate, { textAlign: textRTLStyle }]}>
            {day} {selectedMonth} {selectedYear}, {hour}:{time}{" "}
            {periods[selectedPeriodIndex]}
          </Text>
        </View>
      </View>

      <View style={[styles.dropdownRow, { flexDirection: viewRTLStyle, zIndex: 3000 }]}>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={openMonth}
            value={selectedMonth}
            items={months}
            defaultValue={selectedMonth}
            setOpen={setOpenMonth}
            setValue={setSelectedMonth}
            containerStyle={styles.dropdownContainer}
            onChangeItem={(item: { value: any }) => console.log(item.value)}
            style={[styles.dropdown, { backgroundColor: isDark ? appColors.darkPrimary : appColors.whiteColor, borderColor: isDark ? appColors.darkPrimary : appColors.border }]}
            textStyle={[styles.dropDownText, { color: isDark ? appColors.whiteColor : appColors.primaryText }]}
            zIndex={2}
            placeholder={translateData.selectMonth}
            dropDownContainerStyle={{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray, borderColor: isDark ? appColors.bgDark : appColors.border, maxHeight: windowHeight(450) }}
            tickIconStyle={{
              tintColor: isDark ? appColors.whiteColor : appColors.blackColor,
            }}
            textStyle={{
              textAlign: isRTL ? "right" : "left",
              color: isDark ? appColors.whiteColor : appColors.blackColor,
            }}
            iconContainerStyle={{
              color: isDark ? appColors.whiteColor : appColors.blackColor,
            }}
            arrowIconStyle={{
              tintColor: isDark ? appColors.whiteColor : appColors.blackColor,
            }}
            placeholderStyle={{
              color: isDark ? appColors.darkText : appColors.regularText,
            }}
          />
        </View>
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={openYear}
            value={selectedYear}
            items={years}
            defaultValue={selectedYear}
            setOpen={setOpenYear}
            setValue={setSelectedYear}
            placeholder={currentYear}
            containerStyle={styles.dropdownContainer2}
            onChangeItem={(item: { value: React.SetStateAction<string> }) =>
              setSelectedYear(item.value)
            }
            style={[styles.dropdown, { backgroundColor: isDark ? appColors.darkPrimary : appColors.whiteColor, borderColor: isDark ? appColors.darkPrimary : appColors.border }]}
            textStyle={[styles.dropDownText, { color: isDark ? appColors.whiteColor : appColors.primaryText }]}
            zIndex={2}
            dropDownContainerStyle={{ backgroundColor: isDark ? appColors.bgDark : appColors.lightGray, borderColor: isDark ? appColors.bgDark : appColors.border }}
            tickIconStyle={{
              tintColor: isDark ? appColors.whiteColor : appColors.blackColor,
            }}
            textStyle={{
              textAlign: isRTL ? "right" : "left",
              color: isDark ? appColors.whiteColor : appColors.blackColor,
            }}
            iconContainerStyle={{
              color: isDark ? appColors.whiteColor : appColors.blackColor,
            }}
            arrowIconStyle={{
              tintColor: isDark ? appColors.whiteColor : appColors.blackColor,
            }}
            placeholderStyle={{
              color: isDark ? appColors.darkText : appColors.regularText,
            }}
          />
        </View>
      </View>

      <View style={styles.calView}>
        <View style={styles.lineContainer1}>
          <LineContainer />
        </View>
        <Calendar
          key={datee + ""}
          style={styles.calendar}
          minDate={new Date().toISOString().split("T")[0]}
          markedDates={{
            [selecte]: {
              selected: true,
              disableTouchEvent: true,
              customStyles: {
                container: {
                  backgroundColor: appColors.buttonBg,
                  borderRadius: windowHeight(5),
                },
              },
            },
          }}

          hideExtraDays={false}
          theme={{
            backgroundColor: appColors.whiteColor,
            calendarBackground: isDark ? appColors.darkPrimary : appColors.whiteColor,
            textSectionTitleColor: appColors.textSectionTitleColor,
            selectedDayBackgroundColor: appColors.selectedDayBackgroundColor,
            selectedDayTextColor: appColors.whiteColor,
            todayTextColor: appColors.todayTextColor,
            dayTextColor: appColors.greyyy,
            todayBackgroundColor: appColors.whiteColor,
            arrowColor: isDark ? appColors.whiteColor : appColors.blackColor,
            dotColor: appColors.buttonBg,
            'stylesheet.calendar.header': {

              dayHeader: {
                color: appColors.greyyy,
                fontSize: fontSizes.FONT16,
                marginTop: windowHeight(3),
                fontFamily: appFonts.medium,
                textTransform: 'uppercase',
              },
            },
          }}
          current={datee}

          onDayPress={(day) => {
            const today = new Date().toISOString().split("T")[0];
            if (day.dateString < today) {
              alert("You cannot select a past date.");
              return;
            }
            setday(day.day);
            setSelecte(day.dateString);
          }}
          markingType={"custom"}
          dayComponent={({ date, state, marking, onPress }) => {
            let parent = [];
            let backgroundColor = isDark ? linearColorStyle : appColors.lightGray;
            let color = isDark ? appColors.whiteColor : appColors.blackColor;
            if (state === "disabled") {
              backgroundColor = isDark ? appColors.darkPrimary : "";
              color = isDark ? appColors.darkPrimary : appColors.greyyy;
            } else if (marking && marking.selected) {
              backgroundColor = appColors.buttonBg;
              color = appColors.whiteColor;
            }

            parent.push(
              <TouchableOpacity
                onPress={() => onPress(date)}
                style={[styles.dateView, { backgroundColor }]}
              >
                <Text style={[styles.dateText, { color }]}>{date.day}</Text>
              </TouchableOpacity>
            );
            return parent;
          }}
        />
      </View>

      <View style={[styles.timeContainer, { backgroundColor: isDark ? appColors.darkPrimary : appColors.whiteColor, borderColor: isDark ? appColors.darkPrimary : appColors.border }, { flexDirection: viewRTLStyle }]}>
        <View style={[styles.arrowView2, { flexDirection: viewRTLStyle }]}>
          <TouchableOpacity style={styles.arrowView} onPress={handleDecreaseHour}>
            <LeftArrow />
          </TouchableOpacity>
          <Text style={styles.time}>{hour}</Text>
          <TouchableOpacity style={styles.arrowView} onPress={handleIncreaseHour}>
            <RightArrows />
          </TouchableOpacity>
        </View>
        <View style={[styles.line, { borderRightColor: isDark ? appColors.darkBorder : appColors.border }]} />
        <View style={[styles.arrowView1, { flexDirection: viewRTLStyle }]}>
          <TouchableOpacity style={styles.arrowView} onPress={handleDecrease}>
            <LeftArrow />
          </TouchableOpacity>
          <Text style={styles.time}>{time}</Text>
          <TouchableOpacity style={styles.arrowView} onPress={handleIncrease}>
            <RightArrows />
          </TouchableOpacity>
        </View>
        <View style={[styles.line, { borderRightColor: isDark ? appColors.darkBorder : appColors.border }]} />
        <View style={[styles.arrowView3, { flexDirection: viewRTLStyle }]}>
          <TouchableOpacity style={styles.arrowView} onPress={handleLeftArrowClick}>
            <LeftArrow />
          </TouchableOpacity>
          <Text style={[styles.day, { color: textColorStyle }]}>{periods[selectedPeriodIndex]}</Text>
          <TouchableOpacity style={styles.arrowView} onPress={handleRightArrowClick}>
            <RightArrows />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnView}>
        <Button title={translateData.confirm} onPress={gotoBack} />
      </View>
    </ScrollView>
  );
}

