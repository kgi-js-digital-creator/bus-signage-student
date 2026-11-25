import { AlertTriangle, RotateCw } from "lucide-react"

interface NotUpdatedProps {
  updateDate?: string
}

export default function NotUpdated({ updateDate }: NotUpdatedProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center max-w-lg my-auto gap-5 transition-colors duration-500">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
        <AlertTriangle className="w-10 h-10" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50">
          時刻表が更新されていません
        </h1>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
          本日の時刻表データが配信されていないか、更新されていません。
        </p>
      </div>

      {updateDate && (
        <div className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-medium">
          データ更新日: <span className="font-semibold">{updateDate}</span>
        </div>
      )}

      <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
        時刻表は毎日午前4時頃に更新されます。午前4時以降にアクセスしてください。
      </p>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 font-medium cursor-pointer transition-colors duration-300"
      >
        <RotateCw className="w-4 h-4" />
        再読み込み
      </button>
    </div>
  )
}
