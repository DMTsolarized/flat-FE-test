import { PaletteOptions } from "@mui/material"
declare module "@mui/material/styles" {
    interface TypeBackground {
        lightGray: string,
        darkGray: string
    }

}

export default function createPalette(palette: PaletteOptions): Palette;
