import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

export const SearchPatient = () => {
  return (
    <div>
      <InputGroup w="800px">
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={CiSearch} color="gray.300" />}
        />
        <Input
          type="text"
          borderRadius={20}
          placeholder="Search patients..."
          w="32%"
        />
      </InputGroup>
    </div>
  );
};
