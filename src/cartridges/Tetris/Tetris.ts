import { KeyPress } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { EMPTY_BOARD } from "../constants";
import { GameCreator } from "../GameCreator";
import { Blocks } from "./blocks";

export class TetrisDecorator {
    constructor() {
        const decoratedClass = new GameCreator(TetrisVisitor, Judge, EMPTY_BOARD);
        return decoratedClass;
    }
}

const gameEvents = {
    DEMOLISH_SINGLE: 'Single score', // 11500 - 10800 = 700
    DEMOLISH_DOUBLE: 'Double score',
    DEMOLISH_TRIPLE: 'Triple score',
    DEMOLISH_QUATRO: 'Quatro score',
}

class Judge {
    inform(visitedObject: any, information: string, pyload?:any){
        switch(information){
            case gameEvents.DEMOLISH_SINGLE: visitedObject.score += 100; break;
            case gameEvents.DEMOLISH_DOUBLE: visitedObject.score += 300; break;
            case gameEvents.DEMOLISH_TRIPLE: visitedObject.score += 700; break;
            case gameEvents.DEMOLISH_QUATRO: visitedObject.score += 1100;
        }
        if (visitedObject.score % 10000) {
            visitedObject.speed += 1;
        }
    }
}

class TetrisVisitor extends NextStateCalculator {
    initiate(visitedObject: any){
        const blocksInstance = new Blocks()
        visitedObject.name = 'Tetris'
        visitedObject.pawnCords = { col: 5, row: 0 };
        visitedObject.blocksMaker = blocksInstance;
        this.setNewBrick(visitedObject);
        this.placeNewBlock(visitedObject);
        console.log(visitedObject)
    }

    setVisitorToNextStateOnTick(visitedObject:any){

    }

    setVisitorToNextStateOnKeyPress(visitedObject:any, keyPresses: KeyPress){
        if (keyPresses === KeyPress.Speed) {visitedObject.increaseSpeed()}
        if (keyPresses === KeyPress.Level) {visitedObject.increaseLevel()}
        if (keyPresses === KeyPress.Start) {
            this.restart(visitedObject);
            visitedObject.startGame();
        }
        if (keyPresses === KeyPress.Pause) {visitedObject.pauseGame()}
        if (!visitedObject.checkIfGameLocked()) {
            this.tryMoving(visitedObject, keyPresses);
        }
    }

    tryMoving( visitedObject: any, keyPresses: KeyPress ) {

        if (keyPresses === KeyPress.Down) this.move(visitedObject, 1, 0);
        if (keyPresses === KeyPress.Up) this.move(visitedObject, -1, 0);
        if (keyPresses === KeyPress.Left) this.move(visitedObject, 0, -1);
        if (keyPresses === KeyPress.Right) this.move(visitedObject, 0, 1);
    }

    restart(visitedObject:any){
        if (visitedObject.isGameWon || visitedObject.isGameOver){
            this.initiate(visitedObject);
            visitedObject.restart();    
        }
    }

    setNewBrick(visitedObject: any) {
        // visitedObject.currentBrick = visitedObject.blocksMaker.randomBlock;
        visitedObject.currentBlock = visitedObject.blocksMaker.getBlock(0);
    }

    placeNewBlock(visitedObject:any) {
        const { col, row } = visitedObject.currentBlock.currentHandlePoint;
        this.mergeBlockToLayer(visitedObject);
        // visitedObject.pawnCords.row = row;
    }

    mergeBlockToLayer(visitedObject:any){
        const { col, row } = visitedObject.pawnCords;
        const {pawnLayer, currentBlock} = visitedObject;
        const {currentFigure, currentHandlePoint} = currentBlock;
        visitedObject.resetLayer();
        const mergeRow = (rowIndex: number) => {
            currentFigure[rowIndex].forEach(
                (bit: 0 | 1, colIndex: number) => {
                    console.log(rowIndex, colIndex, row, col, bit)
                    pawnLayer[rowIndex + row][colIndex + col] = bit;
                }
            )
        }
        currentFigure.forEach((row: (0 | 1)[], rowIndex:number) => { mergeRow(rowIndex); })
        visitedObject.pawnLayer = pawnLayer;
    }


}
