"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const MAX_COUNT = 108;

export default function Home() {
  const [count, setCount] = useState(0);

  const isFinished = count >= MAX_COUNT;
  const isMilestone = !isFinished && count !== 0 && count % 10 === 0;
  const remaining = Math.max(MAX_COUNT - count, 0);
  const modeLabel = isMilestone ? "太陽礼拝B" : "太陽礼拝A";

  const counterClasses = useMemo(
    () => {
      const classes = [
        "mt-6 text-7xl font-black tracking-tight transition-colors duration-300",
        isMilestone ? "text-amber-500 drop-shadow-lg" : "text-slate-900",
      ];

      if (count === 100) {
        classes.push("bg-yellow-300 text-yellow-800 font-bold");
      }

      if (count === 107) {
        classes.push("bg-red-300 text-red-800 font-bold");
      }

      return classes.join(" ");
    },
    [count, isMilestone],
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-stone-100 px-6 py-10 font-sans text-slate-900">
      <div className="absolute right-6 top-6 text-right text-xs uppercase tracking-widest text-slate-500">
        <p className="text-[10px]">Progress</p>
        <p className="text-lg font-bold text-slate-800">
          残り：{remaining} / {MAX_COUNT}
        </p>
      </div>

      <main className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center gap-12 text-center">
        {isFinished ? (
          <div className="flex w-full flex-col items-center gap-8 rounded-3xl bg-white/90 px-8 py-14 shadow-xl backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
              Complete
            </p>
            <h1 className="text-3xl font-bold leading-tight text-slate-900">
              108回 完走おめでとうございます！
            </h1>
            <p className="text-5xl" aria-label="拍手">
              👏👏👏
            </p>
            <div className="relative h-60 w-60">
              <Image
                src="/highfive.png"
                alt="ハイタッチするイラスト"
                fill
                sizes="240px"
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full flex-col items-center gap-4 rounded-3xl bg-white/90 px-10 py-12 shadow-xl backdrop-blur">
              <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
                現在のカウント
              </p>
              <p className={counterClasses}>{count}</p>
              <p
                className={`text-2xl font-semibold ${
                  isMilestone ? "text-amber-500" : "text-slate-700"
                }`}
              >
                {modeLabel}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setCount((prev) => Math.min(prev + 1, MAX_COUNT))
              }
              disabled={isFinished}
              className="w-full max-w-xs rounded-full bg-amber-500 px-10 py-4 text-2xl font-bold text-white shadow-lg transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              +1
            </button>
          </>
        )}
      </main>
    </div>
  );
}
