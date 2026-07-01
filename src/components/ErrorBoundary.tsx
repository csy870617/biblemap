import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

// 지도 청크 로드 실패(배포 후 오래된 탭) 등 예기치 못한 렌더링 오류로
// 전체 화면이 하얗게 멈추는 대신, 새로고침을 안내하는 최소한의 복구 화면을 보여줍니다.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('BibleMap error boundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="box">
            <div className="ttl">화면을 불러오는 중 문제가 발생했습니다.</div>
            <p>
              새 버전이 배포되었거나 네트워크가 불안정할 때 발생할 수 있습니다.
              <br />
              새로고침하면 대부분 해결됩니다.
            </p>
            <button className="btn primary" onClick={() => window.location.reload()}>
              새로고침
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
