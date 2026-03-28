import routes from '../data/routes.json'
import { useLang } from '../i18n/LangContext'

const GROUPS = [
  { key: 'oldTestament', label_ko: '구약', label_en: 'Old Testament' },
  { key: 'paul', label_ko: '사도 바울', label_en: 'Apostle Paul' },
]

export default function RouteSelector({ activeRouteIds, onToggleRoute }) {
  const { lang, t } = useLang()

  return (
    <div className="p-4 border-b border-parchment-200 bg-parchment-100 rounded-xl lg:rounded-none shadow-lg lg:shadow-none">
      <h3 className="text-xs font-semibold text-navy-800 uppercase tracking-wider mb-3">
        {t('journeys')}
      </h3>
      <div className="space-y-4">
        {GROUPS.map((group) => {
          const groupRoutes = routes.filter((r) => r.group === group.key)
          if (groupRoutes.length === 0) return null
          return (
            <div key={group.key}>
              <p className="text-[10px] font-semibold text-charcoal-600/50 uppercase tracking-wider mb-1.5">
                {group[`label_${lang}`] || group.label_ko}
              </p>
              <div className="space-y-1.5">
                {groupRoutes.map((route) => {
                  const isActive = activeRouteIds.has(route.id)
                  const name = route[`name_${lang}`] || route.name_ko
                  return (
                    <button
                      key={route.id}
                      onClick={() => onToggleRoute(route.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                        isActive
                          ? 'bg-navy-900 text-parchment-50'
                          : 'bg-parchment-50/80 text-charcoal-700 hover:bg-parchment-200'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded shrink-0 border-2 flex items-center justify-center text-[8px] font-bold"
                        style={{
                          backgroundColor: isActive ? route.color : 'transparent',
                          borderColor: route.color,
                          color: isActive ? '#fff' : 'transparent',
                        }}
                      >
                        {isActive ? '✓' : ''}
                      </span>
                      <span
                        className="w-5 h-0.5 shrink-0 rounded-full"
                        style={{ backgroundColor: route.color }}
                      />
                      <span className="text-sm font-medium truncate">
                        {name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
