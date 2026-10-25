export type Sym =
  | "cherry"
  | "plum"
  | "melon"
  | "bell"
  | "star"
  | "bar"
  | "seven";
export const SYMBOLS: Sym[] = [
  "cherry",
  "plum",
  "melon",
  "bell",
  "star",
  "bar",
  "seven",
];

export const NAMES: Record<Sym, string> = {
  cherry: "Вишня",
  plum: "Слива",
  melon: "Кавун",
  bell: "Дзвін",
  star: "Зірка",
  bar: "BAR",
  seven: "Сімка",
};

// Вага: скільки разів символ потрапляє в випадковий вибір
export const WEIGHTS: Record<Sym, number> = {
  cherry: 6,
  plum: 5,
  melon: 5,
  bell: 4,
  star: 3,
  bar: 2,
  seven: 1,
};
// Множник ставки на лінію за 3 однакові символи
export const PAY: Record<Sym, number> = {
  cherry: 12,
  plum: 20,
  melon: 25,
  bell: 40,
  star: 60,
  bar: 130,
  seven: 250,
};
// Дві вишні на перших двох барабанах
export const TWO_CHERRY_PAY = 4;

// Рядок (0 верх, 1 середина, 2 низ) на кожному з 3 барабанів
export const PAYLINES: number[][] = [
  [1, 1, 1],
  [0, 0, 0],
  [2, 2, 2],
  [0, 1, 2],
  [2, 1, 0],
  [0, 1, 0],
  [2, 1, 2],
  [1, 0, 1],
  [1, 2, 1],
];

export const BET_OPTIONS = [1, 2, 3, 5, 10, 20, 50];

export type Win = { line: number; symbol: Sym; count: number; payout: number };

export type SpinResponse = {
  grid: Sym[][]; // grid[барабан][рядок]
  wins: Win[];
  totalWin: number;
  balance: number;
};
