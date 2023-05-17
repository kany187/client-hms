import { Flex, Stack, Text } from "@chakra-ui/react";
import { CiWavePulse1 } from "react-icons/ci";

import "./Revenue.css";
import { RevenueChart } from "./RevenueChart";

export const Revenue = () => {
  return (
    <div className="revenue-grid">
      <Text as="b" ml="25px">
        Revenue
      </Text>
      <Flex gap="2" justify="flex-end" mr="10px">
        <Stack direction="row" align="center">
          <CiWavePulse1 />
          <Text>Income</Text>
        </Stack>
        <Stack direction="row" align="center">
          <CiWavePulse1 />
          <Text>Expense</Text>
        </Stack>
      </Flex>
      <RevenueChart />
    </div>
  );
};
