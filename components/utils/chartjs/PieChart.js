import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ data }) => {
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
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        //   display: false
      },
      title: {
        display: false,
        text: "Pie Chart Example",
      },
    },
  };
  return <Pie data={chartData} options={options} />;
};

export default PieChart;
