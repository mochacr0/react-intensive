import { blue, grey } from "@mui/material/colors";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";
import React, { ReactNode, useMemo } from "react";

declare module "@mui/material/styles" {
    interface Palette {
        mainColor: string;
        accent: {
            greenish: string;
            purplish: string;
            orangish: string;
        };
        sidebar: {
            background: string;
            hoverBg: string;
            hoverMobile: string;
            textColor: string;
        };
        status: {
            red: string;
            orange: string;
            green: string;
        };
        chatBox: string;
    }

    interface PaletteOptions {
        mainColor: string;
        accent: {
            greenish: string;
            purplish: string;
            orangish: string;
        };
        sidebar: {
            background: string;
            hoverBg: string;
            hoverMobile: string;
            textColor: string;
        };
        status: {
            red: string;
            orange: string;
            green: string;
        };
        chatBox: string;
    }
}

interface AdminThemeProviderProps {
    rootElement: HTMLElement;
    children: ReactNode;
}

const AdminThemeProvider: React.FC<AdminThemeProviderProps> = ({ rootElement, children }) => {
    const theme: Theme = useMemo(
        () =>
            createTheme({
                palette: {
                    primary: {
                        main: blue[600],
                    },
                    mainColor: "#0b0f19",
                    accent: {
                        greenish: "#99d1a6",
                        purplish: "#a288ec",
                        orangish: "#ffa071",
                    },
                    sidebar: {
                        background: "#111827",
                        hoverBg: "#172032",
                        hoverMobile: "#3f4554",
                        textColor: "#949ca9",
                    },
                    status: {
                        red: "#fc424a",
                        orange: "#fea73e",
                        green: "#22c38f",
                    },
                    background: {
                        default: "#F4F7FE",
                        paper: "#fff",
                    },
                    text: {
                        primary: "#5f6470",
                        secondary: grey[700],
                    },
                    divider: "rgba(129, 139, 156, 0.1)",
                    chatBox: "#dfe5f1",
                },
                components: {
                    MuiPopover: {
                        defaultProps: {
                            container: rootElement,
                        },
                    },
                    MuiPopper: {
                        defaultProps: {
                            container: rootElement,
                        },
                    },
                    MuiDialog: {
                        defaultProps: {
                            container: rootElement,
                        },
                    },
                    MuiModal: {
                        defaultProps: {
                            container: rootElement,
                        },
                    },
                },
            }),
        [rootElement],
    );

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AdminThemeProvider;
