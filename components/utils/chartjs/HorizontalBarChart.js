import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const HorizontalBarChart = ({ data }) => {
  const chartData = {
    labels: [
      "Distributor",
      "Dealers",
      "Users",
      "Products",
      "Delivered orders",
      "Ongoing orders",
      "Cancelled orders",
    ],
    datasets: [
      {
        label: "Bar chart",
        labelDisabled: true,
        data: [
          data.categoriesCount,
          data.subCategoriesCount,
          data.usersCount,
          data.productsCount,
          data.deliveredOrdersCount,
          data.ongoingOrdersCount,
          data.canceledOrdersCount,
        ],
        backgroundColor: [
          "#FFC700",
          "#fb923c",
          "#816797",
          "#D2649A",
          "#3AA6B9",
          "#7EA1FF",
          "#F31559",
        ],
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines on x-axis
        },
      },
      y: {
        grid: {
          display: false, // Remove grid lines on y-axis
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Bar Chart",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default HorizontalBarChart;
