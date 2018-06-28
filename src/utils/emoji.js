import emoji from '../../data/all.min.json'

export const parse = (text) => {
  const table = emoji
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
          length: searchedWord.length,
          index
        })
        const searchedIndex = index + 1
        index = text.indexOf(searchedWord, searchedIndex)
      } while (index > -1)
    }
    return result
  }, [])

  return parsed
}
