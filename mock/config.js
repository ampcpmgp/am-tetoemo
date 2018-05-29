import mock from 'am-mocktimes'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as emoji from '../src/utils/emoji'
import Path from '../src/const/path'

const mockAdapter = new MockAdapter(axios, { delayResponse: 500 })
mockAdapter.onGet(Path.TEST).reply(200, {
  successed: true
})

mock({
  emoji
})

require('../src/app') // for hot reload
