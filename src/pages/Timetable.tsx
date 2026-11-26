import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronUp } from "lucide-react"
import type { TimetableJson } from "../types/TimetableJson"

interface TimetableProps {
  id: string
  timetable?: TimetableJson
  now: Date
}

interface FormattedBus {
  id: string
  hour: number
  minute: number
  note: string
  totalMinutes: number
  isPast: boolean
  isNext: boolean
}

export default function Timetable({ id, timetable, now }: TimetableProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const currentHourRowRef = useRef<HTMLDivElement | null>(null)
  const hasScrolledRef = useRef(false)

  const routeData = timetable?.body?.routes?.[id]
  const descriptions = timetable?.body?.metadata?.descriptions ?? []

  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  // 時刻表データのパース、ソート、時間別グルーピング
  const { hourGroups, currentHour } = useMemo(() => {
    const rawList = routeData?.timetable ?? []

    // 1. 各エントリをパース
    const parsed = rawList.map(([timeVal, note], index) => {
      const str = String(timeVal).padStart(4, "0")
      const hour = parseInt(str.slice(0, 2), 10)
      const minute = parseInt(str.slice(2, 4), 10)
      const validHour = isNaN(hour) ? 0 : hour
      const validMinute = isNaN(minute) ? 0 : minute
      return {
        id: `${validHour}-${validMinute}-${note}-${index}`,
        hour: validHour,
        minute: validMinute,
        note: note ? String(note) : "",
        totalMinutes: validHour * 60 + validMinute,
      }
    })

    // 2. 時間順にソート (順番が時間順になっていない可能性があるため整列)
    parsed.sort((a, b) => a.totalMinutes - b.totalMinutes)

    // 3. 現在時刻との比較（過去・現在・未来）
    const nextBus = parsed.find((b) => b.totalMinutes >= nowMinutes)
    const nextBusId = nextBus?.id

    // 4. 時（Hour）ごとのグルーピング (04時から23時までを標準で表示)
    const minHour = parsed.length > 0 ? Math.min(4, ...parsed.map((b) => b.hour)) : 4
    const maxHour = parsed.length > 0 ? Math.max(23, ...parsed.map((b) => b.hour)) : 23

    const groups: { hour: number; buses: FormattedBus[] }[] = []
    for (let h = minHour; h <= maxHour; h++) {
      const busesInHour: FormattedBus[] = parsed
        .filter((b) => b.hour === h)
        .map((b) => ({
          ...b,
          isPast: b.totalMinutes < nowMinutes,
          isNext: b.id === nextBusId,
        }))
      groups.push({ hour: h, buses: busesInHour })
    }

    return {
      hourGroups: groups,
      currentHour: nextBus ? nextBus.hour : Math.floor(nowMinutes / 60),
    }
  }, [routeData?.timetable, nowMinutes])

  // 初回表示時に次便または現在時刻の行へスクロール
  useEffect(() => {
    if (!hasScrolledRef.current && currentHourRowRef.current) {
      currentHourRowRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      hasScrolledRef.current = true
    }
  }, [hourGroups])

  return (
    <div className="flex flex-col w-full h-full border-y-2 border-neutral-300 dark:border-neutral-700 overflow-x-hidden transition-colors duration-500">
      <div className="flex flex-row items-end w-full h-fit px-3 py-3 gap-2 bg-neutral-200 dark:bg-neutral-800 transition-colors duration-500">
        <div className="font-bold text-3xl leading-none">{routeData?.stop ?? id}</div>
        <div className="flex flex-col justify-end gap-1">
          <div className="font-medium text-xs leading-none">{routeData?.line ?? ""}</div>
          <div className="font-medium text-xs leading-none">{routeData?.name ?? ""}</div>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-h-0 w-full overflow-auto">
        {hourGroups.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-neutral-500 text-lg transition-colors duration-500">
            時刻表データがありません
          </div>
        ) : (
          hourGroups.map(({ hour, buses }) => {
            const isTargetHour = hour === currentHour
            return (
              <div
                key={hour}
                ref={isTargetHour ? currentHourRowRef : undefined}
                className="flex flex-row shrink-0 h-auto min-h-16 md:min-h-20 border-b border-neutral-300 dark:border-neutral-800 transition-colors duration-500"
              >
                {/* 時 (Hour) */}
                <div
                  className={`w-16 md:w-20 min-h-16 shrink-0 flex items-center justify-center text-3xl md:text-4xl font-bold select-none tabular-nums transition-colors duration-500 ${hour % 2 === 0
                    ? "bg-sky-100 dark:bg-neutral-600"
                    : "bg-sky-200 dark:bg-neutral-800"
                    }`}
                >
                  {String(hour).padStart(2, "0")}
                </div>

                {/* 分 (Minutes) */}
                <div className="flex-1 grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] items-start content-start justify-start gap-x-2 gap-y-2 px-4 md:px-6 py-2 bg-neutral-100 dark:bg-[#151515] transition-colors duration-500">
                  {buses.map((bus) => (
                    <div
                      key={bus.id}
                      className={`justify-self-start flex flex-row items-baseline px-2 py-1 rounded-xs transition-colors duration-500 select-none ${bus.isNext
                        ? "border-4 border-red-600 text-neutral-900 dark:text-white"
                        : bus.isPast
                          ? "border-4 border-transparent text-neutral-400 dark:text-neutral-500"
                          : "border-4 border-transparent text-neutral-900 dark:text-white"
                        }`}
                    >
                      <span className="text-3xl md:text-4xl font-semibold tabular-nums leading-none">
                        {String(bus.minute).padStart(2, "0")}
                      </span>
                      {bus.note && (
                        <span className="text-base md:text-lg font-normal ml-1 leading-none">
                          {bus.note}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* 注記・備考アコーディオン */}
      <div className="flex flex-col w-full bg-neutral-100 dark:bg-neutral-900 transition-colors duration-500">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex flex-row w-full h-8 px-4 items-center justify-between bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 cursor-pointer select-none transition-colors duration-500"
        >
          <div className="text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors duration-500">
            注記・備考
          </div>
          <ChevronUp className={`w-4 h-4 text-neutral-600 dark:text-neutral-300 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-40" : "max-h-0"}`}>
          <div className="flex flex-col px-2 py-2 gap-1 max-h-40 overflow-y-auto text-xs md:text-sm text-neutral-800 dark:text-neutral-200 transition-colors duration-500">
            {descriptions.length > 0 ? (
              descriptions.map((desc, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="mr-1 text-neutral-500">•</div>
                  <div>{desc}</div>
                </div>
              ))
            ) : (
              <div className="text-neutral-500 text-xs transition-colors duration-500">
                注記はありません
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
