import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const StudentList = ({ studentList, onSignInStudent }) => {

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Time Out</DataTable.Title>
        <DataTable.Title>Phase</DataTable.Title>
        <DataTable.Title>Room Number</DataTable.Title>
        <DataTable.Title>On Base/Off Base</DataTable.Title>
        <DataTable.Title>Destination</DataTable.Title>
        <DataTable.Title>Time In</DataTable.Title>
      </DataTable.Header>

      {studentList?.map((student, index) => (
      <DataTable.Row key={student.id}>
        <DataTable.Cell>
          {student.name}
        </DataTable.Cell>
        <DataTable.Cell>
          {
            student.signOutDate !== null && student.signOutDate.toISOString()
          }
        </DataTable.Cell>
        <DataTable.Cell>
          {student.phase}
        </DataTable.Cell>
        <DataTable.Cell>
          {student.roomNumber}
        </DataTable.Cell>
        <DataTable.Cell boolean>
          {student.onBase ? 'On Base' : 'Off Base'}
        </DataTable.Cell>
        <DataTable.Cell>
          {student.destination}
        </DataTable.Cell>
        {
          student?.signInDate === null 
          ? <Button title="Sign In" onPress={onSignInStudent(student.id)} /> 
          : <Text>{student.signInDate.toISOString()}</Text>
        }
      </DataTable.Row>
      ))}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  student: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 5
  }
});

export default StudentList;
