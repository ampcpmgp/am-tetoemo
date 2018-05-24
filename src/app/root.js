import { observe } from 'dob'
import axios from 'axios'
import ui from '../state/ui'
import Path from '../const/path'
import droidKun from '../images/droid-kun.png'

export default self => {
  const getApi = async () => {
    try {
      const { data } = await axios.get(Path.TEST)
      self.apiData = JSON.stringify(data)
      self.update()
    } catch (e) {
      console.warn('api error')
    }
  }

  Object.assign(self, {
    title: 'Hello, World',
    droidKun,
    apiData: null,
    getApi,
    clickCount: ui.clickCount
  })

  const signal = observe(() => {
    self.update({
      clickCount: ui.clickCount
    })
  })

  self.on('mount', () => {
    self.getApi()
  })

  self.on('unmount', () => {
    signal.unobserve()
  })
}
