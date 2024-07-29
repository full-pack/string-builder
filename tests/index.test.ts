import { StringBuilder } from '../src/index'
import type { Replacer } from '../src/index'

describe('StringBuilder', () => {
    test('constructor', () => {
        const empty = new StringBuilder()
        const conWithString = new StringBuilder('abc')
        const stringWithCap = new StringBuilder('abcd', 4)
        const capTrimmed = new StringBuilder('abcd', 3)

        expect(empty.getString()).toBe('')
        expect(empty.capacity).toBe(-1)
        expect(empty).toHaveLength(0)

        expect(conWithString.getString()).toBe('abc')
        expect(conWithString.capacity).toBe(-1)
        expect(conWithString).toHaveLength(3)

        expect(stringWithCap.getString()).toBe('abcd')
        expect(stringWithCap.capacity).toBe(4)
        expect(stringWithCap).toHaveLength(4)

        expect(capTrimmed).toHaveLength(3)
        expect(capTrimmed.capacity).toBe(3)
        expect(capTrimmed.getString()).toBe('abc')

        expect(new StringBuilder('abcd', Infinity).capacity).toBe(-1)
    })

    test('length:property', () => {
        const strBuilder = new StringBuilder('abc')
        expect(strBuilder).toHaveLength(3)
        strBuilder.length = Infinity
        expect(strBuilder).toHaveLength(3)
        strBuilder.length = 0
        expect(strBuilder).toHaveLength(0)
        expect(strBuilder.getString()).toBe('')
    })

    test('capacity:property', () => {
        const strBuilder = new StringBuilder('abc')
        expect(strBuilder.capacity).toBe(-1)
        strBuilder.capacity = Infinity
        expect(strBuilder.capacity).toBe(-1)
        strBuilder.capacity = 2
        expect(strBuilder.capacity).toBe(2)
        expect(strBuilder.getString()).toBe('ab')
    })

    describe('setString', () => {
        const strBuilder = new StringBuilder()
        test('Without Capacity', () => {
            expect(strBuilder.setString('hello')).toBeTruthy()
            expect(strBuilder.getString()).toBe('hello')
            expect(strBuilder.setString('352')).toBeTruthy()
            expect(strBuilder.getString()).toBe('352')
        })
        test('With Capacity', () => {
            strBuilder.capacity = 3
            expect(strBuilder.getString()).toBe('352')
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.setString('abcd')).toBeFalsy()
            expect(strBuilder.getString()).toBe('352')
        })
    })

    test('reset', () => {
        const sb = new StringBuilder('abc', 4)
        expect(sb.getString()).toBe('abc')
        expect(sb.capacity).toBe(4)

        sb.reset()

        expect(sb.capacity).toBe(-1)
        expect(sb.getString()).toBe('')
    })

    test('trim', () => {
        const sb = new StringBuilder('      abc  ')
        sb.trim()
        expect(sb.getString()).toBe('abc')
        expect(sb).toHaveLength(3)
    })

    test('substring', () => {
        const sb = new StringBuilder('My favorite language is Python')
        expect(sb.substring(3)).toBe('favorite language is Python')
    })

    test('setChar', () => {
        const sb = new StringBuilder('2 = 4')
        expect(sb.setChar(2, ':')).toBe('=')
        expect(sb.getString()).toBe('2 : 4')
        expect(sb.setChar(2, '=>')).toBe('')
        expect(sb.getString()).toBe('2 : 4')
    })
    test('indexOf', () => {
        const sb = new StringBuilder('2244')
        expect(sb.indexOf('4')).toBe(2)
    })
    test('lastIndexOf', () => {
        const sb = new StringBuilder('2244')
        expect(sb.lastIndexOf('2')).toBe(1)
    })

    test('clear', () => {
        const sb = new StringBuilder('abc', 4)
        expect(sb.getString()).toBe('abc')
        expect(sb.capacity).toBe(4)

        sb.clear()

        expect(sb.capacity).toBe(4)
        expect(sb.getString()).toBe('')
    })

    test('clone', () => {
        const sb = new StringBuilder('abc', 4)
        expect(sb.getString()).toBe('abc')
        expect(sb.capacity).toBe(4)

        const cloned = sb.clone()
        cloned.capacity = 10
        cloned.append('de')

        expect(sb.getString()).toBe('abc')
        expect(sb.capacity).toBe(4)

        expect(cloned.getString()).toBe('abcde')
        expect(cloned.capacity).toBe(10)
    })

    describe('insert', () => {
        const strBuilder = new StringBuilder('123')
        test('Without Capacity', () => {
            expect(strBuilder.insert(1, 4)).toBeTruthy()
            expect(strBuilder.getString()).toBe('1423')
            expect(strBuilder.insert(3, 5, 2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('142553')
        })
        test('With Capacity', () => {
            strBuilder.capacity = 10
            expect(strBuilder.insert(0, true)).toBeTruthy()
            expect(strBuilder.getString()).toBe('true142553')
            expect(strBuilder.insert(0, true)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('true142553')
        })
        test('Invalid Index', () => {
            expect(() => strBuilder.insert(-1, 20)).toThrow(RangeError)
            expect(() => strBuilder.insert(Infinity, 'Hello')).toThrow(RangeError)
        })
    })

    describe('append', () => {
        const strBuilder = new StringBuilder('123')
        test('Without Capacity', () => {
            expect(strBuilder.append(4, 4)).toBeTruthy()
            expect(strBuilder.getString()).toBe('1234444')
            expect(strBuilder.append(true)).toBeTruthy()
            expect(strBuilder.getString()).toBe('1234444true')
        })
        test('With Capacity', () => {
            strBuilder.capacity = 12
            expect(strBuilder.append('2')).toBeTruthy()
            expect(strBuilder.getString()).toBe('1234444true2')
            expect(strBuilder.append('full')).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('1234444true2')
        })
    })

    describe('prepend', () => {
        const strBuilder = new StringBuilder('123')
        test('Without Capacity', () => {
            expect(strBuilder.prepend(0, 4)).toBeTruthy()
            expect(strBuilder.getString()).toBe('0000123')
            expect(strBuilder.prepend(true)).toBeTruthy()
            expect(strBuilder.getString()).toBe('true0000123')
        })
        test('With Capacity', () => {
            strBuilder.capacity = 12
            expect(strBuilder.prepend(2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('2true0000123')
            expect(strBuilder.prepend('full')).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('2true0000123')
        })
    })

    describe('appendNewLine', () => {
        const strBuilder = new StringBuilder('123')
        test('Without Capacity', () => {
            expect(strBuilder.appendNewLine()).toBeTruthy()
            expect(strBuilder.getString()).toBe('123\n')
            expect(strBuilder).toHaveLength(4)
            expect(strBuilder.appendNewLine(2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('123\n\n\n')
            expect(strBuilder).toHaveLength(6)
        })
        test('With Capacity', () => {
            strBuilder.capacity = 7
            expect(strBuilder.appendNewLine()).toBeTruthy()
            expect(strBuilder.getString()).toBe('123\n\n\n\n')
            expect(strBuilder.appendNewLine()).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('123\n\n\n\n')
        })
    })

    describe('prependNewLine', () => {
        const strBuilder = new StringBuilder('123')
        test('Without Capacity', () => {
            expect(strBuilder.prependNewLine()).toBeTruthy()
            expect(strBuilder.getString()).toBe('\n123')
            expect(strBuilder).toHaveLength(4)
            expect(strBuilder.prependNewLine(2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('\n\n\n123')
            expect(strBuilder).toHaveLength(6)
        })
        test('With Capacity', () => {
            strBuilder.capacity = 7
            expect(strBuilder.prependNewLine()).toBeTruthy()
            expect(strBuilder.getString()).toBe('\n\n\n\n123')
            expect(strBuilder.prependNewLine()).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('\n\n\n\n123')
        })
    })

    describe('appendSpace', () => {
        const strBuilder = new StringBuilder('123')
        test('Without Capacity', () => {
            expect(strBuilder.appendSpace()).toBeTruthy()
            expect(strBuilder.getString()).toBe('123 ')
            expect(strBuilder).toHaveLength(4)
            expect(strBuilder.appendSpace(2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('123   ')
            expect(strBuilder).toHaveLength(6)
        })
        test('With Capacity', () => {
            strBuilder.capacity = 7
            expect(strBuilder.appendSpace()).toBeTruthy()
            expect(strBuilder.getString()).toBe('123    ')
            expect(strBuilder.appendSpace()).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('123    ')
        })
    })

    describe('prependSpace', () => {
        const strBuilder = new StringBuilder('123')
        test('Without Capacity', () => {
            expect(strBuilder.prependSpace()).toBeTruthy()
            expect(strBuilder.getString()).toBe(' 123')
            expect(strBuilder).toHaveLength(4)
            expect(strBuilder.prependSpace(2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('   123')
            expect(strBuilder).toHaveLength(6)
        })
        test('With Capacity', () => {
            strBuilder.capacity = 7
            expect(strBuilder.prependSpace()).toBeTruthy()
            expect(strBuilder.getString()).toBe('    123')
            expect(strBuilder.prependSpace()).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('    123')
        })
    })

    describe('appendArray', () => {
        const strBuilder = new StringBuilder('')
        test('Without Capacity', () => {
            expect(strBuilder.appendArray([], '-')).toBeTruthy()
            expect(strBuilder.getString()).toBe('')
            expect(strBuilder).toHaveLength(0)
            expect(strBuilder.appendArray([true, false], ',')).toBeTruthy()
            expect(strBuilder.getString()).toBe('true,false')
            expect(strBuilder).toHaveLength(10)
        })
        test('With Capacity', () => {
            strBuilder.capacity = 12
            expect(strBuilder.appendArray([1, 2])).toBeTruthy()
            expect(strBuilder.getString()).toBe('true,false12')
            expect(strBuilder.appendArray(['h', 'i'])).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('true,false12')
        })
    })

    describe('prependArray', () => {
        const strBuilder = new StringBuilder('')
        test('Without Capacity', () => {
            expect(strBuilder.prependArray([], '-')).toBeTruthy()
            expect(strBuilder.getString()).toBe('')
            expect(strBuilder).toHaveLength(0)
            expect(strBuilder.prependArray([true, false], ',')).toBeTruthy()
            expect(strBuilder.getString()).toBe('true,false')
            expect(strBuilder).toHaveLength(10)
        })
        test('With Capacity', () => {
            strBuilder.capacity = 12
            expect(strBuilder.prependArray([1, 2])).toBeTruthy()
            expect(strBuilder.getString()).toBe('12true,false')
            expect(strBuilder.prependArray(['h', 'i'])).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('12true,false')
        })
    })

    describe('appendJSON', () => {
        const strBuilder = new StringBuilder('')
        test('Without Capacity', () => {
            expect(strBuilder.appendJSON({})).toBeTruthy()
            expect(strBuilder.getString()).toBe('{}')
            expect(strBuilder).toHaveLength(2)
            expect(strBuilder.appendJSON({ 1: 1, 2: 4, 3: 9 }, 2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('{}{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}')
            expect(strBuilder).toHaveLength(34)
        })
        test('With Capacity', () => {
            strBuilder.capacity = 36
            expect(strBuilder.appendJSON({}, '')).toBeTruthy()
            expect(strBuilder.getString()).toBe('{}{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}{}')
            expect(strBuilder.appendJSON([{}, {}])).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('{}{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}{}')
        })
    })

    describe('prependJSON', () => {
        const strBuilder = new StringBuilder('')
        test('Without Capacity', () => {
            expect(strBuilder.prependJSON({})).toBeTruthy()
            expect(strBuilder.getString()).toBe('{}')
            expect(strBuilder).toHaveLength(2)
            expect(strBuilder.prependJSON({ 1: 1, 2: 4, 3: 9 }, 2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}{}')
            expect(strBuilder).toHaveLength(34)
        })
        test('With Capacity', () => {
            strBuilder.capacity = 36
            expect(strBuilder.prependJSON({}, '')).toBeTruthy()
            expect(strBuilder.getString()).toBe('{}{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}{}')
            expect(strBuilder.prependJSON([{}, {}])).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('{}{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}{}')
        })
    })

    describe('appendCodePoint', () => {
        const strBuilder = new StringBuilder('')
        test('Without Capacity', () => {
            expect(strBuilder.appendCodePoint()).toBeTruthy()
            expect(strBuilder.getString()).toBe('')
            expect(strBuilder).toHaveLength(0)
            expect(strBuilder.appendCodePoint(72, 73, 33)).toBeTruthy()
            expect(strBuilder.getString()).toBe('HI!')
            expect(strBuilder).toHaveLength(3)
        })
        test('With Capacity', () => {
            strBuilder.capacity = 6
            expect(strBuilder.appendCodePoint(32, 59, 41)).toBeTruthy()
            expect(strBuilder.getString()).toBe('HI! ;)')
            expect(strBuilder.appendCodePoint(40)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('HI! ;)')
        })
    })

    describe('prependCodePoint', () => {
        const strBuilder = new StringBuilder('')
        test('Without Capacity', () => {
            expect(strBuilder.prependCodePoint()).toBeTruthy()
            expect(strBuilder.getString()).toBe('')
            expect(strBuilder).toHaveLength(0)
            expect(strBuilder.prependCodePoint(72, 73, 33)).toBeTruthy()
            expect(strBuilder.getString()).toBe('HI!')
            expect(strBuilder).toHaveLength(3)
        })
        test('With Capacity', () => {
            strBuilder.capacity = 6
            expect(strBuilder.prependCodePoint(59, 41, 32)).toBeTruthy()
            expect(strBuilder.getString()).toBe(';) HI!')
            expect(strBuilder.prependCodePoint(40)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe(';) HI!')
        })
    })

    describe('replaceSubstring', () => {
        describe('Normal String', () => {
            test('Edge Case - replace whole string', () => {
                const strBuilder = new StringBuilder('dogs', 4)
                expect(strBuilder.replaceSubstring('cats')).toBeTruthy()
                expect(strBuilder.getString()).toBe('cats')

                expect(strBuilder.replaceSubstring('parrots')).toBeFalsy()
                expect(strBuilder.getString()).toBe('cats')
            })
            test('Without Capacity', () => {
                const strBuilder = new StringBuilder('I love dogs')
                expect(strBuilder.replaceSubstring('cats', 7)).toBeTruthy()
                expect(strBuilder.getString()).toBe('I love cats')
                expect(strBuilder.replaceSubstring('They', undefined, 1)).toBeTruthy()
                expect(strBuilder.getString()).toBe('They love cats')
            })
            test('With Capacity', () => {
                const strBuilder = new StringBuilder('I love dogs', 11)
                expect(strBuilder.replaceSubstring('rabbits', 7)).toBeFalsy()
                expect(strBuilder).toHaveLength(strBuilder.capacity)
                expect(strBuilder.getString()).toBe('I love dogs')
            })
        })

        describe('Replacer', () => {
            test('Edge Case - replace whole string', () => {
                const strBuilder = new StringBuilder('I love dogs')
                const customReplacer: Replacer = (chr: string, _index: number): string => {
                    return chr.toUpperCase()
                }
                expect(strBuilder.replaceSubstring(customReplacer)).toBeTruthy()
                expect(strBuilder.getString()).toBe('I LOVE DOGS')
            })
            test('Without Capacity', () => {
                const strBuilder = new StringBuilder('I love dogs')
                const customReplacer: Replacer = (chr: string, _index: number): string => {
                    return chr.toUpperCase()
                }
                expect(strBuilder.replaceSubstring(customReplacer, 7)).toBeTruthy()
                expect(strBuilder.getString()).toBe('I love DOGS')
            })
            test('With Capacity', () => {
                const strBuilder = new StringBuilder('I love dogs', 15)
                const customReplacer: Replacer = (chr: string, _index: number): string => {
                    return chr.toLowerCase() + chr.toUpperCase()
                }
                expect(strBuilder.replaceSubstring(customReplacer, 7)).toBeTruthy()
                expect(strBuilder.getString()).toBe('I love dDoOgGsS')
            })
        })
    })
})
