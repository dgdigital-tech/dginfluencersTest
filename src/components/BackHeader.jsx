import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {responsiveWidth as wp} from 'react-native-responsive-dimensions';
import colors from '../styles/colors';

const BackHeader = ({navigation, title}) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" size={wp(6)} color={colors.white} />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={styles.headerSpacer} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(3),
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    fontFamily: 'Roboto-regular',
    color: colors.white,
  },
  headerSpacer: {
    // width: wp(6),
  },
});

export default BackHeader;
