const API_BASE_URL = "https://your-backend-api.com/";

export async function returnHospitalChair(details) {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
      credentials: "include",
    });

    // Check if the response status is not OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and return the response data as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("An error occurred:", error);

    // Rethrow the error to be handled by the calling context
    throw error;
  }
}
