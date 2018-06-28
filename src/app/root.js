import { observe, Action } from 'dob'
import autosize from 'autosize'
import route from 'riot-route'
import text, * as textAction from '../state/text'

export default self => {
  const updateText = (text) => Action(() => {
    textAction.setInputValue(text)
    textAction.setData()

    self.update()
  })

  Object.assign(self, {
    inputValue: text.inputValue,
    data: [],

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
    const { inputValue, data } = text

    self.update({
      inputValue,
      data
    })
  })

  self.on('mount', () => {
    autosize(self.refs.textarea)
  })

  self.on('unmount', () => {
    signal.unobserve()
  })
}
