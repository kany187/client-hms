import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

export const InputForm = () => {
  return (
    <form>
      <InputGroup w="250px" ml="240px">
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={CiSearch} color="gray.300" />}
        />
        <Input type="text" borderRadius={20} placeholder="Search..." />
      </InputGroup>
    </form>
  );
};
