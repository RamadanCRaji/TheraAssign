export async function fetchAllHospitalDetails() {
  try {
    //fetch returns a a response object that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`/api/dashboardInfo`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.details);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @desc fetch all chair data
 * @route GET /api/wheelchair/all
 * @returns object {STANDARD,TiltInSpace,BARIATRIC}
 */
export const fetchAllChairData = async () => {
  try {
    //fetch returns a a response object that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`/api/wheelchair/available`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.details);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchAvailableRooms = async () => {
  try {
    //fetch returns a a response object that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`/api/rooms/available`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.details);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const admitPatient = async (outgoingData) => {
  try {
    //fetch returns a a response object that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`/api/patient/admit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(outgoingData),
    });
    if (!response.ok) {
      throw new Error(response.details);
    }
    const data = await response.text();

    return data;
  } catch (error) {
    throw error;
  }
};
export const fetchAllRoomData = async () => {
  try {
    //fetch returns a a response object that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`/api/rooms/all`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(response.details);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
export const fetchAllPatients = async () => {
  try {
    //fetch returns a a response object that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`/api/patient/all`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorMsg = await response.json();
      throw new Error(errorMsg.details);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const assignPersonalChair = async (outgoingData) => {
  try {
    //fetch returns a a response object that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`/api/wheelchair/updatePersonal`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(outgoingData),
    });
    if (!response.ok) {
      const errorMsg = await response.json();
      throw new Error(errorMsg.details);
    }
    const data = await response.text();

    return data;
  } catch (error) {
    throw error;
  }
};
export const swapPatientRooms = async (outgoingData) => {
  try {
    //fetch returns a a response object that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`/api/patient/swapPatientRooms`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(outgoingData),
    });
    if (!response.ok) {
      const errorMsg = await response.json();
      throw new Error(errorMsg.details);
    }
    const data = await response.text();

    return data;
  } catch (error) {
    throw error;
  }
};
export const changePatientRoom = async (outgoingData) => {
  try {
    //fetch returns a a response object that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`/api/rooms/changePatientRoom`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(outgoingData),
    });
    if (!response.ok) {
      const errorMsg = await response.json();
      throw new Error(errorMsg.details);
    }
    const data = await response.text();

    return data;
  } catch (error) {
    throw error;
  }
};
export const returnPatientWheelchairToCloset = async (outgoingData) => {
  try {
    //fetch returns a a response object that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`/api/wheelchair/return`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(outgoingData),
    });
    if (!response.ok) {
      const errorMsg = await response.json();
      throw new Error(errorMsg.details);
    }
    const data = await response.text();

    return data;
  } catch (error) {
    throw error;
  }
};
export const dischargePatient = async (outgoingData) => {
  try {
    //fetch returns a a response object that object that has properties like ok, status, statusText, etc.
    const response = await fetch(`/api/patient/discharge`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(outgoingData),
    });
    if (!response.ok) {
      const errorMsg = await response.json();
      throw new Error(errorMsg.details);
    }
    const data = await response.text();

    return data;
  } catch (error) {
    throw error;
  }
};
