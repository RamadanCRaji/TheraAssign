const API_URL = "/api/patient-details";

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
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with fetch operation:", error.message);
    throw error; // rethrow the error for caller to handle
  }
}

// use server is used insdie of a server function not a server component
