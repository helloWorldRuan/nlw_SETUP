import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import dayjs from 'dayjs'
import { prisma } from './lib/prisma'

export async function appRoutes(app: FastifyInstance) {

  // Criar hábito  
  app.post('/habits', async (req) => {
  const createHabitBody = z.object({
    title: z.string(),
    weekDays: z.array(z.number().min(0).max(6))
  })

  const { title, weekDays } = createHabitBody.parse(req.body)

  const today = dayjs().startOf('day').toDate()

  await prisma.habit.create({
    data: {
    title,
    createdDate: today,
    weekDays: {
      create: weekDays.map(weekDay => {
      return {
        week_day: weekDay,
      }
      })
    }
    }
  })
  })

  // Retorna dias com o mesmo hábito
  app.get('/day', async (req) => {
  const getDayParams = z.object({
    date: z.coerce.date()
  })

  const { date } = getDayParams.parse(req.query)

  const parsedDate = dayjs(date).startOf('day')
  const weekDay = parsedDate.get('day')

  const possibleHabits = await prisma.habit.findMany({
    where: {
    createdDate: {
      lte: date,
    },
    weekDays: {
      some: {
      week_day: weekDay
      }
    }
    }
  })

  const day = await prisma.day.findUnique({
    where: {
    date: parsedDate.toDate(),
    },
    include: {
    dayHabits: true,
    }
  })

  const completeHabits = day?.dayHabits.map(dayHabit => {
    return dayHabit.habit_id
  })

  return {
    possibleHabits,
    completeHabits,
  }
  })

  // Completed-Incompleted habit check
  app.patch('/habits/:id/toggle', async (req) => {
  const toggleHabitParam = z.object({
    id: z.string().uuid()
  })

  const { id } = toggleHabitParam.parse(req.params)

  const today = dayjs().startOf('day').toDate()

  let day = await prisma.day.findUnique({
    where: {
    date: today
    }
  })

  if (!day) {
    day = await prisma.day.create({
    data: {
      date: today
    }
    })
  }

  const dayHabit = await prisma.dayHabit.findUnique({
    where: {
    day_id_habit_id: {
      day_id: day.id,
      habit_id: id
    }
    }
  })

  if (dayHabit) {
    await prisma.dayHabit.delete({
    where: {
      id: dayHabit.id
    }
    })
  } else {
    await prisma.dayHabit.create({
    data: {
      day_id: day.id,
      habit_id: id
    }
    })
  }
  })

  // Listar resumo de hábitos completos
  app.get('/summary', async () => {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HDW
          JOIN habits H
            ON H.id = HDW.habit_id
          WHERE
            HDW.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `

    return summary
  })
}

