import 'babel-polyfill'
import riot from 'riot'
import route from 'riot-route'
import 'normalize.css'
import './main.css'
import './app/root.tag'

riot.mount('app-root')
route.exec()
