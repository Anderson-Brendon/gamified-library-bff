//botão pra ser reutilizado na interação da adicao/remoção da lista de leitura e favoritos

export default function ToggleButton({ onListText, outOfListText, clickHandler, isOnList }: { clickHandler: () => void, isOnList: boolean, onListText : string, outOfListText: string }) {
    return (
    <button onClick={clickHandler} className={`relative border-black px-5 py-3 font-semibold text-black after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-black hover:text-white hover:after:h-full focus:ring-2 focus:ring-yellow-300 focus:outline-0`}>
        <span className="relative z-10">{isOnList ? onListText : outOfListText}</span>
    </button>)
}