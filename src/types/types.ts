import { GameLogic } from "../cartridges/AbstractGameLogic";

export type OneToTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Speed = OneToTen;

export type Level = OneToTen;

export type NextFigurePreview = number[][]
export type BrickMap = number[][];

export interface ScheaduleProps {
    background: BrickMap,
    animationSequencer: any,
    repetitions: number,
    tickDivider?: number,
    scheaduler?: any,
}

export type DigitDisplayType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '' | '-';
export const digitDisplaySymbols = [...'1234567890-'.split(''), ''];


export interface GameLogicArgs {
    score: number,
    level: OneToTen,
    speed: OneToTen,
    // nextFigureFieldContent: [number[], number[], number[] ,number[]],
    nextFigure: NextFigurePreview,
    brickMap: BrickMap,
    isPaused: boolean,
    isAnimating: boolean,
    isGameOver?: boolean,
    isGameWon?: boolean,
    isGameStarted?: boolean,
}

export interface GameState {
    nextFigure: NextFigurePreview,
    level: OneToTen,
    speed: OneToTen,
    score: number,
    isPaused: boolean,
    isAnimating: boolean,
    brickMap: BrickMap,
    isGameOver: boolean,
    isGameWon?: boolean,
    isGameStarted?: boolean,
}

// export interface KeyPress {
//     up: number,
//     down: number,
//     right: number,
//     left: number,
// }

export type NextFigure = (0 | 1)[][];

export interface FigureHandlePoint {
    row: number, col: number,
};

export enum KeyPress {
    Up, Down, Left, Right, Level, Speed, Pause, Rotate, Start
}

export interface ConsoleArgs {
    currentGame: string,
    speed: OneToTen,
    level: OneToTen,
    setSpeed: (val: OneToTen) => void,
    setLevel: (val: OneToTen) => void,
}

export interface DoWithBar {
    dojo: number[][],
    index: number,
    pixelModificationFunction: (currentValue: number) => number
}
