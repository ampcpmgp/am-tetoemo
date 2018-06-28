import { observable } from 'dob'
import {flatten} from 'lodash'
import { parse } from '../utils/emoji'

const text = observable({
  inputValue: '',
  parsedData: [],
  result: '',
  data: []
})

export const isNoData = pos => typeof text.data[pos] === 'undefined'

export const setCharacters = () => {
  text.data = [{label: text.inputValue}]

  text.parsedData.forEach(parsedDataItem => {
    text.data = text.data.reduce((pre, cur) => {
      if (cur.emojis) {
        pre.push(cur)
        return pre
      }

      let splitedData = cur.label
        .split(parsedDataItem.label)
        .reduce((pre, cur) => pre.push(cur, parsedDataItem) && pre, [])
      splitedData = splitedData
        .filter((_, i) => _ && i !== (splitedData.length - 1))
        .map(item => (typeof item === 'string') ? {label: item} : item)

      pre.push(splitedData)
      return pre
    }, [])

    text.data = flatten(text.data)
  })
}

export const setInputValue = value => {
  text.inputValue = value.toLowerCase()
}

export const setParsedData = () => {
  text.parsedData = parse(text.inputValue)
}

export const setResult = () => {
  text.result = text.parsedData.reduce((inputValue, parsedItem) => {
    const replacedValue = inputValue.replace(
      parsedItem.label,
      parsedItem.emojis[parsedItem.selected]
    )
    return replacedValue
  }, text.inputValue)
}

export const getIndexEmojis = (index) => {
  return text.parsedData.find(parsedItem => parsedItem.index === index)
}

export default text
