import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";

import { BsChevronDown } from "react-icons/bs";

export const FilterPatient = () => {
  return (
    <div>
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          colorScheme="blue"
          rightIcon={<BsChevronDown />}
        >
          Filter
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
            <MenuItemOption value="asc">Ascending</MenuItemOption>
            <MenuItemOption value="desc">Descending</MenuItemOption>
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup title="Var" type="checkbox">
            <MenuItemOption value="email">Disease</MenuItemOption>
            <MenuItemOption value="phone">Status</MenuItemOption>
            <MenuItemOption value="country">Doctor</MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </div>
  );
};
