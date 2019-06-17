import { DiceType, DiceTypeValue, printDice } from "../entities/Dice";
import { ResultData } from "../entities/Result";

const occurrence = (dices: DiceType[], type: DiceType): number => {
  let occ = 0;
  for (let dice of dices) {
    if (dice === type)
      occ++;
  }
  return occ;
}

const applyHeroTraitorBonus = (dices: DiceType[]): number => {
  let bonus = 0;
  const numHero = occurrence(dices, DiceType.Hero);
  const numTraitor = occurrence(dices, DiceType.Traitor);
  const diff = numHero - numTraitor;
  if (diff < 0) {
    bonus -= (3 * numHero);
  }
  else {
    bonus -= 3 * (numTraitor);
  }
  return bonus;
}

const applyMageBonus = (dices: DiceType[]): number => {
  const numMage = occurrence(dices, DiceType.Mage);
  const total = dices.length;
  return (total - numMage) * numMage;
}

const sum = (dices: DiceType[]): number => {
  let sum = 0;
  sum += applyHeroTraitorBonus(dices);
  sum += applyMageBonus(dices);
  for (let dice of dices) {
    sum += DiceTypeValue(dice);
  }
  return sum;
}

const printState = (groupA: DiceType[], groupB: DiceType[], remaining?: DiceType[]) => {
  let aStr = ""
  for (let a of groupA) {
    aStr += printDice(a) + " "
  }
  aStr = `Group A: ${aStr}\n`;
  let bStr = ""
  for (let b of groupB) {
    bStr += printDice(b) + " "
  }
  bStr = `Group B: ${bStr}\n`;

  let rStr = ""
  if (remaining !== undefined) {

    for (let r of remaining) {
      rStr += printDice(r) + " "
    }
    rStr = `Remaining: ${rStr}\n`
  }
  console.log(`${aStr}${bStr}${rStr}====`)
}

const compare = (groupA: DiceType[], groupB: DiceType[]): boolean => {
  return (sum(groupA) === sum(groupB));
}

const isValidHelper = (dices: DiceType[], groupA: DiceType[], groupB: DiceType[], iterator: { value: number }, max: number): ResultData[] => {
  let res: ResultData[] = Array.from([])
  iterator.value++;
  if (iterator.value > max)
    return res;
  for (let dice of dices) {
    let remaining = Array.from(dices);
    remaining.splice(remaining.indexOf(dice), 1);

    let copyA = Array.from(groupA);
    copyA.push(dice);
    const aResult = isValidHelper(remaining, copyA, groupB, iterator, max)
    res = res.concat(aResult)

    let copyB = Array.from(groupB)
    copyB.push(dice);
    const bResult = isValidHelper(remaining, groupA, copyB, iterator, max)
    res = res.concat(bResult)
  }

  if (dices.length === 0 && compare(groupA, groupB)) {
    res.push({
      groupA: Array.from(groupA),
      groupB: Array.from(groupB)
    });
  }
  return res;
}

const dirtyFact = (n: number) => {
  let res = 1;
  while (n > 0)
    res *= n--;
  return res;
}

const isValid = (dices: DiceType[]): ResultData[] => {
  const iterator = {
    value: 0
  }
  return isValidHelper(dices, [], [], iterator, dirtyFact(dices.length + 1));
}

export const Resolver = {
  sum,
  isValid
}