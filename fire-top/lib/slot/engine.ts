import { randomInt } from "node:crypto";
import {
  PAY,
  PAYLINES,
  SYMBOLS,
  TWO_CHERRY_PAY,
  WEIGHTS,
  type Sym,
  type Win,
} from "./config";

const POOL: Sym[] = SYMBOLS.flatMap((s) => Array<Sym>(WEIGHTS[s]).fill(s));

const pick = (): Sym => POOL[randomInt(POOL.length)];

export function spin(betPerLine: number, lines: number) {
  const grid: Sym[][] = Array.from({ length: 3 }, () => [
    pick(),
    pick(),
    pick(),
  ]);
  const wins: Win[] = [];

  for (let li = 0; li < lines; li++) {
    const rows = PAYLINES[li];
    const s = [grid[0][rows[0]], grid[1][rows[1]], grid[2][rows[2]]];

    if (s[0] === s[1] && s[1] === s[2]) {
      wins.push({
        line: li,
        symbol: s[0],
        count: 3,
        payout: PAY[s[0]] * betPerLine,
      });
    } else if (s[0] === "cherry" && s[1] === "cherry") {
      wins.push({
        line: li,
        symbol: "cherry",
        count: 2,
        payout: TWO_CHERRY_PAY * betPerLine,
      });
    }
  }
  const totalWin = wins.reduce((sum, w) => sum + w.payout, 0);
  return { grid, wins, totalWin };
}
