import { formatVerseRef } from '../utils/bibleRef'

export default function LocationDetail({ location }) {
  return (
    <div className="p-5">
      {/* Location Name Card */}
      <div className="bg-[#1a2744] rounded-xl p-5 mb-4 shadow-lg">
        <h2 className="text-xl font-bold text-amber-50 mb-1">
          {location.name}
        </h2>
        <p className="text-xs text-stone-400">
          {location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E
        </p>
      </div>

      {/* Description Card */}
      <div className="bg-white/70 rounded-xl p-4 mb-4 shadow-sm border border-[#d6cebf]">
        <h3 className="text-xs font-semibold text-[#1a2744] uppercase tracking-wider mb-2">
          역사적 배경
        </h3>
        <p className="text-sm text-[#3d3529] leading-relaxed">
          {location.description}
        </p>
      </div>

      {/* Verses Card */}
      <div className="bg-white/70 rounded-xl p-4 shadow-sm border border-[#d6cebf]">
        <h3 className="text-xs font-semibold text-[#1a2744] uppercase tracking-wider mb-3">
          관련 성경 구절
        </h3>
        <ul className="space-y-3">
          {location.verses.map((verse, index) => (
            <li
              key={index}
              className="bg-[#f5f0e8] rounded-lg p-3 border-l-3 border-[#1a2744]"
            >
              <span className="block text-xs font-semibold text-[#1a2744] mb-1">
                {formatVerseRef(verse)}
              </span>
              <span className="text-sm text-[#3d3529] leading-relaxed italic">
                "{verse.textKo}"
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
