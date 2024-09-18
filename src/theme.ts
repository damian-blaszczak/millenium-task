import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    black: "#000000",
    blue: "#0d58d0",
    red: "#ff0000",
    gray: "#d3d3d3",
    salmon: "#ffa07a",
    white: "#ffffff",
    lightGray: "#f2f2f2"
  },
  boxShadow: {
    default: "0px 8px 8px -6px rgba(66, 68, 90, 1)",
    button: "0 6px 8px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)"
  },
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 64
  },
  breakpoint: {
    xs: 320,
    sm: 481,
    md: 768,
    lg: 992,
    xl: 1248
  }
};
