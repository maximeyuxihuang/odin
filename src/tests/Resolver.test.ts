import { Resolver } from '../main/resolver/Resolver'
import { DiceType } from '../main/entities/Dice'
import { TestData } from './TestData';
import { MyFileReader } from '../helper/MyFileReader';
import { MyCsvParser } from '../helper/MyCsvParser';
import { DataGenerator } from '../helper/DataGenerator';

const testSum = (input: string, expected: number) => {
  it(`${input} === ${expected}`, () => {
    expect(Resolver.sum(DataGenerator.generate(input))).toBe(expected)
  })
}

const testNumberSolution = (input: string, expected: number) => {
  it(`${input} has ${expected} solution(s)`, () => {
    const sol = Resolver.isValid(DataGenerator.generate(input));
    expect(sol.length).toBe(expected);
  })
}

const testIsEqual = (input: string, compareTo: string) => {
  it(`${input} === ${compareTo}`, () => {
    expect(Resolver.compare(DataGenerator.generate(input), DataGenerator.generate(compareTo))).toBe(true);
  })
}

const testIsNotEqual = (input: string, compareTo: string) => {
  it(`${input} === ${compareTo}`, () => {
    expect(Resolver.compare(DataGenerator.generate(input), DataGenerator.generate(compareTo))).toBe(false);
  })
}

const initializeData = (): TestData[] => {
  return MyCsvParser.parseTextToDataArray(MyFileReader.readFileConvertToText("./src/data.csv"));
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
      if (item.input && item.expectedNumberOfSolution !== undefined && !isNaN(item.expectedNumberOfSolution))
        testNumberSolution(item.input, item.expectedNumberOfSolution);
    }
  })

})