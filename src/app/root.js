import { observe } from 'dob'
import autosize from 'autosize'
import text, * as textAction from '../state/text'

export default self => {
  Object.assign(self, {
    inputValue: text.inputValue,
    result: '',

    onEdit (e) {
      const inputValue = e.currentTarget.value
      const langCode = 'jpn'

      switch (langCode) {
        case 'cmn':
        case 'jpn':
        case 'eng':
        case 'kor':
          textAction.setInputValue(inputValue)
          textAction.setParsedData(langCode)
          textAction.setResult()
          break
        default:
          textAction.setInputValue(inputValue)
          self.result = "not suppoted language. I'm sorry. m(__)m"
      }

      self.update()
    }
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
