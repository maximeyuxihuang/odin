import fs from 'fs'

const readFileConvertToText = (filename: string): string => {
  return fs.readFileSync('./src/data.csv').toString();
}

export const MyFileReader = {
  readFileConvertToText
}