import { observable } from 'dob'
import { parse } from '../utils/emoji'

const text = observable({
  inputValue: '',
  parsedData: [],
  result: ''
})

export const setInputValue = value => {
  text.inputValue = value
}

export const setParsedData = lang => {
  text.parsedData = parse(text.inputValue, lang)
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

export default text
