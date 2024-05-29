"use client";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
Chart.register(ArcElement, Tooltip, Legend);
function RoomChartComponent({ stats }) {
  const [chartData, setChartData] = useState({
    labels: ["Occupied W.C", "Free W.C"],
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
  // useEffect(() => {
  //   const updateChartData = (stats) =>
  //     setChartData((prevData) => {
  //       const updatedData = { ...prevData };
  //       updatedData.datasets = [...prevData.datasets];
  //       updatedData.datasets[0] = {
  //         ...updatedData.datasets[0],
  //         data: [
  //           stats.profileStats["totalClients"],
  //           stats.profileStats["totalOutreach"],
  //         ],
  //       };
  //       return updatedData;
  //     });

  //   updateChartData(stats);
  // }, [stats]);
  return (
    <div className=" relative  h-full w-full p-4">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

export default RoomChartComponent;

// old way
{
  /* <div className=" relative  h-full w-full items-center justify-center  p-4">
      <Pie data={chartData} options={chartOptions} />
    </div> */
}
