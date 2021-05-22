export declare type ColorTypes = 'hex' | 'rgb' | 'rgba' | 'hsl';
export declare function getColorType(color: string): ColorTypes;
export declare function trimColor(_color?: string): string;
export declare function setColorOpacity(_color: string, opacity: number): string;
