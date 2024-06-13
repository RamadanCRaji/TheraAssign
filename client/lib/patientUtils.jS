// export const findPatientData = (data, fullName) => {
//   return data.find((e) => e.fullName === fullName);
// };

// export const mapPatientField = (patientData, prefix) => {
//   const { fullName, roomId, currentChair } = patientData;
//   const [firstName, lastName] = fullName.split(" ");

//   // Return an object with the new field map object for each respective patient
//   return {
//     [`${prefix}_firstName`]: firstName,
//     [`${prefix}_lastName`]: lastName,
//     [`${prefix}_roomId`]: roomId,
//     [`${prefix}_currentChair`]: currentChair,
//   };
// };

// export const swapPatientData = (data, allPatientData) => {
//   const { patient1, patient2 } = data;

//   // Calling code to find patientData for the new patient1
//   const updatedPatient1Data = findPatientData(allPatientData, patient2);
//   const updatedPatient2Data = findPatientData(allPatientData, patient1);
//   // Calling code for creating a field map for the new swapped updated patients
//   const fieldMapForNewPatient1 = mapPatientField(
//     updatedPatient1Data,
//     "patient1",
//   );
//   const fieldMapForNewPatient2 = mapPatientField(
//     updatedPatient2Data,
//     "patient2",
//   );

//   return {
//     ...fieldMapForNewPatient1,
//     ...fieldMapForNewPatient2,
//   };
// };
