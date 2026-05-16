export default function QuizRules({startFunction, closeFunction}: {startFunction : () => void, closeFunction : () => void}) {
    return (<article className="border-2 border-black bg-white shadow-[4px_4px_0_0,8px_8px_0_0]">
        <div className="bg-yellow-300 p-3">
            <div className="flex items-center justify-between">
                <strong className="text-xs/none font-bold uppercase">Info about the quiz</strong>

                <div className="flex gap-1">
                    <div className="size-3 border-2 border-black bg-white"></div>
                    <div className="size-3 border-2 border-black bg-white"></div>
                </div>
            </div>
        </div>

        <div className="border-t-2 border-black p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-black">Rules</h3>

            <p className="mt-2 text-sm text-pretty">
                I - Each question has 4 answers with a total of 10 questions
            </p>
            <p className="mt-2 text-sm text-pretty">
                II - You have 30 seconds to answer each question
            </p>
            <p className="mt-2 text-sm text-pretty">
                III - Every manual correct answer adds 10 points
            </p>
            <p className="mt-2 text-sm text-pretty">
                IV - Random correct answers adds 5 points
            </p>
            <p className="mt-2 text-sm text-pretty">
                V - You can only do it once per book
            </p>
            <div className="flex justify-around">
                <button onClick={() => { startFunction() }} className="border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                    Start
                </button>
                <button onClick={() => { closeFunction() }} className="border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:outline-0">
                    Return
                </button>
            </div>
        </div>
    </article>)
}