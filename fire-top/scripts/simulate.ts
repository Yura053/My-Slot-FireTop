import { spin } from "../lib/slot/engine";

const SPINS = 1_000_000;
const BET = 1;
const LINES = 9;

let won = 0;
for (let i = 0; i < SPINS; i++) won += spin(BET, LINES).totalWin;
const rtp = (won / (SPINS * BET * LINES)) * 100;
console.log(`Спінів: ${SPINS}, RTP: ${rtp.toFixed(2)}%`);
