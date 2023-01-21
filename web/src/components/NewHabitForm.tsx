import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const avaibleWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!title || weekDays.length == 0) {
      return
    }

    await api.post('habits', {
      title,
      weekDays
    })

    setTitle('')
    setWeekDays([])

    alert("👌 Hábito criado com sucesso!")
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysRemovedOne = weekDays.filter(day => day !== weekDay)

      setWeekDays(weekDaysRemovedOne)

    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay]

      setWeekDays(weekDaysWithAddedOne)
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight ">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex.: Estudar violão, beber água, ler livros..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 transition-all text-white focus:outline-none placeholder:italic focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual sua recorrência?
      </label>

      <div className='mt-3 flex flex-col' >

        {avaibleWeekDays.map((weekDay, i) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className='flex items-center gap-3 border-none outline-none focus:outline-none group relative right-1  p-1'
              checked={weekDays.includes(i)}
              onCheckedChange={() => handleToggleWeekDay(i)}
            >
              <div className=' h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 transition-all duration-100'>
                <Checkbox.Indicator className=''>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className=' text-white leading-tight '>
                {weekDay}
              </span>
            </Checkbox.Root>
          )
        })}

      </div>

      <button
        type="submit"
        className="mt-6 font-semibold outline-none border-none rounded-lg p-4 flex items-center justify-center gap-3 font-regular bg-green-600 hover:bg-green-500 focus:outline-none transition-all duration-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}