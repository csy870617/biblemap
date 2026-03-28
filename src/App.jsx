import { useState } from 'react'
import MapView from './components/MapView'
import { formatVerseRef } from './utils/bibleRef'
import './App.css'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)

  return (
    <div className="h-screen flex flex-col bg-stone-100">
      {/* Header */}
      <header className="bg-[#1a2744] px-6 py-3 shrink-0 flex items-center gap-3 shadow-md">
        <span className="text-amber-100 text-2xl">&#x271D;</span>
        <div>
          <h1 className="text-lg font-semibold text-amber-50 tracking-wide">
            Bible Map
          </h1>
          <p className="text-xs text-stone-400">
            성경의 땅을 탐험하세요
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Map - 70% */}
        <div className="w-[70%] shrink-0 h-full">
          <MapView onSelectLocation={setSelectedLocation} />
        </div>

        {/* Sidebar - 30% */}
        <aside className="w-[30%] bg-[#f5f0e8] border-l border-[#d6cebf] overflow-y-auto">
          {selectedLocation ? (
            <div className="p-5">
              {/* Location Name Card */}
              <div className="bg-[#1a2744] rounded-xl p-5 mb-4 shadow-lg">
                <h2 className="text-xl font-bold text-amber-50 mb-1">
                  {selectedLocation.name}
                </h2>
                <p className="text-xs text-stone-400">
                  {selectedLocation.latitude.toFixed(4)}°N, {selectedLocation.longitude.toFixed(4)}°E
                </p>
              </div>

              {/* Description Card */}
              <div className="bg-white/70 rounded-xl p-4 mb-4 shadow-sm border border-[#d6cebf]">
                <h3 className="text-xs font-semibold text-[#1a2744] uppercase tracking-wider mb-2">
                  역사적 배경
                </h3>
                <p className="text-sm text-[#3d3529] leading-relaxed">
                  {selectedLocation.description}
                </p>
              </div>

              {/* Verses Card */}
              <div className="bg-white/70 rounded-xl p-4 shadow-sm border border-[#d6cebf]">
                <h3 className="text-xs font-semibold text-[#1a2744] uppercase tracking-wider mb-3">
                  관련 성경 구절
                </h3>
                <ul className="space-y-3">
                  {selectedLocation.verses.map((verse, index) => (
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
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <span className="text-5xl text-[#1a2744]/20 mb-4">&#x1F5FA;</span>
              <p className="text-sm font-medium text-[#1a2744]/50 mb-1">
                지도에서 마커를 클릭하세요
              </p>
              <p className="text-xs text-[#1a2744]/30">
                해당 지역의 역사와 성경 구절을 확인할 수 있습니다
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export default App
