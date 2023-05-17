import { GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  area: string;
}

export const TemplateGrid = ({ children, area }: Props) => {
  return <GridItem area={area}>{children}</GridItem>;
};
