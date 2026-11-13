export default function Timetable({ id }: { id: string }) {
  return (
    <div className="w-full h-full overflow-hidden">
      <iframe className="w-[125%] h-[125%] origin-top-left scale-80" src={`https://kgi-js-digital-creator.github.io/bus-signage-neo/#/${id}`} />
    </div>
  )
}