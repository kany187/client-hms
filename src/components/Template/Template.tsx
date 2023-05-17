import { Grid } from "@chakra-ui/react";

import { TemplateGrid } from "./TemplateGrid";
import { GridItem } from "../../pages/Patient/Patient";
import { Outlet } from "react-router-dom";

interface Props {
  gridItems: GridItem[];
}

export const Template = ({ gridItems }: Props) => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main" `,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        {gridItems.map((gridItem, index) => (
          <TemplateGrid
            key={index}
            area={gridItem.area}
            children={gridItem.children}
          />
        ))}
      </Grid>
      <Outlet />
    </>
  );
};
