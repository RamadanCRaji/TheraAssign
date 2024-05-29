const API_URL = "https://your-backend-api.com/";

// Utility function to fetch wheelchair data from backend
// 'type' can be 'available' or 'unavailable'
export const fetchWheelChairs = async (type) => {
  try {
    const response = await fetch(`${API_URL}/wheelchairs/${type}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("There was a problem with fetch operation:", error);
    throw error; // rethrow the error for caller to handle
  }
};

// Fetch available wheelchairs
export const fetchAvailableWheelChairs = (interest) =>
  fetchWheelChairs(interest);

// Fetch unavailable wheelchairs
export const fetchUnAvailableWheelChairs = (interest) =>
  fetchWheelChairs(interest);

// Fetch All chairs regardless of their status
export const fetchAllChairs = (interest) => fetchWheelChairs(interest);
