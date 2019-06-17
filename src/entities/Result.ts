import { Dice } from "./Dice";

export interface Result {
  results: ResultData[]
}

export interface ResultData {
  groupA: Dice[],
  groupB: Dice[]
}