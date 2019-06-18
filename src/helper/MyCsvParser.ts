import { TestData } from "../tests/TestData";

const SEPARTOR = ','
const DELIMITER = '#'

const assignData = (newData: TestData, field: string, data: string) =>  {
  switch(field) {
    case 'i': {
      newData.input = data as string;
      break;
    }
    case 's': {
      newData.expectedSum = parseInt(data);
      break;
    }
    case 'solnum': {
      newData.expectedNumberOfSolution = parseInt(data);
      break;
    }
    case 'equal': {
      newData.isEqualDataToCompare = data;
      break;
    }
    case 'notequal': {
      newData.isNotEqualDataToCompare = data;
      break;
    }
    default: {
      throw "Unknown data";
    }
  }
}

const parseTextToDataArray = (input: string): TestData[] => {
  let result: TestData[] = []
  for (let line of input.split('\r\n')) {
    const dataArray = line.split(SEPARTOR);
    const newData: TestData = {}
    for (let element of dataArray) {
      const data: string[] = element.split(DELIMITER);
      if (data.length !== 2)
        throw "Invalid csv"
      assignData(newData, data[0], data[1]);
    }
    result.push(newData);
  }
  return result
}

export const MyCsvParser = {
  parseTextToDataArray
}