import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
/************************************** */
// Patient Utils
/************************************** */

export const findPatientData = (data, new_patient_id, old_patient_id) => {
  let patient = data.find((patient) => patient._id === new_patient_id);
  let oldRoom = data.find((patient) => patient._id === old_patient_id);

  const newPatient = JSON.parse(JSON.stringify(patient));

  newPatient.roomId["Room Number"] = oldRoom.roomId["Room Number"];
  return newPatient;
};

export const mapPatientField = (patientData, prefix) => {
  const { firstName, lastName, roomId, chairId } = patientData;

  // Return an object with the new field map object for each respective patient
  return {
    [`${prefix}_firstName`]: firstName,
    [`${prefix}_lastName`]: lastName,
    [`${prefix}_roomId`]: roomId["Room Number"],
    [`${prefix}_currentChair`]: chairId?.TagId || "none",
  };
};

export const swapPatientData = (data, allPatientData) => {
  const { patient1, patient2 } = data;

  // Calling code to find patientData for the new patient1
  const updatedPatient1Data = findPatientData(
    allPatientData,
    patient2,
    patient1,
  );
  const updatedPatient2Data = findPatientData(
    allPatientData,
    patient1,
    patient2,
  );
  // Calling code for creating a field map for the new swapped updated patients
  const fieldMapForNewPatient1 = mapPatientField(
    updatedPatient1Data,
    "patient1",
  );
  const fieldMapForNewPatient2 = mapPatientField(
    updatedPatient2Data,
    "patient2",
  );

  return {
    ...fieldMapForNewPatient1,
    ...fieldMapForNewPatient2,
  };
};
