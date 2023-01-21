import { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import { api } from '../lib/axios'

const availbleWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])


  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  async function handleNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert('Novo hábito', 'Informe o nome do  hábito e escolha a recorrência.')
      }

      await api.post('/habits', { title, weekDays })
      setWeekDays([])

      Alert.alert('Novo hábito', 'Hábito criado com sucesso!')
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não foi possível criar um novo hábito')
    }
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <BackButton />

        <Text className='mt-6 text-white font-extrabold text-3xl'>
          Criar hábito
        </Text>

        <Text className='mt-6 text-white font-semibold text-base'>
          Qual o seu comprometimento?
        </Text>

        <TextInput
          className='h-12 pl-4 rounded-lg my-3 mb-6 bg-zinc-900 text-white border-[1px] border-zinc-800 focus:border-green-600'
          placeholder='Pedal diário, estudar violão, meditar...'
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className='my-3 text-white font-semibold text-base'>
          Qual a recorrência?
        </Text>


        {availbleWeekDays.map((weekDay, i) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(i)}
            onPress={() => handleToggleWeekDay(i)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={.7}
          className='w-full h-14 flex flex-row items-center justify-center bg-green-500 rounded-md mt-10'
        >
          <Feather
            name='check'
            size={20}
            color={colors.white}
          />
          <Text className='font-semibold text-base text-white ml-2'>
            Confirmar
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}