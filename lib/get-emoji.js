const puppeteer = require('puppeteer')
const fs = require('fs')

const emojiUrl = 'https://unicode.org/cldr/charts/dev/annotations/cjk.html'

const labels = []
// https://iso639-3.sil.org/code_tables/639/data/all
const convertedLabels = {
  Char: 'char',
  English: 'eng',
  Chinese: 'cmn',
  Japanese: 'jpn',
  Korean: 'kor'
}
const dataForWriting = {
  [convertedLabels.English]: {},
  [convertedLabels.Chinese]: {},
  [convertedLabels.Japanese]: {},
  [convertedLabels.Korean]: {}
}

const allDataForWriting = {}

const wordMinJson = './data/word.min.json'
const wordJson = './data/word.json'
const allJson = './data/all.min.json'

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(emojiUrl)

  const table = (await page.$$('table'))[3]
  const rows = await table.$$('tr')
  const [headerRow, ...dataRows] = rows
  const headers = await headerRow.$$('th')
  for (let header of headers) {
    const label = await (await header.getProperty('textContent')).jsonValue()
    labels.push(label)
  }
  for (let dataRow of dataRows) {
    const data = await dataRow.$$('td')
    let i = 0
    let char = ''
    for (let dataItem of data) {
      const value = await (await dataItem.getProperty(
        'textContent'
      )).jsonValue()
      const label = labels[i]
      const convertedLabel = convertedLabels[label]

      switch (convertedLabel) {
        case convertedLabels.Char:
          char = value
          break
        case convertedLabels.English:
        case convertedLabels.Chinese:
        case convertedLabels.Japanese:
        case convertedLabels.Korean:
          value
            .replace(/^\*/, '')
            .split(/\s*\|\s*/)
            .forEach(word => {
              // 00 = 🕛🕐🕑🕒, 9 = 🕘 のように、数字に時計がマッチするため除去
              if (word.match(/^\d+$/)) return

              let charWords = dataForWriting[convertedLabel][word]

              if (!charWords) {
                charWords = allDataForWriting[word] = dataForWriting[convertedLabel][word] = []
              }

              charWords.push(char)
            })
          break
        default:
        // do nothings
      }

      ++i
    }
  }
  await browser.close()

  fs.writeFileSync(wordMinJson, JSON.stringify(dataForWriting), {
    encoding: 'utf-8'
  })
  fs.writeFileSync(allJson, JSON.stringify(allDataForWriting), {
    encoding: 'utf-8'
  })
  fs.writeFileSync(wordJson, JSON.stringify(dataForWriting, null, '  '), {
    encoding: 'utf-8'
  })
})()
