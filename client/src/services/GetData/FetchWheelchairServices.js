const API_URL = "/api/patient-details";
// Utility function to fetch wheelchair data from backend
// 'type' can be 'available' or 'unavailable'
// export const fetchWheelChairs = async (type) => {
//   try {
//     const response = await fetch(`${API_URL}/wheelchairs/${type}`, {
//       method: "GET",
//       credentials: "include",
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("There was a problem with fetch operation:", error);
//     throw error; // rethrow the error for caller to handle
//   }
// };

// // Fetch available wheelchairs
// export const fetchAvailableWheelChairs = (interest) =>
//   fetchWheelChairs(interest);

// // Fetch unavailable wheelchairs
// export const fetchUnAvailableWheelChairs = (interest) =>
//   fetchWheelChairs(interest);

// // Fetch All chairs regardless of their status
// export const fetchAllChairs = (interest) => fetchWheelChairs(interest);

export async function fetchAllDetails() {
  try {
    //fetch returns a a response objecd that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.details);
    }
    const data = await response.json(); // Calling response.json() on the Response object parses the body of the response as JSON and returns a promise that resolves to a JavaScript object
    console.log(data.BackendResponse);
    // {BackendResponse:data}
    return data;
  } catch (error) {
    console.error("There was a problem with fetch operation:", error.message);
    throw error; // rethrow the error for caller to handle
  }
}

// use server is used insdie of a server function not a server component
