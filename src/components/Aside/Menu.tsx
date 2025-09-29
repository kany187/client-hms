import { List, ListItem, Icon, Box, Collapse } from "@chakra-ui/react";
import { useState } from "react";
import { IconType } from "react-icons";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

interface subMenu {
  title: string;
  link: string;
}
interface Props {
  data: any;
  list: {
    name: string;
    icon: IconType;
    iconClosed?: IconType;
    iconOpen?: IconType;
    subMenu?: subMenu[];
    path?: string;
    elementType?: string;
  }[];
}

export const Menu = ({ data, list }: Props) => {
  const [subMenuIndex, setSubMenuIndex] = useState(-1);

  const toggleSubMenu = (index: number) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(-1);
    } else {
      setSubMenuIndex(index);
    }
  };

  return (
    <List spacing={10} pt={20} ml={10}>
      {list.map((item, index) => (
        <ListItem key={item.name}>
          <Box
            display="flex"
            alignItems="center"
            cursor={item.subMenu ? "pointer" : "default"}
            onClick={() => item.subMenu && toggleSubMenu(index)}
          >
            <Icon as={item.icon} boxSize={6} color="green.500" mr={2} />
            {item.path ? <Link to={item.path}>{item.name}</Link> : item.name}
            {item.iconClosed && (
              <Icon as={item.iconClosed} boxSize={6} color="green.500" mr={2} />
            )}
          </Box>
          {item.subMenu && (
            <Collapse in={subMenuIndex === index}>
              <List ml={8} mt={2}>
                {item.subMenu.map((subItem) => (
                  <ListItem key={subItem.title}>
                    <Box display="flex" alignItems="center" m="2">
                      <Link to={subItem.link}> {subItem.title}</Link>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </ListItem>
      ))}

      {data && (
        <Link to="/logout">
          <ListItem mt="10">
            <Icon as={FiLogOut} boxSize={6} color="green.500" mr={2} />
            Log out
          </ListItem>
        </Link>
      )}
    </List>
  );
};
