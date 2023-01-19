import { useRoute } from '@react-navigation/native'
import { ScrollView, Text, View } from 'react-native'
import { BackButton } from '../components/BackButton'
import dayjs from 'dayjs'
import { ProgressBar } from '../components/ProgressBar'
import { Checkbox } from '../components/Checkbox'

interface Params {
  date: string
}

export function Habit() {
  const route = useRoute()
  const { date } = route.params as Params

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />

        <Text className='mt-10 text-zinc-400 font-semibold text-xl lowercase'>
          {dayOfWeek}
        </Text>

        <Text className=' text-white font-extrabold text-[80px] lowercase'>
          {dayAndMonth}
        </Text>

        <ProgressBar progress={57} />

        <View className='mt-6'>
          <Checkbox
            title='Beber 2L de água'
            checked={false}
          />

          <Checkbox
            title='Pedalar no parque'
            checked={true}
          />
        </View>

      </ScrollView>
    </View>
  )
}