import emoji from '../../data/word.min.json'

export const parse = (text, lang) => {
  const table = emoji[lang]
  const textKeys = Object.keys(table).sort(
    (pre, cur) => cur.length - pre.length
  )

  const parsed = textKeys.reduce((result, searchedWord) => {
    let index = text.indexOf(searchedWord)
    if (index > -1) {
      do {
        result.push({
          label: searchedWord,
          emojis: table[searchedWord],
          selected: 0,
          index
        })
        const searchedIndex = index + 1
        index = text.indexOf(searchedWord, searchedIndex)
        setTimeout(() => {
          console.log(index, searchedIndex, text, searchedWord)
        }, 0)
      } while (index > -1)
    }
    return result
  }, [])

  setTimeout(() => {
    console.log(parsed)
  }, 0)

  return parsed
}
