import { observe, Action } from 'dob'
import autosize from 'autosize'
import route from 'riot-route'
import ClipboardJS from 'clipboard'
import text, * as textAction from '../state/text'
import sleep from '../utils/sleep'

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
    },

    selectEmoji (e) {
      const dataIndex = e.currentTarget.dataset.index
      const emojiIndex = e.currentTarget.value

      textAction.selectEmoji(dataIndex, emojiIndex)
    },

    async copy () {
      self.refs.button.textContent = 'Copied!'
      await sleep(1000)
      self.refs.button.textContent = 'Copy Emoji'
    },

    textAction
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
    const clipboard = new ClipboardJS(self.refs.button)
    clipboard.on('success', () => {})
  })

  self.on('unmount', () => {
    signal.unobserve()
  })
}
