const { getNestedValue } = require('../../../../src/api/routes/updates/controller')

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
