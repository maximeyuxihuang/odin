import { Resolver } from './main/resolver/Resolver'
import { DiceType } from './main/entities/Dice'
import { TestData } from './tests/TestData';
import fs from 'fs'

const addDice = (tab: DiceType[], input: DiceType, it: number) => {
  for (let i = 0; i < it; i++)
    tab.push(input)
}

const generator = (input: string): DiceType[] => {
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
        throw 'Invalid dice'
      }
    }
  }
  return dices;
}

const testSum = (input: string, expected: number) => {
  it(`${input} === ${expected}`, () => {
    expect(Resolver.sum(generator(input))).toBe(expected)
  })
}

const testIsValid = (input: string, expected: boolean) => {
  it(`${input} has solution`, () => {
    expect(Resolver.isValid(generator(input)).length).toBeGreaterThanOrEqual(1);
  })
}

const testIsEqual = (input: string, compareTo: string) => {
  it(`${input} === ${compareTo}`, () => {
    expect(Resolver.compare(generator(input), generator(compareTo))).toBe(true);
  })
}

const testIsNotEqual = (input: string, compareTo: string) => {
  it(`${input} === ${compareTo}`, () => {
    expect(Resolver.compare(generator(input), generator(compareTo))).toBe(false);
  })
}

const initializeData = (): TestData[] => {
  const text = fs.readFileSync('./src/data.csv');
  let data: TestData[] = [];
  for (let line of text.toString().split('\r\n')) {
    const dataArray = line.split(';');
    data.push({
      input: dataArray[0],
      expectedSum: parseInt(dataArray[1]),
      expectedExistSolution: dataArray[2] === "true" ? true : dataArray[2] === "false" ? false : undefined,
      isEqualDataToCompare: dataArray[3],
      isNotEqualDataToCompare: dataArray[4]
    })
  }
  return data
}

describe('Resolver', () => {
  const data: TestData[] = initializeData();

  describe('sum', () => {
    for (let item of data) {
      if (item.input && item.expectedSum)
        testSum(item.input!, item.expectedSum!);
    }
  })

  describe('equal', () => {
    for (let item of data) {
      if (item.input) {
        if (item.isEqualDataToCompare)
          testIsEqual(item.input, item.isEqualDataToCompare);
        else if (item.isNotEqualDataToCompare)
          testIsNotEqual(item.input, item.isNotEqualDataToCompare);
      }
    }
  })

  describe('isValid', () => {
    for (let item of data) {
      if (item.input && item.expectedExistSolution) 
        testIsValid(item.input, item.expectedExistSolution);
    }
  })

})