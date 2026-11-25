import { useEffect, useState } from "react";

import { ChevronLeft, Moon, Sun } from 'lucide-react'
import { useTheme } from './hooks/useTheme'
import Home from "./pages/Home";
import Timetable from "./pages/Timetable";

export default function App() {
  const { isDark, toggleTheme } = useTheme()
  const [selectedTimetableId, setSelectedTimetableId] = useState<string | null>(null)
  const [timetableData, setTimetableData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [now, setNow] = useState(() => new Date());

  const isHome = selectedTimetableId === null

  useEffect(() => {
    let isMounted = true;
    async function fetchTimetable() {
      try {
        const response = await fetch(
          "https://kgi-js-digital-creator.github.io/bus-timetable-database/timetable.json",
          { cache: "no-cache" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setTimetableData(data);
        }
      } catch (error) {
        console.error("時刻表データの取得に失敗しました:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchTimetable();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    function updateNow() {
      const currentTime = new Date();
      setNow(currentTime);
      timerId = setTimeout(updateNow, 1000 - (currentTime.getMilliseconds()));
    }
    updateNow();
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className="flex flex-col select-none w-full h-full text-neutral-950 dark:text-neutral-50 bg-white dark:bg-black whitespace-nowrap transition-colors duration-500">
      <header className="flex flex-row w-full h-16 px-4 items-center justify-between bg-neutral-200 dark:bg-neutral-800 transition-colors duration-500">
        <button type="button" onClick={() => setSelectedTimetableId(null)} aria-label="戻る" className={`${isHome ? 'invisible' : ''} text-5xl border-2 border-neutral-300 dark:border-neutral-600 p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-300 dark:hover:bg-neutral-600 cursor-pointer transition-colors duration-500`}>
          <ChevronLeft />
        </button>
        <button type="button" onClick={toggleTheme} aria-label={isDark ? 'ライトモードに切り替える' : 'ダークモードに切り替える'} title={isDark ? 'ライトモードに切り替える' : 'ダークモードに切り替える'} className="relative flex items-center justify-between w-16 h-8 p-2 rounded-full border-2 border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 cursor-pointer transition-colors duration-500">
          <Sun className="w-4 h-4" />
          <Moon className="w-4 h-4" />
          <span className={`absolute flex left-0.5 w-6 h-6 items-center justify-center rounded-full bg-white dark:bg-neutral-600 shadow-md transition-transform duration-200 ease-in-out ${isDark ? 'translate-x-8' : 'translate-x-0'}`}>
            {isDark ? (
              <Moon className="w-4 h-4 text-yellow-400" />
            ) : (
              <Sun className="w-4 h-4 text-orange-500" />
            )}
          </span>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-semibold tabular-nums text-neutral-800 dark:text-neutral-200 transition-colors duration-500">
          {
            Intl.DateTimeFormat("ja-JP", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }).format(now)
          }
        </div>
      </header>
      <main className="flex flex-1 min-h-0 w-full justify-center bg-neutral-50 dark:bg-neutral-950 overflow-y-auto transition-colors duration-500">
        {selectedTimetableId ? (
          <Timetable id={selectedTimetableId} timetable={timetableData} now={now} />
        ) : (
          <Home
            onSelectTimetable={(id) => setSelectedTimetableId(id)}
            isLoading={isLoading}
          />
        )}
      </main>
      <footer className="flex flex-row w-full h-8 px-2 items-center bg-neutral-200 dark:bg-neutral-800 transition-colors duration-500">
        <div className="w-full text-end text-xs md:text-base transition-colors duration-500">※注意 この時刻表は正確でないことがあります。</div>
      </footer>
    </div>
  )
}