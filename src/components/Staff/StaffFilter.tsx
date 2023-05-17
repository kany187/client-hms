import {
  Tabs,
  TabList,
  Tab,
  Divider,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { ModalAddStaff } from "./ModalAddStaff";

import { Staff } from "../../hooks/staffs/useStaffInfo";
import useRole from "../../hooks/useRole";
import useStaff from "../../hooks/staffs/useStaff";
import { useState } from "react";

interface Props {
  onSelectedGenre: (genre: Staff) => void;
  onSelectedFilter: (filter: string) => void;
  selectedFilter: String | null;
  selectedDept: (dept: string) => void;
}

export const StaffFilter = ({
  onSelectedGenre,
  onSelectedFilter,
  selectedFilter,
  selectedDept,
}: Props) => {
  const { data } = useRole();
  const { data: staff } = useStaff();

  const [dep, setDept] = useState<string[]>([]);

  function handleDeptClick(deptName: string) {
    if (dep.includes(deptName)) {
      setDept([]);
      selectedDept("All");
    } else {
      setDept([deptName]);
      selectedDept(deptName);
    }
  }

  const genre = data?.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.role === thing.role)
  );

  const status = staff?.filter(
    (item, index, array) =>
      index === array.findIndex((i) => i.status === item.status)
  );

  const dept = staff?.filter(
    (item, index, array) =>
      index === array.findIndex((i) => i.deptName === item.deptName)
  );

  const newGenre = [
    { _id: "", deptName: "", employeeId: "", status: "", role: "All" },
    ...(genre || []),
  ];

  return (
    <div>
      <Stack direction="row" pt="25px" spacing="12" align="stretch">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            {newGenre.map((g) => (
              <Tab onClick={() => onSelectedGenre(g)}>{g.role}</Tab>
            ))}
          </TabList>
        </Tabs>
        <Stack direction="row" gap="3">
          <Divider orientation="vertical" />
          <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
              {/* {selectedFilter || "Filters"} */}
              Filters
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue="active"
                title="Status"
                type="radio"
              >
                {status?.map((status) => (
                  <MenuItemOption
                    key={status._id}
                    value={status.status}
                    onClick={() => onSelectedFilter(status.status)}
                  >
                    {status.status}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
              <MenuOptionGroup title="Department" type="checkbox">
                {dept?.map((dept) => (
                  <MenuItemOption
                    key={dept._id}
                    value={dept.deptName}
                    onClick={() => handleDeptClick(dept.deptName)}
                  >
                    {dept.deptName}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Stack>
        <ModalAddStaff />
      </Stack>
    </div>
  );
};
