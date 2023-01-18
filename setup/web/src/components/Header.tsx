import {Plus} from 'phosphor-react'
import logoImage from '../assets/habits_logo.svg'

const Header = () => (

    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
        <img src={logoImage} alt="habits" />

        <button
            type='button'
            className='border border-violet-500 font-semibold rounded-lg flex items-center justify-center gap-3 hover:border-violet-300'
        >
            <Plus size={20} className="text-violet-500" />
            Novo Hábito
        </button>
    </div>
)

export default Header