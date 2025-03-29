import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ConfettiCannon from 'react-native-confetti-cannon';

const Home = () => {
  const [searchText, setSearchText] = useState('');

  // Handle the text input change
  const handleSearchTextChange = text => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      {/* <ConfettiCannon count={400} origin={{x: -10, y: 0}} fadeOut={true} /> */}
      <View style={styles.Searchcontainer}>
        {/* Hamburger Icon (Menu) */}
        <TouchableOpacity style={styles.icon}>
          <Icon name="segment" size={20} color="#000" />
        </TouchableOpacity>

        {/* Search Input */}
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearchTextChange}
        />

        {/* Search Icon */}
        <TouchableOpacity style={styles.icon}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  Searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    borderRadius: 30,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    // backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 10,
    color: 'black',
  },
});
