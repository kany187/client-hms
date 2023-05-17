import Chart from "react-apexcharts";
import "./StaffChart.css";
import useDepartment from "../../../../hooks/department/useDepartment";
import useDoctors from "../../../../hooks/doctors/useDoctors";
import useStaff from "../../../../hooks/staffs/useStaff";

interface Props {
  title: string;
}

export const StaffChart = ({ title }: Props) => {
  const { data: department, isLoading } = useDepartment();
  const { data: doctor } = useStaff();

  const label = Array.from(new Set(department?.map((item) => item.deptName)));

  const data = doctor
    ?.filter((item) => label.includes(item.deptName) && item.role === title)
    .map((item) => item.deptName);

  const count: { [key: string]: number } = {};
  if (data) data.forEach((value) => (count[value] = (count[value] || 0) + 1));

  //const uniqueValues = [...new Set(data)];
  const keys = Object.keys(count);
  //const counts = uniqueValues.map((value: string) => count[value]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="chart-two">
      <Chart
        series={[
          {
            name: "Total",
            data: [2, 6, 7],
          },
        ]}
        options={{
          colors: ["#14f1d9", "#7b43f6", "#221D00"],
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          stroke: { width: 1, curve: "smooth" },
          chart: {
            id: "expenses",
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories: keys,
            labels: {
              style: {
                colors: ["#14f1d9", "#7b43f6", "#221D00"],
              },
            },
          },
        }}
        type="bar"
        height={350}
      />
    </div>
  );
};
