import { observe } from 'dob'
import autosize from 'autosize'
import franc from 'franc'
import { parse } from '../utils/emoji'

export default self => {
  Object.assign(self, {
    text: null,

    onEdit (e) {
      const text = e.currentTarget.value
      const langCode = franc(
        Array.from({ length: 10 })
          .map(() => text)
          .join(' ')
      )

      switch (langCode) {
        case 'cmn':
          break
        case 'jpn':
          self.text = parse(text, langCode)
          break
        case 'eng':
          break
        case 'kor':
          break
        default:
          self.text = "not suppoted language. I'm sorry. m(__)m"
      }

      self.update()
    }
  })

  const signal = observe(() => {})

  self.on('mount', () => {
    autosize(self.refs.textarea)
  })

  self.on('unmount', () => {
    signal.unobserve()
  })
}
