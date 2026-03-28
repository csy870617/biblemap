import { useLang } from '../i18n/LangContext'

export default function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <button
      onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
      className="px-2.5 py-1 rounded-md text-xs font-medium border transition-colors bg-parchment-50/10 border-parchment-300/30 text-parchment-200 hover:bg-parchment-50/20"
    >
      {lang === 'ko' ? 'English' : '한국어'}
    </button>
  )
}
