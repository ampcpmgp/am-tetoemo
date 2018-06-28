import {flatten} from 'lodash'
import emoji from '../../data/all.min.json'

export const parse = (text) => {
  const table = emoji
  const textKeys = Object.keys(table).sort(
    (pre, cur) => cur.length - pre.length
  )

  const parsed = textKeys.reduce((result, searchedWord) => {
    let index = text.indexOf(searchedWord)
    if (index > -1) {
      result.push({
        label: searchedWord,
        emojis: table[searchedWord]
      })
    }
    return result
  }, [])

  let result = [{label: text}]

  parsed.forEach(dataItem => {
    result = result.reduce((pre, cur) => {
      if (cur.emojis) {
        pre.push(cur)
        return pre
      }

      let splitedData = cur.label
        .split(dataItem.label)
        .reduce((pre, cur) => pre.push(cur, dataItem) && pre, [])
      splitedData = splitedData
        .filter((_, i) => _ && i !== (splitedData.length - 1))
        .map(item => (typeof item === 'string') ? {label: item} : item)

      pre.push(splitedData)
      return pre
    }, [])

    result = flatten(result)
  })

  return result
}
