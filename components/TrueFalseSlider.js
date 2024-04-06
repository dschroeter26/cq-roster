import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const TrueFalseSlider = ({ isOn, setIsOn }) => {

  const toggleSwitch = () => {
    setIsOn(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text>{isOn ? 'On Base' : 'Off Base'}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isOn ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isOn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TrueFalseSlider;
