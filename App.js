import React, { createContext, useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SignOutForm from './components/SignOutForm';
import StudentTable from './components/StudentTable';

export const StudentListContext = createContext(null);

const App = () => {
  const [studentList, setStudentList] = useState([]);

  return (
    <StudentListContext.Provider value={{studentList, setStudentList}}>
      <View style={styles.container}>
        <SignOutForm />
        <Text>Students</Text>
        <StudentTable />
      </View>
    </StudentListContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});

export default App;
