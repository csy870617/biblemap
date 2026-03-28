import { useState } from 'react'
import MapView from './components/MapView'
import LocationDetail from './components/LocationDetail'
import BottomSheet from './components/BottomSheet'
import RouteSelector from './components/RouteSelector'
import LangToggle from './components/LangToggle'
import { useLang } from './i18n/LangContext'
import './App.css'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [activeRouteId, setActiveRouteId] = useState(null)
  const { t } = useLang()

  return (
    <div className="h-screen flex flex-col bg-parchment-50">
      {/* Header */}
      <header className="bg-navy-900 px-6 py-3 shrink-0 flex items-center gap-3 shadow-md z-10">
        <span className="text-warm-400 text-2xl">&#x271D;</span>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-parchment-100 tracking-wide">
            {t('appTitle')}
          </h1>
          <p className="text-xs text-parchment-300 hidden sm:block">
            {t('appSubtitle')}
          </p>
        </div>
        <LangToggle />
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Map */}
        <div className="w-full lg:w-[70%] shrink-0 h-full">
          <MapView
            onSelectLocation={setSelectedLocation}
            activeRouteId={activeRouteId}
          />
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-[30%] bg-parchment-100 border-l border-parchment-300 overflow-y-auto">
          <RouteSelector
            activeRouteId={activeRouteId}
            onSelectRoute={setActiveRouteId}
          />
          {selectedLocation ? (
            <LocationDetail location={selectedLocation} />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <span className="text-5xl text-navy-800/15 mb-4">&#x1F5FA;</span>
              <p className="text-sm font-medium text-charcoal-600/60 mb-1">
                {t('emptyTitle')}
              </p>
              <p className="text-xs text-charcoal-600/40">
                {t('emptyDesc')}
              </p>
            </div>
          )}
        </aside>

        {/* Mobile Bottom Sheet */}
        <div className="lg:hidden">
          <div className="fixed top-16 right-3 z-[1000]">
            <MobileRouteSelector
              activeRouteId={activeRouteId}
              onSelectRoute={setActiveRouteId}
            />
          </div>
          <BottomSheet
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
          />
        </div>
      </div>
    </div>
  )
}

function MobileRouteSelector({ activeRouteId, onSelectRoute }) {
  const [open, setOpen] = useState(false)
  const { t } = useLang()

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-navy-900 text-parchment-50 px-3 py-2 rounded-lg shadow-lg text-xs font-medium"
      >
        &#x1F6A9; {t('viewJourneys')}
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 w-56">
          <RouteSelector
            activeRouteId={activeRouteId}
            onSelectRoute={(id) => {
              onSelectRoute(id)
              setOpen(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default App
