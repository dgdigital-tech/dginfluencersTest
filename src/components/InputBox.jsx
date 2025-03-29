import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../styles/colors';

const InputBox = ({
  label,
  placeholder,
  value,
  setValue,
  iconname,
  CheckValuePresent,
  maxLength,
  ...props
}) => {
  return (
    <View
      style={[
        styles.InputContainer,
        CheckValuePresent && {borderColor: 'red'},
      ]}>
      <View style={[styles.labelContainer, !label && {zIndex: -1}]}>
        <Text style={styles.label}>{label}</Text>
      </View>

      <TextInput
        {...props}
        style={styles.input}
        // placeholder={placeholder}
        maxLength={maxLength}
        // placeholderTextColor={'#BEBEBE'}
        value={value}
        onChangeText={setValue}
        autoCapitalize="none"
      />
      <View style={styles.partitionBorder}></View>
      <Icon name={iconname} size={20} color="#223265" />
    </View>
  );
};

const styles = StyleSheet.create({
  InputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#223265',
    marginTop: hp(2.5),
    paddingRight: 20,
    borderRadius: 8,
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderColor: '#000000',
    borderRadius: 8,
    top: -15,
    left: 9,
    overflow: 'hidden',
  },
  label: {
    color: '#223265',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
  input: {
    flex: 1, // Allow text input to take full width
    paddingLeft: 14,
    padding: 10,
    fontFamily: 'Roboto-Regular',
    // color: '#223265',
    color: colors.primary,
  },
  partitionBorder: {
    borderLeftWidth: 2,
    borderColor: '#f2f2f2',
    height: '75%',
    paddingRight: '2%',
  },
});

export default InputBox;
