import { BallDirections, directions, ObstacleLocations } from "../../types/types";
import { PawnCords } from "../GameCreator";

export interface NextBallDirectionCalculatorInterface {
    currentDirection: BallDirections,
    ballCords: PawnCords,
    background: number[][],
    playerPosition: number,
}

export const GAME_LOST_ERROR = 'Game lost';

const isGameLost = (ballCords: PawnCords, background: number[][]) => {
    const {row } = ballCords;
    const maxRowIndex = background.length - 1;
    return (row === 0 || row === maxRowIndex)
}

const throwIfGameLoss = (ballCords: PawnCords, background: number[][]) => {
    if (isGameLost(ballCords, background)) throw new Error(GAME_LOST_ERROR)
}
    
const getMaxColIndex = (background:number[][]) => background[0].length - 1;
const getMaxRowIndex = (background:number[][]) => background.length - 1;

const isMoveLeft = (direction: BallDirections) => direction === BallDirections.downLeft || direction === BallDirections.upLeft;
const isMoveRight = (direction: BallDirections) => direction === BallDirections.downRight || direction === BallDirections.upRight;

const getPossibleObstacleCordsForDirection = (direction: BallDirections, cords: PawnCords) => {
    const {row, col} = cords;
    switch(direction){
        case BallDirections.upRight: return [{row: row - 1, col: col + 1}, {row: row - 1, col}, {row, col: col + 1}];
        case BallDirections.upLeft: return [{row: row - 1, col: col - 1}, {row: row - 1, col}, {row, col: col  - 1}];
        case BallDirections.downLeft: return [{row: row + 1, col: col - 1}, {row: row + 1, col}, {row, col: col  - 1}];
        case BallDirections.downRight: return [{row: row + 1, col: col + 1}, {row: row + 1, col}, {row, col: col + 1}];
    }
}

const isObstacleUnderCords = (cord: PawnCords, background: number[][]) => {
    const {row, col} = cord;
    const result = background[row][col] === 1 ? true : false;
    return result;
}

export const getObstacleCords = ({
    background,
    playerPosition,
    ballCords,
    currentDirection
}: NextBallDirectionCalculatorInterface) => {
    throwIfGameLoss(ballCords, background)
    const {row, col} = ballCords;
    if (col === 0 && isMoveLeft(currentDirection)) return [{row, col: col - 1}]
    if (col === getMaxColIndex(background) && isMoveRight(currentDirection)) return [{row, col: col + 1}]
    const possibleObctacleCords = getPossibleObstacleCordsForDirection(currentDirection, ballCords)
    const obstacleCords = possibleObctacleCords!.filter((cord) => isObstacleUnderCords(cord, background))
    return(obstacleCords)
}

export const getObstacleLocations = ({
    background,
    ballCords,
    currentDirection,
    playerPosition,
}: NextBallDirectionCalculatorInterface) => {
    const obstacleCords = getObstacleCords({ background, ballCords, currentDirection, playerPosition });
    const obstacleLocations = calculateObstacleLocations(obstacleCords, ballCords);
    return obstacleLocations;
}

const cordsToDirectionsMapper = (ballCords: PawnCords, cordsToCheck: PawnCords) => {
    const cordsToDirectionsMap = [
        {
            direction: ObstacleLocations.above,
            condition: ballCords.col === cordsToCheck.col && ballCords.row === cordsToCheck.row + 1,
        },
        {
            direction: ObstacleLocations.topLeft,
            condition: ballCords.col === cordsToCheck.col + 1 && ballCords.row === (cordsToCheck.row + 1),
        },
        {
            direction: ObstacleLocations.left,
            condition: ballCords.col - 1 === cordsToCheck.col && ballCords.row === cordsToCheck.row,
        },
        {
            direction: ObstacleLocations.bottomLeft,
            condition: ballCords.col - 1 === cordsToCheck.col && ballCords.row +1 === cordsToCheck.row,
        },
        {
            direction: ObstacleLocations.below,
            condition: ballCords.col === cordsToCheck.col && ballCords.row + 1 === cordsToCheck.row,
        },
        {
            direction: ObstacleLocations.bottomRight,
            condition: ballCords.col === cordsToCheck.col - 1 && ballCords.row === cordsToCheck.row - 1,
        },
        {
            direction: ObstacleLocations.right,
            condition: ballCords.col === cordsToCheck.col - 1 && ballCords.row === cordsToCheck.row,
        },
        {
            direction: ObstacleLocations.topRight,
            condition: ballCords.col === cordsToCheck.col -1 && ballCords.row - 1 === cordsToCheck.row,
        }
    ]
    const foundDirectionMap = cordsToDirectionsMap.find(({condition}) => condition);
    return foundDirectionMap?.direction === undefined ? null : foundDirectionMap.direction;
}    

export const calculateObstacleLocations = (obstacleCords: PawnCords[], ballCords: PawnCords) => {
    const directions: ObstacleLocations[] = [];
    obstacleCords.forEach((cord) => {
        const direction = cordsToDirectionsMapper(ballCords, cord);
        if (direction !== null) directions.push(direction)
    })
    return directions;
}
