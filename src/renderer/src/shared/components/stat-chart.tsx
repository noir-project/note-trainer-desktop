type StatChartProps = {
  level: number
  score: number
  streak: number
  accuracy: number
  currentExp: number
  maxExp: number
}

export const StatChart = ({
  level,
  score,
  streak,
  accuracy,
  currentExp,
  maxExp
}: StatChartProps): React.JSX.Element => {
  const expPercent = Math.min(Math.max((currentExp / maxExp) * 100, 0), 100)
  return (
    <section className="flex flex-col gap-2">
      {/* stats */}
      <div className="grid grid-cols-4 gap-2">
        {/* stat */}
        <div className="border border-gray-300 rounded-lg flex flex-col gap-1 p-2 shadow-inner">
          <p className="text-sm font-normal">level</p>
          <p className="text-base font-semibold">{level}</p>
        </div>
        <div className="border border-gray-300 rounded-lg flex flex-col gap-1 p-2 shadow-inner">
          <p className="text-sm font-normal">score</p>
          <p className="text-base font-semibold">{score}</p>
        </div>
        <div className="border border-gray-300 rounded-lg flex flex-col gap-1 p-2 shadow-inner">
          <p className="text-sm font-normal">streak</p>
          <p className="text-base font-semibold">{streak}</p>
        </div>
        <div className="border border-gray-300 rounded-lg flex flex-col gap-1 p-2 shadow-inner">
          <p className="text-sm font-normal">accuracy</p>
          <p className="text-base font-semibold">{Number(accuracy).toPrecision(3)}</p>
        </div>

        {/* stat */}
      </div>

      {/* exp bar */}
      <div className="mb-2">
        <div className="relative h-[0.6rem] w-full bg-gray-300 rounded-full overflow-hidden ">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-gray-500 to-gray-600 transition-all duration-700 ease-in-out"
            style={{ width: `${expPercent}%` }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-black drop-shadow-[1px_1px_1px_rgba(255,255,255,0.6)]">
              {Math.floor(expPercent)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
