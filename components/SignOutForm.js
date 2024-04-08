import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import TrueFalseSlider from './TrueFalseSlider';
import uuid from 'react-native-uuid';
import { StudentListContext } from '../App';

const SignOutForm = ( ) => {
  const {studentList, setStudentList} = useContext(StudentListContext);

  const [name, setName] = useState('');
  const [phase, setPhase] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [onBase, setOnBase] = useState(true); // Default to true
  const [destination, setDestination] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = "Name is required.";
    }

    if (!phase) {
      errors.phase = "Phase is required.";
    } else if (isNaN(phase)) {
      errors.phase = "Phase can only be a number";
    }

    if (!roomNumber) {
      errors.roomNumber = "Room Number is required.";
    } else if (isNaN(roomNumber)) {
      errors.roomNumber = "Room Number can only be a number";
    }

    if (!destination) {
      errors.destination = "Destination is required."
    }

    setValidationErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };
  
  const handleSignOutStudent = () => {
    const student = {
      id: uuid.v1(),
      name,
      phase,
      roomNumber,
      onBase,
      destination,
      signOutDate: new Date(),
      signInDate: null
    };
    setStudentList([...studentList, student]);
    // Clear form fields after adding student
    setName('');
    setPhase('');
    setRoomNumber('');
    setDestination('');
    setValidationErrors({});
    setIsFormValid(false);
  };

  return (
    <View style={styles.rowContainer}>
      <TextInput
        style={validationErrors.name ? styles.errorCell : styles.cell}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
        onChange={() => validateForm()}
        onBlur={() => validateForm()}
      />
      <TextInput
        style={validationErrors.phase ? styles.errorCell : styles.cell}
        placeholder="Phase"
        value={phase}
        onChangeText={text => setPhase(text)}
        onChange={() => validateForm()}
        onBlur={() => validateForm()}
      />
      <TextInput
        style={validationErrors.roomNumber ? styles.errorCell : styles.cell}
        placeholder="Room Number"
        value={roomNumber}
        onChangeText={text => setRoomNumber(text)}
        onChange={() => validateForm()}
        onBlur={() => validateForm()}
      />
      <TrueFalseSlider
        isOn={onBase}
        setIsOn={setOnBase}
      />
      <TextInput
        style={validationErrors.destination ? styles.errorCell : styles.cell}
        placeholder="Destination"
        value={destination}
        onChangeText={text => setDestination(text)}
        onChange={() => validateForm()}
        onBlur={() => validateForm()}
      />
      <Button
      title="Submit"
      onPress={handleSignOutStudent}
      disabled={isFormValid !== true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 5,
  },
  errorCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 5,
  }
});

export default SignOutForm;