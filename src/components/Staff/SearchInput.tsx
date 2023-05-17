import { Input } from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  onSearch: (searchText: string) => void;
}

export const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <Input
        ref={ref}
        type="text"
        borderRadius={20}
        placeholder="Search by name, email, phone..."
        w="17%"
      />
    </form>
  );
};
