"use client";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
Chart.register(ArcElement, Tooltip, Legend);
import { fetchAllHospitalDetails } from "@/src/services/apiService";

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

function WheelChairChartComponent() {
  const [chartData, setChartData] = useState({
    labels: ["Occupied :", "Empty "],
    datasets: [
      {
        data: [1, 1],
        backgroundColor: ["#C0D6DF", "#6AA84F"],
        borderColor: ["#E8DAB2", "#C0D6DF"],
        borderWidth: 1,
      },
    ],
  });

  // useEffect hook to update chart data when 'stats' change.
  useEffect(() => {
    // Function to update chart data with new stats.
    const getPatientDetails = async () => {
      const response = await fetchAllHospitalDetails();
      const stats = response.chairs;
      setChartData((prevData) => {
        const availableChairs = stats.filter(
          (chair) => chair.Status.Available,
        ).length;

        const UnavailableChairs = stats.filter(
          (chair) => !chair.Status.Available,
        ).length;
        const updatedData = { ...prevData }; // Copy previous chart data.

        updatedData.datasets = [...prevData.datasets];

        updatedData.datasets[0] = {
          ...updatedData.datasets[0],
          data: [UnavailableChairs || 0, availableChairs || 0],
        };
        return updatedData;
      });
    };
    getPatientDetails();
  }, []);

  return (
    <div className=" relative flex h-full w-full  p-4">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

export default WheelChairChartComponent;
