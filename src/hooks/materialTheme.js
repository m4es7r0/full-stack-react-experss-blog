import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

export const useMUITheme = (point = "md") => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(point), { noSsr: true });
  return matches;
};
