var assert = require('assert');
const {sum, minus} = require('../demo')

describe('demo tests', function () {
    describe('sum', function () {
        it('should calculate the sum of integers correctly', function () {
            const result = sum(1,1)
            assert.equal(result, 2, '1+1 failed')
        })

        it('should calculate the sum of 5+3', function () {
            assert.equal(sum(5,3), 8, "5+3 failed")
        })
    })
    describe('Minus', function () {
        it('should calculate 1-1 correct', function () {
            assert.equal(minus(1,1), 0, "1-1 failed")
        })
    })
})