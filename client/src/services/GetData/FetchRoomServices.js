const API_URL = "https://your-backend-api.com/";

// Utility function to fetch room data from backend
export async function fetchRoomData(floor) {
  try {
    const response = await fetch(`${API_URL}/roomdata/${floor}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // return [data[0], data[1]];
    return data;
  } catch (error) {
    console.error("There was a problem with fetch operation:", error);
    throw error; // rethrow the error for caller to handle
  }
}

//fetch information about rooms on the first floor
export const fetchFirstFloorData = () => fetchRoomData("firstFloor");

// fetch information about the rooms  on the first floor
export const fetchSecondFloorData = () => fetchRoomData("secondFloor");
