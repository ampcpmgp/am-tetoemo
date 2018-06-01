import { observe } from 'dob'
import autosize from 'autosize'
import text, * as textAction from '../state/text'

export default self => {
  Object.assign(self, {
    inputValue: text.inputValue,
    strings: [],

    showEmojis (index) {
      return () => {
        console.log(index)
      }
    },

    onEdit (e) {
      const inputValue = e.currentTarget.value

      textAction.setInputValue(inputValue)
      textAction.setParsedData()
      textAction.setResult()

      self.update()
    }
  })

  const signal = observe(() => {
    const { inputValue, result } = text

    self.update({
      inputValue,
      strings: [...result]
    })
  })

  self.on('mount', () => {
    autosize(self.refs.textarea)
  })

  self.on('unmount', () => {
    signal.unobserve()
  })
}
