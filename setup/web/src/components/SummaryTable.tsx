import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minSummaryDatesSize = 18 * 7
const amountDayToFill = minSummaryDatesSize - summaryDates.length

const SummaryTable = () => {
  return (
    <div className="w-full flex overflow-x-auto">
      <div className="grid grid-rows-7 grid-flow-row gap-3 ">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={`${weekDay} - ${i}`}
              className="text-zinc-400 text-xl h-10 w-10 font-regular flex items-center justify-center"
            >
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => {
          return (
            <HabitDay
              key={date.toString()}
              amount={5}
              completed={Math.round(Math.random() * 5)}
            />
          )
        })}

        {amountDayToFill > 0 && Array.from({ length: amountDayToFill }).map((_, i) => {
          return (
            <div
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40"
            />
          )
        })}
      </div>
    </div>
  )
}

export default SummaryTable