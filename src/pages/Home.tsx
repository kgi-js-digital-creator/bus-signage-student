interface HomeProps {
  onSelectTimetable?: (id: string) => void
  isLoading?: boolean
}

export default function Home({ onSelectTimetable, isLoading = false }: HomeProps) {
  return (
    <div className="flex flex-col w-full md:max-w-164 p-4 gap-3 my-auto items-center transition-colors duration-500">
      <div className="flex flex-col w-full pb-4 items-center">
        <p className="text-4xl font-medium">バス時刻表ビューア</p>
        <p className="text-2xl leading-tight">Bus timetable viewer</p>
      </div>
      <div className="flex flex-col w-full items-start">
        <p className="text-lg md:text-3xl leading-4">表示したい時刻表を選択してください</p>
        <p className="text-sm md:text-xl">Please select the timetable you wish to view</p>
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="w-full bg-[#4788ff] border-3 border-[#4788ff] rounded-md">
          <p className="px-1 text-base md:text-2xl text-neutral-50">スクールバス</p>
          <div className="flex flex-col w-full bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelectTimetable?.("jr-hachioji")}
              className="w-full p-1 pl-2 text-start text-2xl bg-sky-100 dark:bg-neutral-900 cursor-pointer enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-500"
            >
              JR八王子駅南口行
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelectTimetable?.("keio-hachioji")}
              className="w-full p-1 pl-2 text-start text-2xl bg-neutral-50 dark:bg-neutral-800 cursor-pointer enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-500"
            >
              京王八王子行
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelectTimetable?.("minamiosawa")}
              className="w-full p-1 pl-2 text-start text-2xl bg-sky-100 dark:bg-neutral-900 cursor-pointer enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-500"
            >
              南大沢行
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelectTimetable?.("haijima")}
              className="w-full p-1 pl-2 text-start text-2xl bg-neutral-50 dark:bg-neutral-800 cursor-pointer enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-500"
            >
              拝島行
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full bg-[#ff6347] border-3 border-[#ff6347] rounded-md">
          <p className="px-1 text-base md:text-2xl text-neutral-50">公共バス</p>
          <div className="flex flex-col w-full bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelectTimetable?.("k01-k02")}
              className="flex flex-row items-center w-full p-1 pl-2 text-start text-2xl bg-sky-100 dark:bg-neutral-900 cursor-pointer enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-500"
            >
              <p>中野市民センター</p>
              <div className="flex flex-col pl-2 justify-center">
                <p className="text-[0.5rem] leading-tight">工01・工02</p>
                <p className="text-xs leading-tight">JR・京王八王子駅行</p>
              </div>
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelectTimetable?.("nh")}
              className="flex flex-row items-center w-full p-1 pl-2 text-start text-2xl bg-neutral-50 dark:bg-neutral-800 cursor-pointer enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-500"
            >
              <p>中野市民センター</p>
              <div className="flex flex-col pl-2 justify-center">
                <p className="text-[0.5rem] leading-tight">北部コース</p>
                <p className="text-xs leading-tight">西八王子駅行</p>
              </div>
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelectTimetable?.("a21")}
              className="flex flex-row items-center w-full p-1 pl-2 text-start text-2xl bg-sky-100 dark:bg-neutral-900 cursor-pointer enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-500"
            >
              <p>中野団地</p>
              <div className="flex flex-col pl-2 justify-center">
                <p className="text-[0.5rem] leading-tight">暁21</p>
                <p className="text-xs leading-tight">JR・京王八王子駅行</p>
              </div>
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelectTimetable?.("s04")}
              className="flex flex-row items-center w-full p-1 pl-2 text-start text-2xl bg-neutral-50 dark:bg-neutral-800 cursor-pointer enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-500"
            >
              <p>中野団地</p>
              <div className="flex flex-col pl-2 justify-center">
                <p className="text-[0.5rem] leading-tight">市04</p>
                <p className="text-xs leading-tight">{"<市役所経由>西八王子駅行"}</p>
              </div>
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelectTimetable?.("k02")}
              className="flex flex-row items-center w-full p-1 pl-2 text-start text-2xl bg-sky-100 dark:bg-neutral-900 cursor-pointer enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-500"
            >
              <p>工学院大学</p>
              <div className="flex flex-col pl-2 justify-center">
                <p className="text-[0.5rem] leading-tight">工02</p>
                <p className="text-xs leading-tight">JR・京王八王子駅行</p>
              </div>
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelectTimetable?.("t03")}
              className="flex flex-row items-center w-full p-1 pl-2 text-start text-2xl bg-neutral-50 dark:bg-neutral-800 cursor-pointer enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-500"
            >
              <p>工学院大学</p>
              <div className="flex flex-col pl-2 justify-center">
                <p className="text-[0.5rem] leading-tight">高月03</p>
                <p className="text-xs leading-tight">拝島駅行</p>
              </div>
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => onSelectTimetable?.("k01-h")}
              className="flex flex-row items-center w-full p-1 pl-2 text-start text-2xl bg-sky-100 dark:bg-neutral-900 cursor-pointer enabled:hover:bg-neutral-300 dark:enabled:hover:bg-neutral-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-500"
            >
              <p>工学院大学</p>
              <div className="flex flex-col pl-2 justify-center">
                <p className="text-[0.5rem] leading-tight">工01</p>
                <p className="text-xs leading-tight">JR・京王八王子駅行</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}