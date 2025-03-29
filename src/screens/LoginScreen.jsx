import React, {useState, useCallback} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import InputBox from '../components/InputBox';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions';
import {useFocusEffect} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import {loginuser} from '../redux/providerSlice';
import ContectToAdminModal from '../components/ContectToAdminModal';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const {email, password} = formdata;
    const trimmedEmail = email.trim(); // Trim leading/trailing spaces

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if email and password are provided
    if (!trimmedEmail || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    // Validate email format using regex
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      // Dispatch the login action and wait for it to complete
      const actionResult = await dispatch(
        loginuser({email: trimmedEmail, password}),
      );

      if (actionResult.type === 'login/fulfilled') {
        // Success - access the returned data
        const data = actionResult.payload;
        console.log('Login successful:', data);
        setFormdata('');
        navigation.navigate('SplashScreen');
        // You can proceed with data, e.g., navigate, store data, etc.
      } else {
        // Error - handle rejection
        console.error('Login failed:', actionResult.error.message);
        Alert.alert('Error', actionResult.error.message);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.appNameContainer}>
          <Text style={styles.appName}>WELCOME!</Text>
          <View style={styles.underline} />
        </View>
        <Text style={styles.title}>Login to your account</Text>
        <InputBox
          label="Email"
          placeholder="Enter your email"
          value={formdata.email}
          setValue={email => setFormdata({...formdata, email})}
          iconname="email"
        />
        <InputBox
          label="Password"
          placeholder="Enter your password"
          value={formdata.password}
          setValue={password => setFormdata({...formdata, password})}
          secureTextEntry
          iconname="lock"
        />
        <Text style={styles.footerText}>
          Don't Have an Account?
          <Text
            style={styles.registerLink}
            // onPress={() => navigation.navigate('BoothAdminRegister')}
            onPress={() => setModalVisible(true)}>
            Click here to Register
          </Text>
        </Text>

        <TouchableOpacity
          style={[
            styles.loginButton,
            {backgroundColor: isLoading ? '#f2f2f2' : '#223265'},
          ]}
          // onPress={handleLogin}
          onPress={() => navigation.navigate('Home')}
          disabled={isLoading}>
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Logging in...' : 'LOGIN'}
          </Text>
        </TouchableOpacity>
      </View>

      <ContectToAdminModal
        open={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: wp(6),
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
    justifyContent: 'center',
  },
  title: {
    fontSize: wp(4.5),
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  appNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: wp(3),
  },
  appName: {
    fontSize: wp(9.5),
    color: '#223265',
    fontFamily: 'Roboto-Italic',
  },
  underline: {
    bottom: hp(0.5),
    width: wp(37),
    height: hp(0.3),
    backgroundColor: '#223265',
  },
  loginButton: {
    backgroundColor: '#223265',
    width: wp(70),
    alignSelf: 'center',
    paddingVertical: hp(1.5),
    borderRadius: 30,
    alignItems: 'center',
    marginTop: hp(5),
    marginBottom: hp(5),
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: wp(5.5),
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: wp(3.5),
    color: '#777',
  },
  registerLink: {
    fontFamily: 'Roboto-Regular',
    color: '#27aae1',
  },
});

export default LoginScreen;
