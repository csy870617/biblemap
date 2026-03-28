import routes from '../data/routes.json'
import { useLang } from '../i18n/LangContext'

export default function RouteSelector({ activeRouteId, onSelectRoute }) {
  const { lang, t } = useLang()

  return (
    <div className="p-4 border-b border-parchment-200 bg-parchment-100 rounded-xl lg:rounded-none shadow-lg lg:shadow-none">
      <h3 className="text-xs font-semibold text-navy-800 uppercase tracking-wider mb-3">
        {t('journeys')}
      </h3>
      <div className="space-y-2">
        {routes.map((route) => {
          const isActive = activeRouteId === route.id
          const name = route[`name_${lang}`] || route.name_ko
          const desc = route[`desc_${lang}`] || route.desc_ko
          return (
            <button
              key={route.id}
              onClick={() => onSelectRoute(isActive ? null : route.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-navy-900 text-parchment-50'
                  : 'bg-parchment-50/80 text-charcoal-700 hover:bg-parchment-200'
              }`}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0 border-2"
                style={{
                  backgroundColor: isActive ? route.color : 'transparent',
                  borderColor: route.color,
                }}
              />
              <div className="min-w-0">
                <span className="block text-sm font-medium truncate">
                  {name}
                </span>
                {isActive && (
                  <span className="block text-xs text-parchment-300 mt-0.5">
                    {desc}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
