import { useState } from 'react'
import MapView from './components/MapView'
import LocationDetail from './components/LocationDetail'
import BottomSheet from './components/BottomSheet'
import './App.css'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)

  return (
    <div className="h-screen flex flex-col bg-parchment-50">
      {/* Header */}
      <header className="bg-navy-900 px-6 py-3 shrink-0 flex items-center gap-3 shadow-md z-10">
        <span className="text-warm-400 text-2xl">&#x271D;</span>
        <div>
          <h1 className="text-lg font-semibold text-parchment-100 tracking-wide">
            Bible Map
          </h1>
          <p className="text-xs text-parchment-300 hidden sm:block">
            성경의 땅을 탐험하세요
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Map */}
        <div className="w-full lg:w-[70%] shrink-0 h-full">
          <MapView onSelectLocation={setSelectedLocation} />
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-[30%] bg-parchment-100 border-l border-parchment-300 overflow-y-auto">
          {selectedLocation ? (
            <LocationDetail location={selectedLocation} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <span className="text-5xl text-navy-800/15 mb-4">&#x1F5FA;</span>
              <p className="text-sm font-medium text-charcoal-600/60 mb-1">
                지도에서 마커를 클릭하세요
              </p>
              <p className="text-xs text-charcoal-600/40">
                해당 지역의 역사와 성경 구절을 확인할 수 있습니다
              </p>
            </div>
          )}
        </aside>

        {/* Mobile Bottom Sheet */}
        <div className="lg:hidden">
          <BottomSheet
            location={selectedLocation}
            onClose={() => setSelectedLocation(null)}
          />
        </div>
      </div>
    </div>
  )
}

export default App
