import { observe, Action } from 'dob'
import autosize from 'autosize'
import route from 'riot-route'
import text, * as textAction from '../state/text'

export default self => {
  const updateText = (text) => Action(() => {
    textAction.setInputValue(text)
    textAction.setParsedData()
    textAction.setResult()

    self.update()
  })

  Object.assign(self, {
    inputValue: text.inputValue,
    strings: [],

    onEdit (e) {
      const inputValue = e.currentTarget.value

      updateText(inputValue)
    }
  })

  route('/text/*', (encodedText) => {
    const decodedText = window.decodeURIComponent(encodedText)

    updateText(decodedText)
  })

  const signal = observe(() => {
    const { inputValue, result } = text

    self.update({
      inputValue,
      result
    })
  })

  self.on('mount', () => {
    autosize(self.refs.textarea)
  })

  self.on('unmount', () => {
    signal.unobserve()
  })
}
