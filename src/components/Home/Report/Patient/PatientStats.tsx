import { useState, useMemo } from "react";
import { Box, Text, VStack, HStack, Badge, useColorModeValue, Select } from "@chakra-ui/react";
import Chart from "react-apexcharts";

export const PatientStats = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const gridColor = useColorModeValue("gray.100", "gray.700");

  const chartData = useMemo(() => {
    const monthlyData = {
      visits: [45, 52, 38, 61, 55, 67, 72, 58, 63, 69, 75, 82],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };

    const weeklyData = {
      visits: [12, 15, 18, 14, 16, 20, 22],
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    };

    return selectedPeriod === "monthly" ? monthlyData : weeklyData;
  }, [selectedPeriod]);

  const totalVisits = chartData.visits.reduce((a, b) => a + b, 0);
  const averageVisits = Math.round(totalVisits / chartData.visits.length);

  const chartOptions = {
    chart: {
      id: "patient-visits",
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
    colors: ["#319795"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '60%',
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
        formatter: (val: number) => `${val} patients`,
      },
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
        },
      },
    ],
  };

  const series = [
    {
      name: "Patient Visits",
      data: chartData.visits,
    },
  ];

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between" align="center" wrap="wrap" gap={2}>
        <VStack align="start" spacing={1}>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            Patient Visit Trends
          </Text>
          <HStack spacing={4}>
            <Badge colorScheme="teal" variant="subtle">
              Total: {totalVisits} visits
            </Badge>
            <Badge colorScheme="blue" variant="subtle">
              Avg: {averageVisits} per {selectedPeriod === "monthly" ? "month" : "week"}
            </Badge>
          </HStack>
        </VStack>
        
        <Select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          size="sm"
          width="120px"
          bg={bgColor}
        >
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </Select>
      </HStack>

      <Box bg={bgColor} borderRadius="lg" p={4} boxShadow="sm">
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          width="100%"
          height="400px"
        />
      </Box>
    </VStack>
  );
};
