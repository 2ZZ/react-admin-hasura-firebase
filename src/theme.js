// In theme.js
import { defaultTheme } from "react-admin";
import merge from "lodash/merge";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import createPalette from "@material-ui/core/styles/createPalette";

const palette = createPalette(
  merge({}, defaultTheme.palette, {
    type: 'dark',
    primary: {
      main: "#ff0266", // Not far from red
    },
    secondary: {
      main: "#00ba00", // Not far from green
    },
  })
);

const rawTheme = {
    palette,
};

export const theme = createMuiTheme(
  merge({}, defaultTheme, rawTheme)
);