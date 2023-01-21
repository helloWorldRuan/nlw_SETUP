import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'

import { daySize, HabitDay } from '../components/HabitDay'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { api } from '../lib/axios'
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYear = generateRangeDatesFromYearStart()
const minSummaryDatesSize = 18 * 5
const amountDayToFill = minSummaryDatesSize - datesFromYear.length

type SummaryProps = Array<{
  id: string
  date: string
  amount: number
  completed: number
}>


export function Home() {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryProps | null>(null)

  const { navigate } = useNavigation()

  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get('/summary')
      console.log(response.data);
      
      setSummary(response.data)

    } catch (error) {
      Alert.alert('Ops, Não foi possível carregar o sumário de hábitos')

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

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
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {
          summary &&
          <View className='flex-row flex-wrap'>
          {datesFromYear.map(date => {
            const dayWithHabit =  summary.find(day => {
              return dayjs(date).isSame(day.date, 'day')
            })

            return (
              <HabitDay
                key={date.toISOString()}
                date={date}
                amountOfHabits={dayWithHabit?.amount}
                amountCompleted={dayWithHabit?.completed}
                onPress={() => navigate('habit', { date: date.toISOString() })}
              />
          )})}

          {amountDayToFill > 0 && Array
            .from({ length: amountDayToFill })
            .map((_, i) => (
              <View
                key={i}
                className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-50'
                style={{ width: daySize, height: daySize }}
              />
            ))}
        </View>
        }
      </ScrollView>



    </View>
  )
}