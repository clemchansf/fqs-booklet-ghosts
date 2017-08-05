const getLocale = () => {
   return (navigator.languages && navigator.languages[0])
          || navigator.language
          || navigator.userLanguage
          || 'en-US'
}

export default getLocale
