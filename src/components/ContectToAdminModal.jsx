import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Modal from 'react-native-modal-fix';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
} from 'react-native-responsive-dimensions'; // Utility for responsive width and height

const ContectToAdminModal = ({open, onClose}) => {
  const toggleModal = () => {
    onClose();
  };

  return (
    <View>
      {/* Modal */}
      <Modal
        isVisible={open}
        onBackdropPress={toggleModal} // Close modal on backdrop press
        onBackButtonPress={toggleModal} // Close modal on back button press
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Contact With Your Admin</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: hp(2), // Responsive padding
    width: wp(80), // Responsive width
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20, // Increased font size for better visibility
    fontWeight: 'bold',
    marginBottom: hp(2), // Responsive margin
    textAlign: 'center', // Centered text
    color: '#333', // Dark text color for contrast
  },
});

export default ContectToAdminModal;
