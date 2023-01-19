import { View, Text, ScrollView } from 'react-native'
import { daySize, HabitDay } from '../components/HabitDay'
import { Header } from '../components/Header'
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYear = generateRangeDatesFromYearStart()
const minSummaryDatesSize = 18 * 5
const amountDayToFill = minSummaryDatesSize - datesFromYear.length

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className='flex-row mt-10 mb-2'>
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay} - ${i}`}
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: daySize }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
      
      >
        <View className='flex-row flex-wrap'>
          {datesFromYear.map(date => (
            <HabitDay
              key={date.toISOString()}
            />

          ))}

          {amountDayToFill > 0 && Array
            .from({ length: amountDayToFill })
            .map((_, i) => (
              <View
                key={i}
                className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                style={{ width: daySize, height: daySize }}
              />
            ))}
        </View>
      </ScrollView>



    </View>
  )
}