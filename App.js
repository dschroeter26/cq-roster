import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Form from './components/Form';
import StudentList from './components/StudentList';

const App = () => {
  const [students, setStudents] = useState([]);

  const handleAddStudent = (student) => {
    setStudents(() => {[...students, student]}, []);
  };

  const handleSignInStudent = (signInStudentId) => {
    setStudents(students.map(student => {
      if (student.id === signInStudentId) {
        return {...student, signInDate: new Date()}
      } else {
        return student;
      }
    }));
  };

  return (
    <View style={styles.container}>
      <Form onAddStudent={handleAddStudent} />
      <Text>Signed Out</Text>
      <StudentList 
        students={students}
        // students={students.filter((student) => student.signInDate === null)} 
        // onSignInStudent={handleSignInStudent}
      />
      {/* <Text>Signed In</Text> */}
      {/* <StudentList 
        students={students.filter((student) => student.signInDate !== null)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});

export default App;
