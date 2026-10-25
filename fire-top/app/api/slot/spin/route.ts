import { NextRequest, NextResponse } from "next/server";
import {
  BET_OPTIONS,
  PAYLINES,
  type SpinResponse,
} from "../../../../lib/slot/confing";
import { spin } from "@/lib/slot/engine";

// ТИМЧАСОВО: баланс у пам'яті сервера. Пізніше переносимо в MongoDB по користувачу.
let balance = 1000;

export async function POST(req: NextRequest) {
  const { betPerLine, lines } = await req.json();
  if (!BET_OPTIONS.includes(betPerLine)) {
    return NextResponse.json({ error: "Невірна ставка" }, { status: 400 });
  }
  if (!Number.isInteger(lines) || lines < 1 || lines > PAYLINES.length) {
    return NextResponse.json(
      { error: "Невірна кількість ліній" },
      { status: 400 },
    );
  }
  const totakBet = betPerLine * lines;
  if (balance < totakBet) {
    return NextResponse.json(
      { error: "Недостатньо кредитів" },
      { status: 400 },
    );
  }
  const result = spin(betPerLine, lines);
  balance = balance - totakBet + result.totalWin;

  const body: SpinResponse = { ...result, balance };
  return NextResponse.json(body);
}
