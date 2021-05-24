const http = require('http')
const supertest = require('supertest')

const createServer = require('../../../setupTests')
const mongoose = require('../../../../src/components/mongoose')

const fakeDevices = require('../../../fixtures/testDevices.json')

const { getNestedValue, receiveData } = require('../../../../src/api/routes/updates/controller')

let db

beforeAll(async () => {
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
  // await app.close()
})

it('should correctly parse nested values', () => {
  const nestedObject = {
    a: {
      b: {
        c: 25
      }
    }
  }
  const paths = ['a', 'b', 'c']

  const result = getNestedValue(nestedObject, paths)

  expect(result).toBe(25)
})

// it('unit test', async () => {
//   const req = {
//     body: {
//       payload: {
//         iotnode: fakeDevices[0]
//       }
//     }
//   }
//   const res = {
//     status: function (code) {
//       this.code = code
//       return this
//     },
//     json: function (data) {
//       this.data = data
//       return this
//     }
//   }

//   const user = await getUser(req, res)

//   expect(user.code).toBe(200)
//   expect(user.data.username).toBe('ak222ye@student.lnu.se')
// })
