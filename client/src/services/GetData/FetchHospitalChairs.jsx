const API_BASE_URL = "https://your-backend-api.com/";

// Utility function to fetch data for a specific chair type from the backend
export const fetchChairDataByType = async (chairOfInterst) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${chairOfInterst}/`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetches all available chairs from the backend
export const fetchAvailableChairs = () =>
  fetchChairDataByType("available_chairs");

export const fetchAllChairs = () => fetchChairDataByType("available_chairs");
