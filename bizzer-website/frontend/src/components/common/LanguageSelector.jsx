import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '../../store/slices/languageSlice'

export default function LanguageSelector() {
  const { i18n } = useTranslation()
  const dispatch = useDispatch()
  const { language } = useSelector((state) => state.language)

  const handleLanguageChange = (newLang) => {
    dispatch(setLanguage(newLang))
    i18n.changeLanguage(newLang)
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => handleLanguageChange('es')}
        className={`px-2 py-1 rounded transition-colors ${
          language === 'es'
            ? 'bg-light-accent dark:bg-dark-accent text-white dark:text-dark-bg'
            : 'hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 rounded transition-colors ${
          language === 'en'
            ? 'bg-light-accent dark:bg-dark-accent text-white dark:text-dark-bg'
            : 'hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary'
        }`}
      >
        EN
      </button>
    </div>
  )
}
