import { Box, Text, VStack, HStack, Badge, useColorModeValue } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import useDepartment from "../../../../hooks/department/useDepartment";
import useStaff from "../../../../hooks/staffs/useStaff";
import { useMemo } from "react";

interface Props {
  title: string;
}

export const StaffChart = ({ title }: Props) => {
  const { data: department, isLoading } = useDepartment();
  const { data: staff } = useStaff();
  
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const gridColor = useColorModeValue("gray.100", "gray.700");

  const chartData = useMemo(() => {
    if (!department || !staff) return { categories: [], series: [] };
    
    const deptNames = department.map((item) => item.deptName);
    const staffByDept = staff.filter((item) => 
      deptNames.includes(item.deptName) && item.role === title
    );
    
    const count: { [key: string]: number } = {};
    staffByDept.forEach((item) => {
      count[item.deptName] = (count[item.deptName] || 0) + 1;
    });
    
    const categories = Object.keys(count);
    const series = Object.values(count);
    
    return { categories, series };
  }, [department, staff, title]);

  const totalStaff = chartData.series.reduce((a, b) => a + b, 0);

  const colors = [
    "#319795", // Teal
    "#805AD5", // Purple
    "#D53F8C", // Pink
    "#DD6B20", // Orange
    "#38A169", // Green
    "#E53E3E", // Red
    "#3182CE", // Blue
    "#718096", // Gray
  ];

  const chartOptions = {
    chart: {
      id: "staff-chart",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout' as const,
        speed: 800,
      },
      background: 'transparent',
    },
    colors: colors.slice(0, chartData.categories.length),
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '60%',
        distributed: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val.toString(),
      offsetY: -20,
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: [textColor],
      },
    },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: textColor,
          fontSize: '12px',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        rotate: -45,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: textColor,
          fontSize: '12px',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        formatter: (val: number) => val.toString(),
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      y: {
        formatter: (val: number) => `${val} ${title.toLowerCase()}s`,
      },
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            labels: {
              rotate: 0,
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: title,
      data: chartData.series,
    },
  ];

  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <Text color={textColor}>Loading staff data...</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          {title}s by Department
        </Text>
        <Badge colorScheme="teal" variant="subtle">
          Total: {totalStaff} {title.toLowerCase()}s
        </Badge>
      </HStack>
      
      <Box bg={bgColor} borderRadius="lg" p={4} boxShadow="sm">
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          width="100%"
          height="350px"
        />
      </Box>
      
      {chartData.categories.length === 0 && (
        <Text textAlign="center" color={textColor} py={8}>
          No {title.toLowerCase()} data available
        </Text>
      )}
    </VStack>
  );
};
