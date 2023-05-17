import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import _ from "lodash";

interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
}: Props) => {
  const pageCount = Math.ceil(itemsCount / pageSize);

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <>
      <List gap="3" display="flex" flexDirection="row" pt="5">
        {pages.map((page) => (
          <ListItem
            key={page}
            borderRadius="8px"
            p="2"
            bg="gray.100"
            bgColor={page === currentPage ? "blue.300" : ""}
          >
            <a onClick={() => onPageChange(page)}>{page}</a>
          </ListItem>
        ))}
      </List>
    </>
  );
};
