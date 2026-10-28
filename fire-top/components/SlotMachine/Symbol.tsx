import Image from "next/image";
import { NAMES, type Sym } from "@/lib/slot/config";

export default function SlotSymbol({ name }: { name: Sym }) {
  return (
    <Image
      src={`/symbols/${name}.png`}
      alt={NAMES[name]}
      width={256}
      height={256}
      priority
      draggable={false}
    />
  );
}
