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
    const getPatientDetails = async () => {
      const response = await fetchAllHospitalDetails();
      const stats = response.rooms;

      setChartData((prevData) => {
        const availableRooms = stats.filter(
          (room) => !room["PatientId"],
        ).length; //occupied is false but !occupied turns to true
        const UnavailableRooms = stats.filter(
          (room) => room["PatientId"],
        ).length; //occupied is false but leave it ensure it does not reutn anything
        const updatedData = { ...prevData };
        updatedData.datasets = [...prevData.datasets];
        updatedData.datasets[0] = {
          ...updatedData.datasets[0],
          data: [UnavailableRooms || 0, availableRooms || 0],
        };
        return updatedData;
      });
    };
    getPatientDetails();
  }, []);
  return (
    <div className=" relative  h-full w-full p-4">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

export default RoomChartComponent;
// useEffect(() => {
// setRoomOccupancyData((prev) => {
//   return { ...data };
// });
//   getPatientDetails();
// }, []);
