import { observable } from 'dob'
import { parse } from '../utils/emoji'

const text = observable({
  inputValue: '',
  result: '',
  data: []
})

export const isNoData = pos => typeof text.data[pos] === 'undefined'

export const setInputValue = value => {
  text.inputValue = value.toLowerCase()
}

export const setData = () => {
  text.data = parse(text.inputValue).map(item => {
    if (item.emojis) item.selected = 0
    return item
  })
}

export const getIndexEmojis = (index) => {
  return text.data.find(parsedItem => parsedItem.index === index)
}

export default text
