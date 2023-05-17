import { Box } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import useDepartment from "../../../hooks/department/useDepartment";

export const StatisticsChart = () => {
  const { data: department } = useDepartment();

  const label = Array.from(new Set(department?.map((item) => item.deptName)));

  return (
    <Box pt="5">
      <Chart
        options={{
          colors: ["#14f1d9", "#7b43f6", "#221D00"],
          dataLabels: {
            enabled: true,
          },
          labels: label,
          legend: {
            show: false,
          },
        }}
        series={[9, 4, 8, 9]}
        type="donut"
        width="100%"
        height="350px"
      />
    </Box>
  );
};
