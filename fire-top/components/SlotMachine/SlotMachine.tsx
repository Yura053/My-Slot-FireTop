"use client";

import { useState } from "react";
import {
  BET_OPTIONS,
  PAYLINES,
  SYMBOLS,
  type Sym,
  type SpinResponse,
} from "@/lib/slot/config";
import SlotSymbol from "./Symbol";
import styles from "./SlotMachine.module.css";

const START_GRID: Sym[][] = [
  ["cherry", "bell", "star"],
  ["plum", "bar", "seven"],
  ["melon", "cherry", "bell"],
];

// Порядок номерів ліній ліворуч, як у Fire Rage
const LINE_ORDER = [4, 2, 6, 8, 1, 9, 7, 3, 5];
const MAX_LINES = PAYLINES.length;

function randomSym(): Sym {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function randomReel(): Sym[] {
  return [randomSym(), randomSym(), randomSym()];
}

function cx(...parts: Array<string | false>): string {
  return parts.filter(Boolean).join(" ");
}

export default function SlotMachine() {
  const [grid, setGrid] = useState<Sym[][]>(START_GRID);
  const [balance, setBalance] = useState<number>(1000);
  const [betIdx, setBetIdx] = useState<number>(0);
  const [lines, setLines] = useState<number>(MAX_LINES);
  const [win, setWin] = useState<number>(0);
  const [busy, setBusy] = useState<boolean>(false);
  const [spinning, setSpinning] = useState<boolean[]>([false, false, false]);
  const [winCells, setWinCells] = useState<string[]>([]);
  const [winLines, setWinLines] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("Зробіть вашу ставку");

  const bet = BET_OPTIONS[betIdx];

  function setReel(reel: number, symbols: Sym[]) {
    setGrid(function (prev) {
      const next = prev.slice();
      next[reel] = symbols;
      return next;
    });
  }

  function setSpinFlag(reel: number, value: boolean) {
    setSpinning(function (prev) {
      const next = prev.slice();
      next[reel] = value;
      return next;
    });
  }

  function changeLines(delta: number) {
    setLines(function (prev) {
      return Math.min(MAX_LINES, Math.max(1, prev + delta));
    });
  }

  function changeBet(delta: number) {
    setBetIdx(function (prev) {
      return Math.min(BET_OPTIONS.length - 1, Math.max(0, prev + delta));
    });
  }

  function showResult(result: SpinResponse) {
    const cells: string[] = [];
    result.wins.forEach(function (w) {
      for (let reel = 0; reel < w.count; reel++) {
        cells.push(reel + "-" + PAYLINES[w.line][reel]);
      }
    });
    setWinCells(cells);
    setWinLines(
      result.wins.map(function (w) {
        return w.line;
      }),
    );
    setBalance(result.balance);
    setWin(result.totalWin);
    setMessage(
      result.totalWin > 0
        ? "Виграш " + result.totalWin + ", ліній: " + result.wins.length
        : "Гра закінчена, зробіть вашу ставку",
    );
    setBusy(false);
  }

  async function handleSpin() {
    if (busy) return;

    setBusy(true);
    setWin(0);
    setWinCells([]);
    setWinLines([]);
    setMessage("Крутимо...");
    setSpinning([true, true, true]);

    const timers: ReturnType<typeof setInterval>[] = [];
    for (let r = 0; r < 3; r++) {
      timers.push(
        setInterval(function () {
          setReel(r, randomReel());
        }, 70),
      );
    }

    function stopAll() {
      timers.forEach(function (t) {
        clearInterval(t);
      });
    }

    try {
      const res = await fetch("/api/slot/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ betPerLine: bet, lines: lines }),
      });
      const data = await res.json();

      if (!res.ok) {
        stopAll();
        setSpinning([false, false, false]);
        setMessage(data.error ?? "Помилка. Спробуйте ще раз.");
        setBusy(false);
        return;
      }

      const result = data as SpinResponse;

      for (let r = 0; r < 3; r++) {
        setTimeout(
          function () {
            clearInterval(timers[r]);
            setReel(r, result.grid[r]);
            setSpinFlag(r, false);
            if (r === 2) showResult(result);
          },
          500 + r * 350,
        );
      }
    } catch {
      stopAll();
      setSpinning([false, false, false]);
      setMessage("Немає зв'язку з сервером");
      setBusy(false);
    }
  }

  return (
    <div className={styles.machine}>
      <div className={styles.header}>
        <b>Relax fire</b>
        <span>Демо, віртуальні кредити</span>
      </div>

      <div className={styles.play}>
        <div className={styles.lines}>
          {LINE_ORDER.map(function (n) {
            return (
              <div
                key={n}
                className={cx(
                  styles.lineNum,
                  n > lines && styles.off,
                  winLines.includes(n - 1) && styles.on,
                )}
              >
                {n}
              </div>
            );
          })}
        </div>

        <div className={styles.reels}>
          {grid.map(function (col, r) {
            return (
              <div key={r} className={styles.reel}>
                {col.map(function (sym, k) {
                  return (
                    <div
                      key={k}
                      className={cx(
                        styles.cell,
                        spinning[r] && styles.spin,
                        winCells.includes(r + "-" + k) && styles.win,
                      )}
                    >
                      <SlotSymbol name={sym} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.box}>
          <small>Кредит</small>
          <span>{balance}</span>
        </div>
        <div className={styles.box}>
          <small>Виграш</small>
          <span>{win}</span>
        </div>
        <div className={styles.box}>
          <small>Ставка</small>
          <span>{bet * lines}</span>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.selector}>
          Лінії
          <button
            type="button"
            aria-label="Менше ліній"
            disabled={busy}
            onClick={function () {
              changeLines(-1);
            }}
          >
            -
          </button>
          <b>{lines}</b>
          <button
            type="button"
            aria-label="Більше ліній"
            disabled={busy}
            onClick={function () {
              changeLines(1);
            }}
          >
            +
          </button>
        </div>

        <div className={styles.selector}>
          На лінію
          <button
            type="button"
            aria-label="Менша ставка"
            disabled={busy}
            onClick={function () {
              changeBet(-1);
            }}
          >
            -
          </button>
          <b>{bet}</b>
          <button
            type="button"
            aria-label="Більша ставка"
            disabled={busy}
            onClick={function () {
              changeBet(1);
            }}
          >
            +
          </button>
        </div>

        <button
          type="button"
          className={styles.spinBtn}
          disabled={busy}
          onClick={handleSpin}
        >
          Старт
        </button>
      </div>

      <p className={styles.message}>{message}</p>
    </div>
  );
}
