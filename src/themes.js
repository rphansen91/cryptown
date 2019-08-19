import { createMuiTheme } from "@material-ui/core/styles";

const createTheme = (type = "dark") => createMuiTheme({ palette: { type } });
export const darkTheme = createTheme("dark");
export const lightTheme = createTheme("light");

darkTheme.typography.h1 = darkTheme.typography.h4;
lightTheme.typography.h1 = lightTheme.typography.h4;
