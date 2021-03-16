import styled from "styled-components";

export const theme = {
  colors: {
    primary: "#0051a4",
    secondary: "#ff6633",
    blue: "#001f5f",
    lightblue: "#2196f3",
    green: "#00aea4",
    lightgreen: "#00d2b5",
    orange: "#ff5e4d",
    darkorange: "#ff3900",
    gray: "#6a6f85",
    lightgray: "#a4abb8",
  },
};

export const Button = styled.button`
  border-radius: 0;

  &.btn-text {
    border: 0;
    background: transparent;
  }

  &.btn-orange {
    background: ${theme.colors.orange};
    color: #fff;
    text-transform: uppercase;
  }
`;

export const CustomSelect = styled.div`
  [class$="-control"] {
    border-radius: 0;
    border-color: ${theme.colors.lightgray};
  }
  .custom-select {
    border-radius: 0;
    border-color: ${theme.colors.lightgray};
  }
`;
