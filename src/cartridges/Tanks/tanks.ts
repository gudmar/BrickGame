import { GameCreatorInterface } from "../../types/GameCreatorInterface";
import { Variants } from "../../types/types";
import { NextStateCalculator } from "../AbstractNextStateCalculator";
import { GameCreator } from "../GameCreator";
import { AnimationAfterGame } from "../layers/AfterGameAnimation";
import { GameIntroCloasure } from "../snake/GameIntroCloasure";
import { Judge } from "./judge";
import { getLayerWithAllPlacedTanks, mergeAllPlacedTanks, Tank } from "./tank";
import { TankCommander } from "./tankCommander";



export class TankDecorator {
    constructor() {
        const decoratedClass = new GameCreator(
            {
                nextStateCalculator: TankVisitor,
                judge: Judge,
                afterGameAnimation: AnimationAfterGame,
                beforeGameAnimation: GameIntroCloasure,
            }
        )
        return decoratedClass;
    }
}

const INITIAL_PLAYER_TANK_CORDS = {col: 8, row: 18};

class TankVisitor extends NextStateCalculator implements GameCreatorInterface{
    MAX_ENEMY_TANKS_NUMBER = 3;
    playerTank: Tank = new Tank(Variants.PLAYER, INITIAL_PLAYER_TANK_CORDS);
    // enemyTanksList = getLayerWithAllTanks();
    enymyTanksLayer = getLayerWithAllPlacedTanks(this.playerTank);
    playerBullets = [];
    enemyBullets = [];
    PLAYER_TANK_PLACE_CORDS = {col: 8, row: 18}
    enemyTankCommanders = TankCommander.createCommanders(3);

    // getInitialListOfEnemyTanks(){
    //     const tankList = [];
    //     for(let i = 0; i < this.MAX_ENEMY_TANKS_NUMBER; i++){
    //         tankList.push(new Tank())
    //     }
    //     return tankList;
    // }

    setVisitorToNextStateOnTick(visitedObject:GameCreator, time: number) {
        visitedObject.pawnLayer = mergeAllPlacedTanks(visitedObject.background);
    }

    moveEachEnemyTank(){}

    passCode(visitedObject: GameCreator, code: string): void {
        
    };
    setLevel(visitedObject: GameCreator): void {
        
    };
    pauseGame(visitedObject: GameCreator): void {
        
    }

}
