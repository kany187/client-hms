import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Button,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import useDepartment from "../../../hooks/department/useDepartment";
import { StatisticsChart } from "./StatisticsChart";

export const Statistics = () => {
  const { data } = useDepartment();

  const [selectedItem, setSelectedItem] = useState("Monthly");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <Stack
        direction="row"
        align="center"
        pt="25px"
        spacing={5}
        ml="10"
        justifyContent="space-around"
      >
        <Text as="b" fontSize="2xl">
          Patient Visit By Department
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<BsChevronDown />}
            color="teal"
            borderRadius={10}
          >
            {selectedItem}
          </MenuButton>
          <MenuList minH="10" minW="20">
            <MenuItem onClick={() => handleItemClick("Weekly")}>
              Weekly
            </MenuItem>
            <MenuItem onClick={() => handleItemClick("Monthly")}>
              Monthly
            </MenuItem>
            <MenuItem onClick={() => handleItemClick("Yearly")}>
              Yearly
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction="row"
        align="center"
        gap="2"
        mt="15"
        justifyContent="space-around"
      >
        <StatisticsChart />
        <List
          bg="rgba(10, 30, 100, 0.1)"
          border="1px solid rgba(255,255,255,0.25)"
          borderRadius="10px"
          p="20px"
          spacing={5}
        >
          {data
            ?.filter(
              (item, index, array) =>
                index === array.findIndex((i) => i.deptName === item.deptName)
            )
            .map((dept) => (
              <ListItem key={dept._id} value={dept.deptName}>
                <ListIcon as={FaCircle} color="gold.500" boxSize={3} />
                {dept.deptName} 10%
              </ListItem>
            ))}
          {/* 
            <ListIcon as={FaCircle} color="red.500" boxSize={3} />
            <ListIcon as={FaCircle} color="teal.400" boxSize={3} />
            */}
        </List>
      </Stack>
    </div>
  );
};
