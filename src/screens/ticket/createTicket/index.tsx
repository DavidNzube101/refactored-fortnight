import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Header, InputText } from "@src/commonComponent";
import { appColors, appFonts, fontSizes, windowHeight } from "@src/themes";
import DropDownPicker from "react-native-dropdown-picker";
import { CloseIcon, Download } from "@src/utils/icons";
import DocumentPicker from "react-native-document-picker";
import {
  departmentDataGet,
  priorityDataGet,
  ticketDataGet,
} from "../../../api/store/actions/ticketAction";
import styles from "./styles";
import { getValue } from "@src/utils/localstorage";
import { useNavigation } from "@react-navigation/native";
import { URL } from "@src/api/config";
import { useValues } from "@App";

export function CreateTicket() {
  const dispatch = useDispatch();
  const [subjectValue, setSubjectValue] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [priorityList, setPriorityList] = useState([]);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [files, setFiles] = useState([]);
  const { priorityData, departmentData } = useSelector(
    (state: any) => state.tickets
  );
  const { translateData } = useSelector((state) => state.setting);

  const { goBack, navigate } = useNavigation();
  const {
    linearColorStyle,
    bgFullLayout,
    textColorStyle,
    textRTLStyle,
    isDark,
    isRTL,
    viewRTLStyle,
  } = useValues();

  useEffect(() => {
    dispatch(priorityDataGet());
    dispatch(departmentDataGet());
  }, []);

  type dropdownProps = {
    name: string;
    id: string;
  };
  useEffect(() => {
    if (priorityData?.data) {
      setPriorityList(
        priorityData?.data?.map((item: dropdownProps) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
    if (departmentData?.data) {
      setDepartmentList(
        departmentData?.data?.map((item: dropdownProps) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
  }, [priorityData, departmentData]);

  const handleDocumentUpload = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });
      setFiles([...files, ...response]);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert("Error", "Failed to upload file(s).");
      }
    }
  }, [files]);

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const TicketRequest = async () => {
    if (!subjectValue || !description || !selectedPriority || !selectedDepartment) {
      Alert.alert("Error", "All fields are required. Please complete the form before submitting.");
      return;
    }
  
    const token = await getValue("token");
    try {
      const formData = new FormData();
      formData.append("subject", subjectValue);
      formData.append("description", description);
      formData.append("priority_id", selectedPriority);
      formData.append("department_id", selectedDepartment);
  
      if (files.length > 0) {
        files.forEach((file, index) => {
          formData.append(`attachments[${index}]`, {
            uri: file.uri,
            name: file.name || `file-${index}`,
            type: file.type || "application/octet-stream",
          });
        });
      }
  
      const response = await fetch(`${URL}/api/ticket`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const responseData = await response.json();
      if (response.ok) {
        if (responseData.id) {
          goBack();
          dispatch(ticketDataGet());
        } else {
          Alert.alert("Error", responseData.message || "Failed to create ticket.");
        }
      } else {
        Alert.alert("Error", "Unable to process your request at the moment. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again later.");
    }
  };
  

  return (
    <View style={{ backgroundColor: linearColorStyle, height: "100%" }}>
      <Header value={translateData.createTicket} />
      <View style={styles.mainInput}>
        <InputText
          title={translateData.subject}
          placeholder={translateData.enterSubject}
          showTitle={true}
          value={subjectValue}
          onChangeText={setSubjectValue}
          borderColor={isDark ? appColors.darkBorder : appColors.border}
          placeholderTextColor={
            isDark ? appColors.darkText : appColors.regularText
          }
        />
        <Text
          style={[
            styles.fieldTitle,
            { color: textColorStyle },
            { textAlign: textRTLStyle },
            { fontFamily: appFonts.medium },
          ]}
        >
          {translateData.descriptionLabel}
        </Text>
        <TextInput
          style={[
            styles.descriptionField,
            {fontSize:fontSizes.FONT17},
            { textAlign: textRTLStyle },
            { backgroundColor: isDark ? bgFullLayout : appColors.whiteColor },
            { borderColor: isDark ? appColors.darkBorder : appColors.border },
            { color: textColorStyle },
            {fontFamily:appFonts.regular},
          ]}
          placeholder={translateData.writehere}
          placeholderTextColor={
            isDark ? appColors.darkText : appColors.regularText
          }
          multiline={true}
          numberOfLines={3}
          maxLength={500}
          value={description}
          onChangeText={setDescription}
        />
        <Text
          style={[
            styles.fieldTitle,
            { color: textColorStyle },
            { textAlign: textRTLStyle },
            { marginTop: windowHeight(15) },
            { fontFamily: appFonts.medium },
          ]}
        >
          {translateData.priority}
        </Text>
        <DropDownPicker
          open={open}
          value={selectedPriority}
          items={priorityList}
          setOpen={setOpen}
          setValue={setSelectedPriority}
          placeholder={translateData.selectPriority}
          style={[
            styles.dropDownContainer,
            {
              backgroundColor: isDark ? bgFullLayout : appColors.whiteColor,
              borderColor: isDark ? appColors.darkBorder : appColors.border,
              flexDirection: viewRTLStyle,
              paddingHorizontal: windowHeight(12),
            },
          ]}
          dropDownContainerStyle={{
            backgroundColor: isDark ? bgFullLayout : appColors.lightGray,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          }}
          tickIconStyle={{
            tintColor: isDark ? appColors.whiteColor : appColors.blackColor,
          }}
          textStyle={{
            textAlign: isRTL ? "right" : "left",
            color: isDark ? appColors.whiteColor : appColors.blackColor,
            fontFamily:appFonts.regular,
            fontSize:fontSizes.FONT17
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
          dropDownDirection="TOP"
          zIndex={2}
          rtl={isRTL}
        />
        <Text
          style={[
            styles.fieldTitle,
            { color: textColorStyle },
            { textAlign: textRTLStyle },
            { bottom: windowHeight(2) },
            { fontFamily: appFonts.medium },
          ]}
        >
          {translateData.department}
        </Text>
        <DropDownPicker
          open={openDepartment}
          value={selectedDepartment}
          items={departmentList}
          setOpen={setOpenDepartment}
          setValue={setSelectedDepartment}
          placeholder={translateData.selectDepartment}
          style={[
            styles.dropDownContainer,
            {
              backgroundColor: isDark ? bgFullLayout : appColors.whiteColor,
              borderColor: isDark ? appColors.darkBorder : appColors.border,
              flexDirection: viewRTLStyle,
              paddingHorizontal: windowHeight(12),
            },
          ]}
          dropDownContainerStyle={{
            backgroundColor: isDark ? bgFullLayout : appColors.lightGray,
            borderColor: isDark ? appColors.darkBorder : appColors.border,
          }}
          tickIconStyle={{
            tintColor: isDark ? appColors.whiteColor : appColors.blackColor,
          }}
          textStyle={{
            textAlign: isRTL ? "right" : "left",
            color: isDark ? appColors.whiteColor : appColors.blackColor,
            fontFamily:appFonts.regular,
            fontSize:fontSizes.FONT17
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
          dropDownDirection="TOP"
          zIndex={2}
          rtl={isRTL}
        />

        <Text
          style={[
            styles.fieldTitle,
            { color: textColorStyle },
            { textAlign: textRTLStyle },
            { fontFamily: appFonts.medium },
          ]}
        >
          {translateData.uploadFile}
        </Text>
        {files.length > 0 ? (
          <View style={[styles.imgContainer, { flexDirection: viewRTLStyle }]}>
            {files.map((file, index) => (
              <View key={index} style={[styles.imgView,{borderColor:isDark?appColors.darkBorder:appColors.border}]}>
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => handleRemoveFile(index)}
                >
                  <CloseIcon />
                </TouchableOpacity>
                {file.type?.includes("image") ? (
                  <Image source={{ uri: file?.uri }} style={styles.img} />
                ) : (
                  <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>{file.name}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleDocumentUpload}
            activeOpacity={0.7}
            style={[
              styles.docSelection,
              { backgroundColor: isDark ? bgFullLayout : appColors.whiteColor },
              { borderColor: isDark ? appColors.darkBorder : appColors.border },
            ]}
          >
            <View style={styles.docContainer}>
              <Download />
              <Text style={styles.uploadText}>{translateData.upload}</Text>
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={TicketRequest} style={styles.submitBtn}>
          <Text style={styles.submitText}>{translateData.submit}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
