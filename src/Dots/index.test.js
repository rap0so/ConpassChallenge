import setDots from './index'

describe('setDots fn', () => {
    it('returns a function', () => {
        expect(typeof setDots).toEqual('function') 
    })
    it('shouldnt return errors', () => {
        expect(() => setDots()).not.toThrow() 
    })
})