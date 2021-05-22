import { Theme as StorybookTheme } from '@storybook/theming';
export declare function createInputStyles(theme: StorybookTheme): {
    backgroundColor: string;
    color: string;
    borderRadius: number;
    boxShadow: string;
    transition: string;
    '&:focus': {
        boxShadow: string;
    };
};
