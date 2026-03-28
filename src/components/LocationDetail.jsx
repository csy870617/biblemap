import { formatVerseRef } from '../utils/bibleRef'
import { useLang } from '../i18n/LangContext'

export default function LocationDetail({ location }) {
  const { lang, t } = useLang()
  const name = location[`name_${lang}`] || location.name_ko
  const desc = location[`desc_${lang}`] || location.desc_ko

  return (
    <div className="p-5 space-y-4">
      {/* Location Name Card */}
      <div className="bg-navy-900 rounded-xl p-5 shadow-lg">
        <h2 className="text-xl font-bold text-parchment-50 mb-1">
          {name}
        </h2>
        <p className="text-xs text-parchment-300/70">
          {location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E
        </p>
      </div>

      {/* Description Card */}
      <div className="bg-parchment-50/80 rounded-xl p-4 shadow-sm border border-parchment-200">
        <h3 className="text-xs font-semibold text-navy-800 uppercase tracking-wider mb-2">
          {t('historicalBg')}
        </h3>
        <p className="text-sm text-charcoal-700 leading-relaxed">
          {desc}
        </p>
      </div>

      {/* Verses Card */}
      <div className="bg-parchment-50/80 rounded-xl p-4 shadow-sm border border-parchment-200">
        <h3 className="text-xs font-semibold text-navy-800 uppercase tracking-wider mb-3">
          {t('relatedVerses')}
        </h3>
        <ul className="space-y-3">
          {location.verses.map((verse, index) => {
            const text = verse[`text${lang === 'ko' ? 'Ko' : 'En'}`] || verse.textKo
            return (
              <li
                key={index}
                className="bg-warm-100 rounded-lg p-3 border-l-3 border-warm-400"
              >
                <span className="block text-xs font-semibold text-navy-800 mb-1">
                  {formatVerseRef(verse, lang)}
                </span>
                <span className="text-sm text-charcoal-700 leading-relaxed italic">
                  &ldquo;{text}&rdquo;
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
