import { Box, Text, VStack, HStack, Badge, useColorModeValue } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import useDepartment from "../../../hooks/department/useDepartment";
import { useState, useMemo } from "react";

export const StatisticsChart = () => {
  const { data: department, isLoading } = useDepartment();
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const chartData = useMemo(() => {
    if (!department) return { labels: [], series: [] };
    
    const deptCounts = department.reduce((acc: any, item) => {
      acc[item.deptName] = (acc[item.deptName] || 0) + 1;
      return acc;
    }, {});
    
    const labels = Object.keys(deptCounts);
    const series = Object.values(deptCounts) as number[];
    
    return { labels, series };
  }, [department]);

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
      type: 'donut' as const,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout' as const,
        speed: 800,
      },
    },
    colors: colors.slice(0, chartData.labels.length),
    labels: chartData.labels,
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseFloat(val).toFixed(1)}%`,
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['white'],
      },
    },
    legend: {
      show: true,
      position: 'bottom' as const,
      horizontalAlign: 'center' as const,
      fontSize: '14px',
      fontFamily: 'Inter, system-ui, sans-serif',
      markers: {
        width: 8,
        height: 8,
        radius: 4,
      },
      itemMargin: {
        horizontal: 8,
        vertical: 4,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Departments',
              fontSize: '16px',
              fontWeight: 'bold',
              color: textColor,
              formatter: () => chartData.series.reduce((a, b) => a + b, 0).toString(),
            },
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `${val} departments`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: 'bottom',
            horizontalAlign: 'center',
          },
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <Text color={textColor}>Loading chart data...</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <HStack justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          Department Distribution
        </Text>
        <Badge colorScheme="teal" variant="subtle">
          {chartData.labels.length} Departments
        </Badge>
      </HStack>
      
      <Box bg={bgColor} borderRadius="lg" p={4} boxShadow="sm">
        <Chart
          options={chartOptions}
          series={chartData.series}
          type="donut"
          width="100%"
          height="350px"
        />
      </Box>
      
      {chartData.labels.length === 0 && (
        <Text textAlign="center" color={textColor} py={8}>
          No department data available
        </Text>
      )}
    </VStack>
  );
};
