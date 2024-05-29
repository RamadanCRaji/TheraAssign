const API_URL = "https://your-backend-api.com/";

// Utility function to fetch room data from backend
export async function fetchPatientInfo(queryofInterest) {
  try {
    const response = await fetch(`${API_URL}/Patients/${queryofInterest}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with fetch operation:", error);
    throw error; // rethrow the error for caller to handle
  }
}

//fetch information about rooms on the first floor
// export const fetchPatientInfo = (arg) => fetchPatientInfo(arg);

// data i will recieve will contain {firstName,LastName, ChairId,roomId,PersonalChair (true of false)}
//note that in the backend i will have to use the virtual method on the fly to generate a fullname of patient
// data sent back will have to contain all in the information as an array of object, then i will filter the

// import React from "react";
// import { Form } from "@shadcn/forms";
// import { useForm, zodResolver } from "@shadcn/forms-hooks";

// export const FormOne = () => {
//   const formMethods = useForm({
//     resolver: zodResolver(formOneSchema),
//   });

//   const onSubmit = (data) => {
//     console.log("Form One Data:", data);
//   };

//   return (
//     <Form formMethods={formMethods} onSubmit={onSubmit}>
//       <input
//         type="text"
//         {...formMethods.register("firstName")}
//         placeholder="First Name"
//       />
//       <input
//         type="text"
//         {...formMethods.register("lastName")}
//         placeholder="Last Name"
//       />
//       <button type="submit">Submit Form One</button>
//     </Form>
//   );
// };

// export const FormTwo = () => {
//   const formMethods = useForm({
//     resolver: zodResolver(formTwoSchema),
//   });

//   const onSubmit = (data) => {
//     console.log("Form Two Data:", data);
//   };

//   return (
//     <Form formMethods={formMethods} onSubmit={onSubmit}>
//       <input
//         type="email"
//         {...formMethods.register("email")}
//         placeholder="Email"
//       />
//       <input type="number" {...formMethods.register("age")} placeholder="Age" />
//       <button type="submit">Submit Form Two</button>
//     </Form>
//   );
// };
