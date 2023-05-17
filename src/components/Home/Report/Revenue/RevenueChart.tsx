import { useState } from "react";
import Chart from "react-apexcharts";

export const RevenueChart = () => {
  const [data, setData] = useState({
    options: {
      colors: ["#14f1d9", "#7b43f6"],
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      chart: {
        id: "expenses",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "income",
        data: [3000, 40, 4500, 500, 490, 600, 70, 91],
      },
      {
        name: "expenses",
        data: [3, 40, 45, 50, 49, 2000, 7000, 9100],
      },
    ],
  });
  return (
    <div className="chart">
      <Chart
        options={data.options}
        series={data.series}
        type="area"
        width="100%"
        height="400px"
      />
    </div>
  );
};
