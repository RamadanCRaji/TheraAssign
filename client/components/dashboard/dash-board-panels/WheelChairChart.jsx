"use client";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
Chart.register(ArcElement, Tooltip, Legend);
function WheelChairChartComponent({ stats }) {
  const [chartData, setChartData] = useState({
    labels: ["Occupied Room:", "Free Rooms"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#C0D6DF", "#6AA84F"],
        borderColor: ["#E8DAB2", "#C0D6DF"],
        borderWidth: 1,
      },
    ],
  });
  const [chartOptions] = useState({
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      labels: {
        font: {
          size: "25px",
        },
        color: "primary",
      },
    },
  });
  // useEffect hook to update chart data when 'stats' change.
  // useEffect(() => {
  //   // Function to update chart data with new stats.
  //   const updateChartData = (stats) => {
  //     setChartData((prevData) => {
  //       // Shallow copy prevData for immutability.
  //       const updatedData = { ...prevData }; // Copy previous chart data.

  //       // Copy datasets array to prevent direct state mutation.
  //       updatedData.datasets = [...prevData.datasets];

  //       // Update the first dataset with new stats.
  //       // Ensure to spread properties of the existing dataset to maintain other config values.
  //       updatedData.datasets[0] = {
  //         ...updatedData.datasets[0],
  //         data: [stats.availableChairs || 0, stats.UnavailableChairs || 0],
  //       };

  //       // Return the modified chart data to trigger a re-render.
  //       return updatedData;
  //     });
  //   };

  //   // Invoke update function with new stats.
  //   updateChartData(stats);
  // }, [stats]); // Dependency array to control effect invocation.

  return (
    <div className=" relative flex h-full w-full  p-4">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

export default WheelChairChartComponent;

//old way
{
  /* <div className=" relative flex h-full w-full items-center justify-center  p-4">
      <Pie data={chartData} options={chartOptions} />
    </div> */
}
