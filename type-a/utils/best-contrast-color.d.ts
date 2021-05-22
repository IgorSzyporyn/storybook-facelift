declare type BestContrastColorProps = {
    colors?: string[];
    color1?: string;
    color2?: string;
    background: string;
    ratio?: number;
};
export declare function bestContrastColor({ colors: _colors, color1, color2, background, ratio, }: BestContrastColorProps): string;
export {};
