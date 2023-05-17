import { Box, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface Props {
  label: string;
  error: string;
  errors: string;
}

export const InputForm = ({ label, error, errors }: Props) => {
  const { register } = useForm();
  return (
    <div>
      <FormControl w="25%" ml="340px" pt="25px">
        <FormLabel>{label}</FormLabel>
        <Input {...register(`${label}`)} placeholder={label} />
        {errors && <p>{errors}</p>}
        {error && <p>{error}</p>}
      </FormControl>
    </div>
  );
};
