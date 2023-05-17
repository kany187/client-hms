import { useState } from "react";
import Chart from "react-apexcharts";

export const PatientStats = () => {
  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
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
        name: "average",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });
  return (
    <div className="chart">
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        width="450"
        height="400px"
      />
    </div>
  );
};
