import palette from "../theme/palette";

export const colorPresets = [
  // DEFAULT PRESET
  {
    name: "default",
    ...palette.light.primary,
  },
  // PURPLE PRESET
  {
    name: "purple",
    lighterFaded: "#200A6940",
    lighter: "#EBD6FD",
    light: "#B985F4",
    main: "#7635dc",
    dark: "#431A9E",
    darker: "#200A69",
    contrastText: "#fff",
  },
  // CYAN PRESET
  {
    name: "cyan",
    lighterFaded: "#053D7A40",
    lighter: "#D1FFFC",
    light: "#76F2FF",
    main: "#1CCAFF",
    dark: "#0E77B7",
    darker: "#053D7A",
    contrastText: palette.light.grey[800],
  },
  // BLUE PRESET
  {
    name: "blue",
    lighterFaded: "#0754a340",
    lighter: "#9BCBFA",
    light: "#5DA8F5",
    main: "#1b8cfe",
    dark: "#0159b2",
    darker: "#0754a3",

    contrastText: "#fff",
  },
  // ORANGE PRESET
  {
    name: "orange",
    lighterFaded: "#79390840",
    lighter: "#FEF4D4",
    light: "#FED680",
    main: "#fda92d",
    dark: "#B66816",
    darker: "#793908",
    contrastText: palette.light.grey[800],
  },
  // RED PRESET
  {
    name: "red",
    lighterFaded: "#7A093040",
    lighter: "#FFE3D5",
    light: "#FFC1AC",
    main: "#FF3030",
    dark: "#B71833",
    darker: "#7A0930",
    contrastText: "#fff",
  },
];

export const defaultPreset = colorPresets[0];
export const purplePreset = colorPresets[1];
export const cyanPreset = colorPresets[2];
export const bluePreset = colorPresets[3];
export const orangePreset = colorPresets[4];
export const redPreset = colorPresets[5];

export default function getColorPresets(presetsKey) {
  return {
    purple: purplePreset,
    cyan: cyanPreset,
    blue: bluePreset,
    orange: orangePreset,
    red: redPreset,
    default: defaultPreset,
  }[presetsKey];
}
