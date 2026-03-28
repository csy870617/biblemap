import { formatVerseRef } from '../utils/bibleRef'

export default function LocationDetail({ location }) {
  return (
    <div className="p-5 space-y-4">
      {/* Location Name Card */}
      <div className="bg-navy-900 rounded-xl p-5 shadow-lg">
        <h2 className="text-xl font-bold text-parchment-50 mb-1">
          {location.name}
        </h2>
        <p className="text-xs text-parchment-300/70">
          {location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E
        </p>
      </div>

      {/* Description Card */}
      <div className="bg-parchment-50/80 rounded-xl p-4 shadow-sm border border-parchment-200">
        <h3 className="text-xs font-semibold text-navy-800 uppercase tracking-wider mb-2">
          역사적 배경
        </h3>
        <p className="text-sm text-charcoal-700 leading-relaxed">
          {location.description}
        </p>
      </div>

      {/* Verses Card */}
      <div className="bg-parchment-50/80 rounded-xl p-4 shadow-sm border border-parchment-200">
        <h3 className="text-xs font-semibold text-navy-800 uppercase tracking-wider mb-3">
          관련 성경 구절
        </h3>
        <ul className="space-y-3">
          {location.verses.map((verse, index) => (
            <li
              key={index}
              className="bg-warm-100 rounded-lg p-3 border-l-3 border-warm-400"
            >
              <span className="block text-xs font-semibold text-navy-800 mb-1">
                {formatVerseRef(verse)}
              </span>
              <span className="text-sm text-charcoal-700 leading-relaxed italic">
                &ldquo;{verse.textKo}&rdquo;
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
