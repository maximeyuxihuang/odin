export enum DiceType {
  Hero,
  Captain,
  Soldier,
  Traitor,
  Damned,
  Mage
}

export const DiceTypeValue = (type: DiceType) => {
  switch (type) {
    case DiceType.Hero:
      return 3;
    case DiceType.Captain:
      return 2;
    case DiceType.Soldier:
      return 1;
    case DiceType.Traitor:
      return 1;
    case DiceType.Damned:
      return -1;
    case DiceType.Mage:
      return 0;
  }
}

export const printDice = (dice: Dice): string => {
  switch(dice.type) {
    case DiceType.Hero: {
      return "HERO"
    }
    case DiceType.Captain: {
      return "CAPTAIN"
    }
    case DiceType.Soldier: {
      return "SOLDIER"
    }
    case DiceType.Traitor: {
      return "TRAITOR"
    }
    case DiceType.Damned: {
      return "DAMNED"
    }
    case DiceType.Mage: {
      return "MAGE"
    }
  }
}