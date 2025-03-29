import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions'; // Assuming you have a utility for responsive width and height
import colors from '../styles/colors'; // Your color palette file

// CustomButton Component
const CustomButton = ({
  onPress,
  title,
  width,
  height,
  color,
  textColor,
  textSize,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.uploadButton,
        {
          width: width || wp(90),
          height: height || hp(6),
          backgroundColor: color || colors.primary,
        },
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.uploadButtonText,
          {color: textColor || colors.white, fontSize: textSize || wp(4.5)},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    paddingVertical: hp(1),
    marginVertical: hp(0.5),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // paddingHorizontal: wp(10),
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: wp(4.5),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomButton;
