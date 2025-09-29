import { useState, useMemo } from "react";
import { Box, Text, HStack, VStack, Badge, useColorModeValue } from "@chakra-ui/react";
import Chart from "react-apexcharts";

export const RevenueChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("yearly");
  
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const gridColor = useColorModeValue("gray.100", "gray.700");

  const chartData = useMemo(() => {
    const monthlyData = {
      income: [3200, 4100, 3800, 5200, 4900, 6100, 7200, 8100, 7800, 8500, 9200, 9800],
      expenses: [2800, 3200, 2900, 3800, 3500, 4200, 4800, 5200, 4900, 5400, 5800, 6200],
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };

    const weeklyData = {
      income: [1200, 1500, 1800, 1600, 2000, 2200, 1900],
      expenses: [1000, 1200, 1400, 1300, 1500, 1600, 1400],
      months: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    };

    return selectedPeriod === "yearly" ? monthlyData : weeklyData;
  }, [selectedPeriod]);

  const totalIncome = chartData.income.reduce((a, b) => a + b, 0);
  const totalExpenses = chartData.expenses.reduce((a, b) => a + b, 0);
  const netProfit = totalIncome - totalExpenses;

  const chartOptions = {
    chart: {
      id: "revenue-chart",
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
    colors: ["#319795", "#E53E3E"], // Teal for income, Red for expenses
    stroke: {
      curve: 'smooth' as const,
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#38B2AC', '#FC8181'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100],
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
      categories: chartData.months,
      labels: {
        style: {
          colors: textColor,
          fontSize: '12px',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
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
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
    legend: {
      show: true,
      position: 'top' as const,
      horizontalAlign: 'right' as const,
      fontSize: '14px',
      fontFamily: 'Inter, system-ui, sans-serif',
      markers: {
        width: 8,
        height: 8,
        radius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: 'bottom',
            horizontalAlign: 'center',
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Income",
      data: chartData.income,
    },
    {
      name: "Expenses", 
      data: chartData.expenses,
    },
  ];

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between" align="center" wrap="wrap" gap={2}>
        <VStack align="start" spacing={1}>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            Revenue Analytics
          </Text>
          <HStack spacing={4}>
            <Badge colorScheme="green" variant="subtle">
              Income: ${totalIncome.toLocaleString()}
            </Badge>
            <Badge colorScheme="red" variant="subtle">
              Expenses: ${totalExpenses.toLocaleString()}
            </Badge>
            <Badge colorScheme={netProfit >= 0 ? "green" : "red"} variant="solid">
              Net: ${netProfit.toLocaleString()}
            </Badge>
          </HStack>
        </VStack>
      </HStack>

      <Box bg={bgColor} borderRadius="lg" p={4} boxShadow="sm">
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          width="100%"
          height="400px"
        />
      </Box>
    </VStack>
  );
};
