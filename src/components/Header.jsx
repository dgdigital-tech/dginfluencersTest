import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from './styles/colors';

const Header = ({
  // userName,
  profilePic,
  isBoothAdmin,
  boothNumber,
  boothName,
  wardName,
  wardNumber,
  isSurveyorAdmin,
}) => {
  const navigation = useNavigation();

  const [userName, setuserName] = useState('');

  const handleLogout = async () => {
    await AsyncStorage.removeItem('Authtoken');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('AssemblyNO');
    await AsyncStorage.removeItem('userRole');
    await AsyncStorage.removeItem('showVotingPermission');
    await AsyncStorage.removeItem('editPermission');
    await AsyncStorage.removeItem('AssemblyName');
    navigation.replace('LoginScreen');
  };

  useEffect(() => {
    const getUser = async () => {
      const getName = await AsyncStorage.getItem('userName');

      setuserName(getName);
      console.log(getName);
    };
    getUser();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {/* Show profile pic and username if either Super Admin or Booth Admin */}
          {isSurveyorAdmin ? (
            <>
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={styles.hamburgerButton}>
                <Icon name="menu" size={30} color={colors.white} />
              </TouchableOpacity>

              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 10,
                    fontFamily: 'Roboto-Regular',
                  }}>
                  Welcome
                </Text>
                <Text style={styles.userName}>{userName}</Text>
              </View>
            </>
          ) : (
            // Show hamburger button when not Super Admin or Booth Admin
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.hamburgerButton}>
              <Icon name="menu" size={30} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.RightContainer}>
          {/* Show logout button for Super Admin or Booth Admin */}

          <>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}>
              <Icon name="logout" size={30} color={colors.white} />
            </TouchableOpacity>
          </>
        </View>
      </View>
      <View style={{backgroundColor: colors.primary, paddingBottom: 5}}>
        {boothNumber && (
          <Text style={styles.wardNameStyle}>
            {boothName ? boothName : ''} - Booth No : {boothNumber}
          </Text>
        )}

        {wardNumber && (
          <Text style={styles.wardNameStyle}>
            Ward :{' '}
            {wardName && wardName.length > 20
              ? wardName.substring(0, 20) + '...'
              : wardName}{' '}
            , No : {wardNumber}
          </Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profilePicFallback: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    marginRight: wp(3),
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicText: {
    fontSize: wp(5),
    color: colors.primary,
    textTransform: 'capitalize',
  },
  RightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicIcon: {
    marginRight: wp(2),
    marginTop: 5,
    width: hp(5.5),
    height: hp(5.5),
  },
  profilePic: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    marginRight: wp(3),
  },
  userName: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: wp(3.5),
    textTransform: 'capitalize',
  },
  wardNameStyle: {
    fontSize: wp(3.8),
    // fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    color: colors.white,
    alignSelf: 'center',
  },
  logoutButton: {
    padding: wp(2),
  },
  hamburgerButton: {
    padding: wp(2),
  },
});

export default Header;

// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
// import {DrawerActions, useNavigation} from '@react-navigation/native';
// import {
//   responsiveHeight as hp,
//   responsiveWidth as wp,
// } from 'react-native-responsive-dimensions';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import colors from './styles/colors';

// const Header = ({
//   userName,
//   profilePic,
//   isBoothAdmin,
//   boothNumber,
//   boothName,
//   wardName,
//   wardNumber,
//   isSuperAdmin,
// }) => {
//   const navigation = useNavigation();

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem('Authtoken');
//     await AsyncStorage.removeItem('userName');
//     await AsyncStorage.removeItem('userId');
//     await AsyncStorage.removeItem('userRole');
//     await AsyncStorage.removeItem('showVotingPermission');
//     await AsyncStorage.removeItem('editPermission');
//     navigation.replace('LoginScreen');
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.leftContainer}>
//           {/* Show profile pic and username if either Super Admin or Booth Admin */}
//           {isSuperAdmin || isBoothAdmin ? (
//             <>
//               {profilePic ? (
//                 <Image source={{uri: profilePic}} style={styles.profilePic} />
//               ) : (
//                 <View style={styles.profilePicFallback}>
//                   <Text style={styles.profilePicText}>{userName[0]}</Text>
//                 </View>
//               )}
//               <View>
//                 <Text
//                   style={{
//                     color: '#fff',
//                     fontSize: 12,
//                     fontFamily: 'Roboto-Regular',
//                   }}>
//                   Welcome
//                 </Text>
//                 <Text style={styles.userName}>{userName}</Text>
//               </View>
//             </>
//           ) : (
//             // Show hamburger button when not Super Admin or Booth Admin
//             <TouchableOpacity
//               // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//               onPress={() => navigation.openDrawer()}
//               style={styles.hamburgerButton}>
//               <Icon name="menu" size={30} color={colors.white} />
//             </TouchableOpacity>
//           )}
//         </View>
//         <View style={styles.RightContainer}>
//           {/* Show logout button for Super Admin or Booth Admin */}

//           <>
//             <TouchableOpacity
//               onPress={handleLogout}
//               style={styles.logoutButton}>
//               <Icon name="logout" size={30} color={colors.white} />
//             </TouchableOpacity>
//           </>
//         </View>
//       </View>
//       <View style={{backgroundColor: colors.primary, paddingBottom: 5}}>
//         {boothNumber && (
//           <Text style={styles.wardNameStyle}>
//             {' '}
//             {boothName ? boothName : ''} - Booth No : {boothNumber}
//           </Text>
//         )}

//         {wardNumber && (
//           <Text style={styles.wardNameStyle}>
//             Ward :{' '}
//             {wardName && wardName.length > 20
//               ? wardName.substring(0, 20) + '...'
//               : wardName}{' '}
//             , No : {wardNumber}
//           </Text>
//         )}
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: colors.primary,
//     height: hp(6),
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: wp(2),
//   },
//   leftContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   profilePicFallback: {
//     width: hp(5),
//     height: hp(5),
//     borderRadius: hp(2.5),
//     marginRight: wp(3),
//     backgroundColor: colors.background,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profilePicText: {
//     fontSize: wp(5),
//     color: colors.primary,
//     textTransform: 'capitalize',
//   },
//   RightContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profilePicIcon: {
//     marginRight: wp(2),
//     marginTop: 5,
//     width: hp(5.5),
//     height: hp(5.5),
//   },
//   profilePic: {
//     width: hp(5),
//     height: hp(5),
//     borderRadius: hp(2.5),
//     marginRight: wp(3),
//   },
//   userName: {
//     color: '#fff',
//     fontFamily: 'Roboto-Regular',
//     fontSize: wp(3.5),
//     textTransform: 'capitalize',
//   },
//   wardNameStyle: {
//     fontSize: wp(3.8),
//     // fontWeight: 'bold',
//     fontFamily: 'Roboto-Regular',
//     color: colors.white,
//     alignSelf: 'center',
//   },
//   notificatioicon: {
//     marginRight: 5,
//   },
//   logoutButton: {
//     padding: wp(2),
//   },
//   hamburgerButton: {
//     padding: wp(2),
//   },
// });

// export default Header;
