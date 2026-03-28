import { useState } from 'react'
import MapView from './components/MapView'
import './App.css'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null)

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-gray-800 text-white px-4 py-3 shrink-0">
        <h1 className="text-xl font-bold">Bible Map</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <MapView onSelectLocation={setSelectedLocation} />
        </div>

        <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-4 shrink-0">
          {selectedLocation ? (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {selectedLocation.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {selectedLocation.description}
              </p>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                관련 성경 구절
              </h3>
              <ul className="space-y-2">
                {selectedLocation.verses.map((verse, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 bg-gray-50 rounded p-2"
                  >
                    {verse}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              마커를 클릭하여 지역 정보를 확인하세요.
            </p>
          )}
        </aside>
      </div>
    </div>
  )
}

export default App
