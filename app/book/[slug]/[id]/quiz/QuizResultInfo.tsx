import { QuizResult } from "@/app/type-definitions/quiz";

export function QuizResultInfo({ result, closeFunction }: { result: QuizResult, closeFunction: () => void }) {

  const completedAt = new Date(result.completedAt);

  return (<>
    <div className="group/card relative">
      <span className="absolute inset-0 border-2 border-dashed bg-white"></span>

      <a href="#" className="group/link relative flex h-72 flex-col justify-start border-2 border-black bg-white p-4 group-hover/card:-translate-2 after:absolute hover:bg-yellow-100 focus:ring-2 focus:ring-yellow-300 focus:outline-0 sm:p-6">
        <span className="inline-flex items-center gap-1.5 justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M4 1.75a.75.75 0 0 1 1.5 0V3h5V1.75a.75.75 0 0 1 1.5 0V3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2V1.75ZM4.5 6a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-7Z" clipRule="evenodd"></path>
          </svg>

          <time dateTime="2025-04-01" className=" font-semibold uppercase">
            Quiz completed at: {completedAt.toLocaleString()}
          </time>
        </span>

        <h3 className="mt-5 text-xl font-semibold">
          Your quiz results
        </h3>

        <li className="mt-5">
          <ul>Total points: {result.points}</ul>
          <ul>Manual answers: {"nada por enquanto"}</ul>
          <ul>Random answers: {result.randomAnswers}</ul>
          <ul>Correct answers: {result.correctAnswers}</ul>
        </li>
      </a>
    </div>
    <button onClick={closeFunction} className="border-2 border-black bg-white px-5 py-3 font-semibold text-black shadow-[4px_4px_0_0] shadow-black hover:translate-1 hover:shadow-none focus:ring-2 focus:ring-yellow-300 focus:outline-0">
      Close
    </button>
  </>)
}