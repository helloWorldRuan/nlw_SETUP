import { Plus, X } from 'phosphor-react'
import logoImage from '../assets/habits_logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewHabitForm } from './NewHabitForm'

const Header = () => (

  <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
    <img src={logoImage} alt="habits" />

    <Dialog.Root>
      <Dialog.Trigger
        type='button'
        className='border border-violet-500 font-semibold rounded-lg flex items-center justify-center gap-3 hover:border-violet-300 focus:outline-none' 
        >
        <Plus size={20} className="text-violet-500" />
        Novo Hábito
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0'/>

        <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Dialog.Close className='absolute border-none outline-none right-6 top-6 text-zinc-400 hover:text-zinc-200 focus:outline-none'>
                <X size={24} aria-label="Fechar"/>
            </Dialog.Close>

            <Dialog.Title className='text-3xl leading-tight font-bold'>
                Criar hábito
            </Dialog.Title>

            <NewHabitForm/>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>


  </div>
)

export default Header