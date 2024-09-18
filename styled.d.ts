import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Record<string, string>;
    shadows: {
      default: string;
    };
    space: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
}
