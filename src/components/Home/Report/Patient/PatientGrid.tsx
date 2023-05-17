import {
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export const PatientGrid = () => {
  const [selectedItem, setSelectedItem] = useState("Monthly");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <Stack
        direction="row"
        align="center"
        pt="15px"
        spacing={4}
        justifyContent="space-around"
      >
        <Text as="b">Average Patient Visit</Text>
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
    </div>
  );
};
