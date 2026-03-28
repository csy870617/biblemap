import { useState, useRef, useEffect } from 'react'
import LocationDetail from './LocationDetail'

const SNAP_PEEK = 0.08
const SNAP_HALF = 0.5
const SNAP_FULL = 0.9
const SNAPS = [SNAP_PEEK, SNAP_HALF, SNAP_FULL]

function closest(value, points) {
  return points.reduce((a, b) => (Math.abs(b - value) < Math.abs(a - value) ? b : a))
}

export default function BottomSheet({ location, onClose }) {
  const [snap, setSnap] = useState(SNAP_PEEK)
  const dragRef = useRef(null)
  const sheetRef = useRef(null)

  useEffect(() => {
    if (location) setSnap(SNAP_HALF)
  }, [location])

  const handleDragStart = (e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    dragRef.current = { startY: clientY, startSnap: snap }

    const handleMove = (ev) => {
      const currentY = ev.touches ? ev.touches[0].clientY : ev.clientY
      const delta = dragRef.current.startY - currentY
      const vh = window.innerHeight
      const newSnap = dragRef.current.startSnap + delta / vh
      const clamped = Math.max(SNAP_PEEK, Math.min(SNAP_FULL, newSnap))
      setSnap(clamped)
    }

    const handleEnd = () => {
      setSnap((prev) => {
        const snapped = closest(prev, SNAPS)
        if (snapped <= SNAP_PEEK && prev < SNAP_PEEK + 0.02) {
          onClose()
        }
        return snapped
      })
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
    }

    window.addEventListener('touchmove', handleMove, { passive: true })
    window.addEventListener('touchend', handleEnd)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
  }

  if (!location) return null

  const heightPercent = snap * 100

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 left-0 right-0 bg-parchment-100 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.12)] z-[1000] flex flex-col"
      style={{
        height: `${heightPercent}vh`,
        transition: dragRef.current ? 'none' : 'height 0.3s ease-out',
      }}
    >
      {/* Drag Handle */}
      <div
        className="flex justify-center py-3 cursor-grab active:cursor-grabbing shrink-0"
        onTouchStart={handleDragStart}
        onMouseDown={handleDragStart}
      >
        <div className="w-10 h-1 rounded-full bg-parchment-300" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <LocationDetail location={location} />
      </div>
    </div>
  )
}
