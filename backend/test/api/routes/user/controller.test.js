const http = require('http')
const supertest = require('supertest')

const createServer = require('../../../setupTests')
const mongoose = require('../../../../src/components/mongoose')

const { getUser } = require('../../../../src/api/routes/user/controller')
const jestConfig = require('../../../../jest.config')

let request
let db
let app

// Det är otroligt problematiskt att köra supertest mot vår app som det är nu - på grund av hur yggioConnect
// fungerar så kräver den att man initialiserar och kontaktar Yggios servrar för att regga sig som Service Provider
// för att någon av rutterna ska fungera.Detta gäller även om rutterna inte används i testet.Det blir liksom att varje
// test måste ansluta sig till internet och fixa massa saker innan man ens kan köra någon kod - som i det här fallet ska
// vi bara testa getUser som enbart pratar med vår databas, den måste ändå aktivera allt.

// Sedan är lösningen för att intercepta och lägga in en fejkad session i ../setupTests.js inte särskilt hållbar i längden.
// Bättre att bara köra enhetstester tror jag, där behöver vi bara se till att vara anslutna till databasen.
// Ett alternativ vore kanske att bygga upp någon sorts globalSetup(och teardown) https://jestjs.io/docs/configuration#globalsetup-string
// som startar och gör all config, sen använda Nock https://www.npmjs.com/package/nock för att fejka varenda externt API-anrop

beforeAll(async () => {
  jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn())
  jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn())
  jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn())
  jest.spyOn(global.console, 'info').mockImplementation(() => jest.fn())

  app = http.createServer(await createServer())
  request = supertest(app)
  try {
    // Connect to the database
    db = await mongoose.connect()
  } catch (e) {
    console.error(error)
    process.exit(1)
  }
})

afterAll(async () => {
  await db.disconnect()
  await app.close()
})

describe('[routes/user/controller] - getUser - gets correct user', () => {
  it('shitty end-to-end test', async done => {
    const res = await request.get('/api/user')

    expect(res.body.username).toBe('ak222ye@student.lnu.se')

    done()
  })

  it('unit test', async () => {
    const req = {
      session: {
        user: {
          _id: '6076b42ec054220006cebbff'
        }
      }
    }
    const res = {
      status: function (code) {
        this.code = code
        return this
      },
      json: function (data) {
        this.data = data
        return this
      }
    }

    const user = await getUser(req, res)

    expect(user.code).toBe(200)
    expect(user.data.username).toBe('ak222ye@student.lnu.se')
  })
})

describe('resetApiKey', () => {
  it('test', async done => {
    const res = await request.put('/api/user')
    done()
  })
  it('test', async () => {
    const req = {
      session: {
        user: {
          _id: '6076b42ec054220006cebbff'
        }
      }
    }
    const res = {
      status: function (code) {
        this.code = code
        return this
      },
      send: function (data) {
        this.data = data
        return this
      }
    }
    const user = await resetApiKey(req, res)
    expect(user.code).toBe(200)
  })
})
