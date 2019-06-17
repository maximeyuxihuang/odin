import { DiceType } from "../main/entities/Dice";

export interface Result {
  results: ResultData[]
}

export interface ResultData {
  groupA: DiceType[],
  groupB: DiceType[]
}