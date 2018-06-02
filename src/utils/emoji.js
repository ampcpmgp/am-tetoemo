import emoji from '../../data/all.min.json'

export const parse = (text) => {
  const table = emoji
  const textKeys = Object.keys(table).sort(
    (pre, cur) => cur.length - pre.length
  )
  const strings = [...text]

  const parsed = textKeys.reduce((result, searchedWord) => {
    let index = strings.indexOf(searchedWord)
    if (index > -1) {
      do {
        result.push({
          label: searchedWord,
          emojis: table[searchedWord],
          selected: 0,
          index
        })
        const searchedIndex = index + 1
        index = strings.indexOf(searchedWord, searchedIndex)
      } while (index > -1)
    }
    return result
  }, [])

  return parsed
}
