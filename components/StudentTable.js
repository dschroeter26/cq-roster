import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, View, Text, StyleSheet } from 'react-native';
import { DataTable, Provider as PaperProvider } from 'react-native-paper';
import { StudentListContext } from '../App';

const StudentTable = () => {
  const { studentList, setStudentList } = useContext(StudentListContext);
  const [signInStudent, setSignInStudent] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  useEffect(() => {
    setPageNumber(0);
  }, [itemsPerPage]);

  useEffect(() => {
    if(signInStudent) {
      showConfirmationDialogue();
    }
  }, [signInStudent]);

  const from = pageNumber * itemsPerPage;
  const to = Math.min((pageNumber + 1) * itemsPerPage, studentList.length);

  const handleSignInStudent = () => {
    const updatedStudents = studentList?.map(student => {
      if (student.id === signInStudent.id) {
        return {...student, signInDate: new Date()}
      } else {
        return student;
      }
    });
    setStudentList(updatedStudents);
    setSignInStudent(null);
  };

  // const handleSignInStudent = (signInStudentId) => {
  //   const updatedStudents = studentList?.map(student => {
  //     if (student.id === signInStudentId) {
  //       return {...student, signInDate: new Date()}
  //     } else {
  //       return student;
  //     }
  //   });
  //   setStudentList(updatedStudents);
  // };

  const showConfirmationDialogue = () => {
    // console.log(`IN ALERT FOR ${student.name}`);
    return alert(
      "Are your sure?",
      `Sign in ${signInStudent.name}?`,
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => handleSignInStudent(),
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <PaperProvider>
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

      {studentList?.slice(from, to).map((student) => (
      <DataTable.Row key={student.id}>
        <DataTable.Cell>
          {student.name}
        </DataTable.Cell>
        <DataTable.Cell>
          {
            student.signOutDate !== null && student.signOutDate.toLocaleDateString() + " " 
            + student.signOutDate.toLocaleTimeString()
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
          ? <Button title="Sign In" onPress={() => setSignInStudent({...student})} /> 
          : <DataTable.Cell>{student.signInDate.toLocaleDateString() + " " 
            + student.signInDate.toLocaleTimeString()}</DataTable.Cell>
        }
      </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={pageNumber}
        numberOfPages={Math.ceil(studentList.length / itemsPerPage)}
        onPageChange={(page) => setPageNumber(page)}
        label={`${from + 1}-${to} of ${studentList.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  student: {
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 5
  }
});

export default StudentTable;
