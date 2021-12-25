import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
      },
    },
  },
});

export default theme;
