"use client";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { fetchAllHospitalDetails } from "@/src/services/apiService";

Chart.register(ArcElement, Tooltip, Legend);

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    labels: {
      font: {
        size: 25,
      },
      color: "#000",
    },
  },
};

function RoomChartComponent() {
  const [chartData, setChartData] = useState({
    labels: ["Occupied ", "Empty"],
    datasets: [
      {
        data: [1, 1],
        backgroundColor: ["#C0D6DF", "#6AA84F"],
        borderColor: ["#E8DAB2", "#C0D6DF"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const getAllHospitalDetails = async () => {
      try {
        const response = await fetchAllHospitalDetails();
        const stats = response?.rooms || []; // Safeguard in case rooms is undefined

        setChartData((prevData) => {
          const availableRooms =
            stats?.filter((room) => !room?.PatientId).length || 0; // Ensuring it returns 0 if nothing is found

          const unavailableRooms =
            stats?.filter((room) => room?.PatientId).length || 0;

          const updatedData = {
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: [unavailableRooms, availableRooms],
              },
            ],
          };

          return updatedData;
        });
      } catch (error) {
        console.error("Error fetching  details:", error.message);
      }
    };

    getAllHospitalDetails();
  }, []);

  return (
    <div className=" relative  h-full w-full p-4">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

export default RoomChartComponent;
