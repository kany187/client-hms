import { Stack, Tab, TabList, Tabs, Text, Button } from "@chakra-ui/react";
import { StaffChart } from "./StaffChart";
import "./StaffChart.css";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Staff = () => {
  const [title, setTitle] = useState("Doctor");

  const handleTitleClick = (title: string) => {
    setTitle(title);
  };

  return (
    <div className="staff-grid">
      <Text as="b" ml="25px">
        Our Satff By Department
      </Text>
      <Stack direction="row" align="center" justify="space-around">
        <Tabs variant="soft-rounded" colorScheme="green" pt="15px">
          <TabList>
            <Tab onClick={() => handleTitleClick("Doctor")}>Doctor</Tab>
            <Tab onClick={() => handleTitleClick("Nurse")}>Nurse</Tab>
            <Tab onClick={() => handleTitleClick("Receptionist")}>
              Receptionist
            </Tab>
          </TabList>
        </Tabs>
        <Link to="/staff">
          <Button
            rightIcon={<BsChevronRight />}
            colorScheme="teal"
            variant="outline"
            alignItems="center"
            ml="40"
          >
            More
          </Button>
        </Link>
      </Stack>
      <StaffChart title={title} />
    </div>
  );
};
