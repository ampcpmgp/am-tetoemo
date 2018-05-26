import 'babel-polyfill'
import riot from 'riot'
import 'normalize.css'
import './main.css'
import './app/root.tag'

riot.mount('app-root')

var franc = require('franc')

console.log(franc('Alle menslike wesens word vry')) // => 'afr'
console.log(franc('এটি একটি ভাষা একক IBM স্ক্রিপ্ট')) // => 'ben'
console.log(franc('Alle menneske er fødde til fridom')) // => 'nno'
console.log(franc('')) // => 'und'
console.log(franc('the')) // => 'und'

/* You can change what’s too short (default: 10): */
console.log(franc('the', { minLength: 3 })) // => 'sco'
console.log(franc('こんにちは、私はkerasです。hello world!', { minLength: 1 })) // => 'sco'

console.log(12)
