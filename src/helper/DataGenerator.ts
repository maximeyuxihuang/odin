import { DiceType } from "../main/entities/Dice";

const addDice = (tab: DiceType[], input: DiceType, it: number) => {
  for (let i = 0; i < it; i++)
    tab.push(input)
}

const generate = (input: string): DiceType[] => {
  const dices: DiceType[] = [];
  for (let i = 0; i < input.length; i+=2) {
    const current = input[i + 1];
    const iteration = parseInt(input[i]);
    switch(current) {
      case 'h': {
        addDice(dices, DiceType.Hero, iteration)
        break;
      }
      case 'c': {
        addDice(dices, DiceType.Captain, iteration)
        break;
      }
      case 's': {
        addDice(dices, DiceType.Soldier, iteration)
        break;
      }
      case 't': {
        addDice(dices, DiceType.Traitor, iteration)
        break;
      }
      case 'd': {
        addDice(dices, DiceType.Damned, iteration)
        break;
      }
      case 'm': {
        addDice(dices, DiceType.Mage, iteration)
        break;
      }
      default: {
        throw `Invalid dice: ${current}`
      }
    }
  }
  return dices;
}

export const DataGenerator = {
  generate
}