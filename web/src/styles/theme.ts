const colors = {
  borderColor: "#e3e4e6",
  darkenBorderColor: "#24292f",
  darkenBg: "#f6f8fa",
  bg: "#fff",
  color: "#24292f",
  green: "#3fb861",
  darkenGreen: "#2c974b",
};

export interface Theme {
  colors: typeof colors;
}

export const definitions = { colors };
