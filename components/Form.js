import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import TrueFalseSlider from './TrueFalseSlider';
import uuid from 'react-native-uuid';
import propTypes from 'prop-types';

const Form = ({ onAddStudent }) => {
  const [name, setName] = useState('');
  const [phase, setPhase] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [onBase, setOnBase] = useState(true); // Default to true
  const [destination, setDestination] = useState('');
  
  const handleAddStudent = () => {
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
    onAddStudent(student);
    // Clear form fields after adding student
    setName('');
    setPhase('');
    setRoomNumber('');
    setDestination('');
  };

  return (
    <View style={styles.rowContainer}>
      <TextInput
        style={styles.cell}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.cell}
        placeholder="Phase"
        value={phase}
        onChangeText={text => setPhase(text)}
      />
      <TextInput
        style={styles.cell}
        placeholder="Room Number"
        value={roomNumber}
        onChangeText={text => setRoomNumber(text)}
      />

      <TrueFalseSlider
        isOn={onBase}
        setIsOn={setOnBase}
      />
      <TextInput
        style={styles.cell}
        placeholder="Destination"
        value={destination}
        onChangeText={text => setDestination(text)}
      />
      <Button title="Submit" onPress={handleAddStudent} />
    </View>
  );
};

Form.propTypes = {
  onAddStudent: propTypes.func
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
});

export default Form;
