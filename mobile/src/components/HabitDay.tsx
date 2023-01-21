import clsx from 'clsx'
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from 'react-native'

import { generateProgressPercentage } from '../utils/generate-progress.percentage'

const weekDays = 7
const screenHorizontalPadding = (32 * 2) / 5

export const dayMarginBetween = 8
export const daySize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5)

interface Props extends TouchableOpacityProps {
    amountOfHabits?: number
    amountCompleted?: number
    date: Date
}

export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...rest }: Props) {

    const completedPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0
    return (
        <TouchableOpacity
            className={clsx('bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800', {
                'bg-zinc-900 border-zinc-800': completedPercentage == 0,
                'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
                'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
                'bg-violet-700 border-violet-600': completedPercentage >= 40 && completedPercentage < 60,
                'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
                'bg-violet-500 border-violet-400': completedPercentage >= 80
            })}
            style={{ width: daySize, height: daySize }}
            activeOpacity={.7}
            {...rest}
        >
        </TouchableOpacity>

    )
}