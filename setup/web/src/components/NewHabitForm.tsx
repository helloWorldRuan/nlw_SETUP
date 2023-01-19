import { Check } from "phosphor-react";

export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight ">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex.: Estudar violão, beber água, ler livros..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white focus:outline-none placeholder:italic"
        autoFocus
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual sua recorrência?
      </label>

      <button type="submit" className="mt-6 outline-none border-none rounded-lg p-4 flex items-center justify-center gap-3  font-regular bg-green-600 hover:bg-green-500 focus:outline-none">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}