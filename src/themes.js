import { createMuiTheme } from "@material-ui/core/styles";

const createTheme = (type = "dark") => createMuiTheme({ palette: { type } });
export const darkTheme = createTheme("dark");
export const lightTheme = createTheme("light");
