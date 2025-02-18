import { StringBuilder } from '../src/index'
import type { Replacer } from '../src/index'

describe('StringBuilder', () => {
    const VALUE_0 = 0
    const VALUE_1 = 1
    const VALUE_2 = 2
    const VALUE_3 = 3
    const VALUE_4 = 4
    // const VALUE_5 = 5
    const VALUE_6 = 6
    const VALUE_7 = 7
    // const VALUE_8 = 8
    const VALUE_9 = 9
    const VALUE_10 = 10

    test('constructor', () => {
        const DEFAULT_CAPACITY = -1
        const SPECIFIED_CAPACITY = VALUE_4
        const TRIMMED_CAPACITY = VALUE_3
        const INFINITE_CAPACITY = Infinity

        const EMPTY_STRING = ''
        const STRING_ABC = 'abc'
        const STRING_ABCD = 'abcd'

        const empty = new StringBuilder()
        const conWithString = new StringBuilder(STRING_ABC)
        const stringWithCap = new StringBuilder(STRING_ABCD, SPECIFIED_CAPACITY)
        const capTrimmed = new StringBuilder(STRING_ABCD, TRIMMED_CAPACITY)

        expect(empty.getString()).toBe(EMPTY_STRING)
        expect(empty.capacity).toBe(DEFAULT_CAPACITY)
        expect(empty).toHaveLength(VALUE_0)

        expect(conWithString.getString()).toBe(STRING_ABC)
        expect(conWithString.capacity).toBe(DEFAULT_CAPACITY)
        expect(conWithString).toHaveLength(VALUE_3)

        expect(stringWithCap.getString()).toBe(STRING_ABCD)
        expect(stringWithCap.capacity).toBe(SPECIFIED_CAPACITY)
        expect(stringWithCap).toHaveLength(VALUE_4)

        expect(capTrimmed).toHaveLength(TRIMMED_CAPACITY)
        expect(capTrimmed.capacity).toBe(TRIMMED_CAPACITY)
        expect(capTrimmed.getString()).toBe(STRING_ABC)

        expect(new StringBuilder(STRING_ABCD, INFINITE_CAPACITY).capacity).toBe(DEFAULT_CAPACITY)
    })

    test('length:property', () => {
        const INITIAL_LENGTH = VALUE_3
        const RESET_LENGTH = VALUE_0
        const INFINITE_LENGTH = Infinity

        const strBuilder = new StringBuilder('abc')

        expect(strBuilder).toHaveLength(INITIAL_LENGTH)

        strBuilder.length = INFINITE_LENGTH
        expect(strBuilder).toHaveLength(INITIAL_LENGTH)

        strBuilder.length = RESET_LENGTH
        expect(strBuilder).toHaveLength(RESET_LENGTH)
        expect(strBuilder.getString()).toBe('')
    })

    test('capacity:property', () => {
        const DEFAULT_CAPACITY = -1
        const SPECIFIED_CAPACITY = VALUE_2
        const INFINITE_CAPACITY = Infinity

        const strBuilder = new StringBuilder('abc')

        expect(strBuilder.capacity).toBe(DEFAULT_CAPACITY)

        strBuilder.capacity = INFINITE_CAPACITY
        expect(strBuilder.capacity).toBe(DEFAULT_CAPACITY)

        strBuilder.capacity = SPECIFIED_CAPACITY
        expect(strBuilder.capacity).toBe(SPECIFIED_CAPACITY)
        expect(strBuilder.getString()).toBe('ab')
    })

    describe('setString', () => {
        const INITIAL_STRING_1 = 'hello'
        const INITIAL_STRING_2 = '352'
        const CAPACITY_LIMIT = VALUE_3
        const OVERFLOW_STRING = 'abcd'

        const strBuilder = new StringBuilder()

        test('Without Capacity', () => {
            expect(strBuilder.setString(INITIAL_STRING_1)).toBeTruthy()
            expect(strBuilder.getString()).toBe(INITIAL_STRING_1)

            expect(strBuilder.setString(INITIAL_STRING_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe(INITIAL_STRING_2)
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT

            expect(strBuilder.getString()).toBe(INITIAL_STRING_2)
            expect(strBuilder).toHaveLength(CAPACITY_LIMIT)

            expect(strBuilder.setString(OVERFLOW_STRING)).toBeFalsy()
            expect(strBuilder.getString()).toBe(INITIAL_STRING_2)
        })
    })

    test('reset', () => {
        const INITIAL_STRING = 'abc'
        const INITIAL_CAPACITY = VALUE_4
        const DEFAULT_CAPACITY = -1
        const EMPTY_STRING = ''

        const sb = new StringBuilder(INITIAL_STRING, INITIAL_CAPACITY)

        expect(sb.getString()).toBe(INITIAL_STRING)
        expect(sb.capacity).toBe(INITIAL_CAPACITY)

        sb.reset()

        expect(sb.capacity).toBe(DEFAULT_CAPACITY)
        expect(sb.getString()).toBe(EMPTY_STRING)
    })

    test('trim', () => {
        const INITIAL_STRING = '      abc  '
        const TRIMMED_STRING = 'abc'
        const EXPECTED_LENGTH = VALUE_3

        const sb = new StringBuilder(INITIAL_STRING)
        sb.trim()

        expect(sb.getString()).toBe(TRIMMED_STRING)
        expect(sb).toHaveLength(EXPECTED_LENGTH)
    })

    test('substring', () => {
        const INITIAL_STRING = 'My favorite language is Python'
        const SUBSTRING_START_INDEX = VALUE_3
        const EXPECTED_SUBSTRING = 'favorite language is Python'

        const sb = new StringBuilder(INITIAL_STRING)
        expect(sb.substring(SUBSTRING_START_INDEX)).toBe(EXPECTED_SUBSTRING)
    })

    test('setChar', () => {
        const INITIAL_STRING = '2 = 4'
        const TARGET_INDEX = VALUE_2
        const VALID_REPLACEMENT = ':'
        const INVALID_REPLACEMENT = '=>'
        const EXPECTED_STRING_AFTER_VALID = '2 : 4'
        const EXPECTED_STRING_AFTER_INVALID = '2 : 4'
        const EXPECTED_RETURN_VALUE_VALID = '='
        const EXPECTED_RETURN_VALUE_INVALID = ''

        const sb = new StringBuilder(INITIAL_STRING)
        expect(sb.setChar(TARGET_INDEX, VALID_REPLACEMENT)).toBe(EXPECTED_RETURN_VALUE_VALID)
        expect(sb.getString()).toBe(EXPECTED_STRING_AFTER_VALID)

        expect(sb.setChar(TARGET_INDEX, INVALID_REPLACEMENT)).toBe(EXPECTED_RETURN_VALUE_INVALID)
        expect(sb.getString()).toBe(EXPECTED_STRING_AFTER_INVALID)
    })

    test('indexOf', () => {
        const INITIAL_STRING = '2244'
        const SEARCH_CHAR = '4'
        const EXPECTED_INDEX = VALUE_2

        const sb = new StringBuilder(INITIAL_STRING)
        expect(sb.indexOf(SEARCH_CHAR)).toBe(EXPECTED_INDEX)
    })

    test('lastIndexOf', () => {
        const INITIAL_STRING = '2244'
        const SEARCH_CHAR = '2'
        const EXPECTED_LAST_INDEX = VALUE_1

        const sb = new StringBuilder(INITIAL_STRING)
        expect(sb.lastIndexOf(SEARCH_CHAR)).toBe(EXPECTED_LAST_INDEX)
    })

    test('clear', () => {
        const INITIAL_STRING = 'abc'
        const INITIAL_CAPACITY = VALUE_4
        const EXPECTED_STRING_AFTER_CLEAR = ''

        const sb = new StringBuilder(INITIAL_STRING, INITIAL_CAPACITY)
        expect(sb.getString()).toBe(INITIAL_STRING)
        expect(sb.capacity).toBe(INITIAL_CAPACITY)

        sb.clear()

        expect(sb.capacity).toBe(INITIAL_CAPACITY)
        expect(sb.getString()).toBe(EXPECTED_STRING_AFTER_CLEAR)
    })

    test('clone', () => {
        const INITIAL_STRING = 'abc'
        const INITIAL_CAPACITY = VALUE_4
        const CLONED_CAPACITY = 10
        const APPEND_STRING = 'de'
        const EXPECTED_CLONED_STRING = 'abcde'

        const sb = new StringBuilder(INITIAL_STRING, INITIAL_CAPACITY)

        expect(sb.getString()).toBe(INITIAL_STRING)
        expect(sb.capacity).toBe(INITIAL_CAPACITY)

        const cloned = sb.clone()
        cloned.capacity = CLONED_CAPACITY
        cloned.append(APPEND_STRING)

        expect(sb.getString()).toBe(INITIAL_STRING)
        expect(sb.capacity).toBe(INITIAL_CAPACITY)

        expect(cloned.getString()).toBe(EXPECTED_CLONED_STRING)
        expect(cloned.capacity).toBe(CLONED_CAPACITY)
    })

    describe('insert', () => {
        const INITIAL_STRING = '123'
        const INSERT_INDEX_1 = 1
        const INSERT_INDEX_3 = 3
        const VALUE_5 = 5
        const VALUE_2 = 2
        const CAPACITY_LIMIT = 10
        const BOOL_TRUE = true
        const INVALID_INDEX_NEGATIVE = -1
        const INVALID_INDEX_INFINITY = Infinity
        const STRING_HELLO = 'Hello'

        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            expect(strBuilder.insert(INSERT_INDEX_1, VALUE_4)).toBeTruthy()
            expect(strBuilder.getString()).toBe('1423')

            expect(strBuilder.insert(INSERT_INDEX_3, VALUE_5, VALUE_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('142553')
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT
            expect(strBuilder.insert(VALUE_0, BOOL_TRUE)).toBeTruthy()
            expect(strBuilder.getString()).toBe('true142553')

            expect(strBuilder.insert(VALUE_0, BOOL_TRUE)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('true142553')
        })

        test('Invalid Index', () => {
            const VALUE_20 = 20
            expect(() => strBuilder.insert(INVALID_INDEX_NEGATIVE, VALUE_20)).toThrow(RangeError)
            expect(() => strBuilder.insert(INVALID_INDEX_INFINITY, STRING_HELLO)).toThrow(RangeError)
        })
    })

    describe('append', () => {
        const INITIAL_STRING = '123'
        const VALUE_TRUE = true
        const CAPACITY_LIMIT = 12
        const STRING_2 = '2'
        const STRING_FULL = 'full'

        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            expect(strBuilder.append(VALUE_4, VALUE_4)).toBeTruthy()
            expect(strBuilder.getString()).toBe('1234444')

            expect(strBuilder.append(VALUE_TRUE)).toBeTruthy()
            expect(strBuilder.getString()).toBe('1234444true')
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT
            expect(strBuilder.append(STRING_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('1234444true2')

            expect(strBuilder.append(STRING_FULL)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('1234444true2')
        })
    })

    describe('prepend', () => {
        const INITIAL_STRING = '123'
        const VALUE_0 = 0
        const VALUE_TRUE = true
        const CAPACITY_LIMIT = 12
        const STRING_2 = '2'
        const STRING_FULL = 'full'

        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            expect(strBuilder.prepend(VALUE_0, VALUE_4)).toBeTruthy()
            expect(strBuilder.getString()).toBe('0000123')

            expect(strBuilder.prepend(VALUE_TRUE)).toBeTruthy()
            expect(strBuilder.getString()).toBe('true0000123')
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT
            expect(strBuilder.prepend(STRING_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('2true0000123')

            expect(strBuilder.prepend(STRING_FULL)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('2true0000123')
        })
    })

    describe('appendNewLine', () => {
        const INITIAL_STRING = '123'
        const CAPACITY_LIMIT = 7
        const NEWLINE_CHAR = '\n'

        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            expect(strBuilder.appendNewLine()).toBeTruthy()
            expect(strBuilder.getString()).toBe(`${INITIAL_STRING}${NEWLINE_CHAR}`)
            expect(strBuilder).toHaveLength(VALUE_4)

            expect(strBuilder.appendNewLine(VALUE_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe(`${INITIAL_STRING}${NEWLINE_CHAR}${NEWLINE_CHAR}${NEWLINE_CHAR}`)
            expect(strBuilder).toHaveLength(VALUE_6)
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT

            expect(strBuilder.appendNewLine()).toBeTruthy()
            expect(strBuilder.getString()).toBe(
                `${INITIAL_STRING}${NEWLINE_CHAR}${NEWLINE_CHAR}${NEWLINE_CHAR}${NEWLINE_CHAR}`
            )

            expect(strBuilder.appendNewLine()).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe(
                `${INITIAL_STRING}${NEWLINE_CHAR}${NEWLINE_CHAR}${NEWLINE_CHAR}${NEWLINE_CHAR}`
            )
        })
    })

    describe('prependNewLine', () => {
        const INITIAL_STRING = '123'
        const CAPACITY_LIMIT = VALUE_7
        const NEWLINE_CHAR = '\n'

        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            expect(strBuilder.prependNewLine()).toBeTruthy()
            expect(strBuilder.getString()).toBe(`${NEWLINE_CHAR}${INITIAL_STRING}`)
            expect(strBuilder).toHaveLength(VALUE_4)

            expect(strBuilder.prependNewLine(VALUE_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe(`${NEWLINE_CHAR}${NEWLINE_CHAR}${NEWLINE_CHAR}${INITIAL_STRING}`)
            expect(strBuilder).toHaveLength(VALUE_6)
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT

            expect(strBuilder.prependNewLine()).toBeTruthy()
            expect(strBuilder.getString()).toBe(
                `${NEWLINE_CHAR}${NEWLINE_CHAR}${NEWLINE_CHAR}${NEWLINE_CHAR}${INITIAL_STRING}`
            )

            expect(strBuilder.prependNewLine()).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe(
                `${NEWLINE_CHAR}${NEWLINE_CHAR}${NEWLINE_CHAR}${NEWLINE_CHAR}${INITIAL_STRING}`
            )
        })
    })

    describe('appendSpace', () => {
        const INITIAL_STRING = '123'
        const CAPACITY_LIMIT = VALUE_7
        const SPACE_CHAR = ' '

        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            expect(strBuilder.appendSpace()).toBeTruthy()
            expect(strBuilder.getString()).toBe(`${INITIAL_STRING}${SPACE_CHAR}`)
            expect(strBuilder).toHaveLength(VALUE_4)

            expect(strBuilder.appendSpace(VALUE_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe(`${INITIAL_STRING}${SPACE_CHAR}${SPACE_CHAR}${SPACE_CHAR}`)
            expect(strBuilder).toHaveLength(VALUE_6)
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT

            expect(strBuilder.appendSpace()).toBeTruthy()
            expect(strBuilder.getString()).toBe(`${INITIAL_STRING}${SPACE_CHAR}${SPACE_CHAR}${SPACE_CHAR}${SPACE_CHAR}`)

            expect(strBuilder.appendSpace()).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe(`${INITIAL_STRING}${SPACE_CHAR}${SPACE_CHAR}${SPACE_CHAR}${SPACE_CHAR}`)
        })
    })

    describe('prependSpace', () => {
        const INITIAL_STRING = '123'
        const CAPACITY_LIMIT = VALUE_7
        const SPACE_CHAR = ' '

        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            expect(strBuilder.prependSpace()).toBeTruthy()
            expect(strBuilder.getString()).toBe(`${SPACE_CHAR}${INITIAL_STRING}`)
            expect(strBuilder).toHaveLength(VALUE_4)

            expect(strBuilder.prependSpace(VALUE_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe(`${SPACE_CHAR}${SPACE_CHAR}${SPACE_CHAR}${INITIAL_STRING}`)
            expect(strBuilder).toHaveLength(VALUE_6)
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT

            expect(strBuilder.prependSpace()).toBeTruthy()
            expect(strBuilder.getString()).toBe(`${SPACE_CHAR}${SPACE_CHAR}${SPACE_CHAR}${SPACE_CHAR}${INITIAL_STRING}`)

            expect(strBuilder.prependSpace()).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe(`${SPACE_CHAR}${SPACE_CHAR}${SPACE_CHAR}${SPACE_CHAR}${INITIAL_STRING}`)
        })
    })

    describe('appendArray', () => {
        const INITIAL_STRING = ''
        const COMMA = ','
        const ARRAY_1 = [true, false]
        const ARRAY_2 = [VALUE_1, VALUE_2]
        const ARRAY_3 = ['h', 'i']
        const CAPACITY_LIMIT = 12
        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            expect(strBuilder.appendArray([], '-')).toBeTruthy()
            expect(strBuilder.getString()).toBe(INITIAL_STRING)
            expect(strBuilder).toHaveLength(VALUE_0)

            expect(strBuilder.appendArray(ARRAY_1, COMMA)).toBeTruthy()
            expect(strBuilder.getString()).toBe('true,false')
            expect(strBuilder).toHaveLength(VALUE_10)
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT

            expect(strBuilder.appendArray(ARRAY_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('true,false12')

            expect(strBuilder.appendArray(ARRAY_3)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('true,false12')
        })
    })

    describe('prependArray', () => {
        const INITIAL_STRING = ''
        const COMMA = ','
        const ARRAY_1 = [true, false]
        const ARRAY_2 = [VALUE_1, VALUE_2]
        const ARRAY_3 = ['h', 'i']
        const CAPACITY_LIMIT = 12
        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            expect(strBuilder.prependArray([], '-')).toBeTruthy()
            expect(strBuilder.getString()).toBe(INITIAL_STRING)
            expect(strBuilder).toHaveLength(VALUE_0)

            expect(strBuilder.prependArray(ARRAY_1, COMMA)).toBeTruthy()
            expect(strBuilder.getString()).toBe('true,false')
            expect(strBuilder).toHaveLength(VALUE_10)
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT

            expect(strBuilder.prependArray(ARRAY_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('12true,false')

            expect(strBuilder.prependArray(ARRAY_3)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('12true,false')
        })
    })

    describe('appendJSON', () => {
        const INITIAL_STRING = ''
        const JSON_1 = {}
        const JSON_2 = { '1': VALUE_1, '2': VALUE_4, '3': VALUE_9 }
        const JSON_3 = [{}]
        const CAPACITY_LIMIT = 36
        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            const LENGTH = 34
            expect(strBuilder.appendJSON(JSON_1)).toBeTruthy()
            expect(strBuilder.getString()).toBe('{}')
            expect(strBuilder).toHaveLength(VALUE_2)

            expect(strBuilder.appendJSON(JSON_2, VALUE_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('{}{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}')
            expect(strBuilder).toHaveLength(LENGTH)
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT

            expect(strBuilder.appendJSON(JSON_1, '')).toBeTruthy()
            expect(strBuilder.getString()).toBe('{}{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}{}')

            expect(strBuilder.appendJSON(JSON_3)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('{}{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}{}')
        })
    })

    describe('prependJSON', () => {
        const INITIAL_STRING = ''
        const JSON_1 = {}
        const JSON_2 = { '1': VALUE_1, '2': VALUE_4, '3': VALUE_9 }
        const JSON_3 = [{}]
        const CAPACITY_LIMIT = 36
        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            const LENGTH = 34
            expect(strBuilder.prependJSON(JSON_1)).toBeTruthy()
            expect(strBuilder.getString()).toBe('{}')
            expect(strBuilder).toHaveLength(VALUE_2)

            expect(strBuilder.prependJSON(JSON_2, VALUE_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}{}')
            expect(strBuilder).toHaveLength(LENGTH)
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT

            expect(strBuilder.prependJSON(JSON_1, '')).toBeTruthy()
            expect(strBuilder.getString()).toBe('{}{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}{}')

            expect(strBuilder.prependJSON(JSON_3)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('{}{\n  "1": 1,\n  "2": 4,\n  "3": 9\n}{}')
        })
    })

    describe('appendCodePoint', () => {
        const INITIAL_STRING = ''
        const CODE_POINT_H = 72 // H
        const CODE_POINT_I = 73 // I
        const CODE_POINT_EXCLAMATION = 33 // !
        const CODE_POINT_SPACE = 32 // space
        const CODE_POINT_SEMICOLON = 59 // ;
        const CODE_POINT_RIGHT_PARENTHESIS = 41 // )
        const CODE_POINTS_1 = [CODE_POINT_H, CODE_POINT_I, CODE_POINT_EXCLAMATION] // H, I, !
        const CODE_POINTS_2 = [CODE_POINT_SPACE, CODE_POINT_SEMICOLON, CODE_POINT_RIGHT_PARENTHESIS] // space, ;, )
        const CAPACITY_LIMIT = 6
        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            expect(strBuilder.appendCodePoint()).toBeTruthy()
            expect(strBuilder.getString()).toBe('')
            expect(strBuilder).toHaveLength(VALUE_0)

            expect(strBuilder.appendCodePoint(...CODE_POINTS_1)).toBeTruthy()
            expect(strBuilder.getString()).toBe('HI!')
            expect(strBuilder).toHaveLength(VALUE_3)
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT
            const VALUE_40 = 40
            expect(strBuilder.appendCodePoint(...CODE_POINTS_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe('HI! ;)')

            expect(strBuilder.appendCodePoint(VALUE_40)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe('HI! ;)')
        })
    })

    describe('prependCodePoint', () => {
        const INITIAL_STRING = ''
        const CODE_POINT_H = 72 // H
        const CODE_POINT_I = 73 // I
        const CODE_POINT_EXCLAMATION = 33 // !
        const CODE_POINT_SPACE = 32 // space
        const CODE_POINT_SEMICOLON = 59 // ;
        const CODE_POINT_RIGHT_PARENTHESIS = 41 // )
        const CODE_POINTS_1 = [CODE_POINT_H, CODE_POINT_I, CODE_POINT_EXCLAMATION] // H, I, !
        const CODE_POINTS_2 = [CODE_POINT_SEMICOLON, CODE_POINT_RIGHT_PARENTHESIS, CODE_POINT_SPACE] // space, ;, )
        const CAPACITY_LIMIT = 6
        const strBuilder = new StringBuilder(INITIAL_STRING)

        test('Without Capacity', () => {
            expect(strBuilder.prependCodePoint()).toBeTruthy()
            expect(strBuilder.getString()).toBe('')
            expect(strBuilder).toHaveLength(VALUE_0)

            expect(strBuilder.prependCodePoint(...CODE_POINTS_1)).toBeTruthy()
            expect(strBuilder.getString()).toBe('HI!')
            expect(strBuilder).toHaveLength(VALUE_3)
        })

        test('With Capacity', () => {
            strBuilder.capacity = CAPACITY_LIMIT
            const VALUE_40 = 40

            expect(strBuilder.prependCodePoint(...CODE_POINTS_2)).toBeTruthy()
            expect(strBuilder.getString()).toBe(';) HI!')

            expect(strBuilder.prependCodePoint(VALUE_40)).toBeFalsy()
            expect(strBuilder).toHaveLength(strBuilder.capacity)
            expect(strBuilder.getString()).toBe(';) HI!')
        })
    })

    describe('replaceSubstring', () => {
        const INITIAL_STRING_1 = 'dogs'
        const INITIAL_STRING_2 = 'I love dogs'
        const CAPACITY_1 = 4
        const CAPACITY_2 = 11
        const CAPACITY_3 = 15
        const REPLACEMENT_STRING = 'cats'
        const NEW_SUBSTRING = 'rabbits'
        const customReplacer: Replacer = (chr: string): string => chr.toUpperCase()

        describe('Normal String', () => {
            test('Edge Case - replace whole string', () => {
                const strBuilder = new StringBuilder(INITIAL_STRING_1, CAPACITY_1)
                expect(strBuilder.replaceSubstring(REPLACEMENT_STRING)).toBeTruthy()
                expect(strBuilder.getString()).toBe(REPLACEMENT_STRING)

                expect(strBuilder.replaceSubstring(NEW_SUBSTRING)).toBeFalsy()
                expect(strBuilder.getString()).toBe(REPLACEMENT_STRING)
            })

            test('Without Capacity', () => {
                const strBuilder = new StringBuilder(INITIAL_STRING_2)
                expect(strBuilder.replaceSubstring(REPLACEMENT_STRING, VALUE_7)).toBeTruthy()
                expect(strBuilder.getString()).toBe('I love cats')

                expect(strBuilder.replaceSubstring('They', undefined, VALUE_1)).toBeTruthy()
                expect(strBuilder.getString()).toBe('They love cats')
            })

            test('With Capacity', () => {
                const strBuilder = new StringBuilder(INITIAL_STRING_2, CAPACITY_2)
                expect(strBuilder.replaceSubstring(NEW_SUBSTRING, VALUE_7)).toBeFalsy()
                expect(strBuilder).toHaveLength(strBuilder.capacity)
                expect(strBuilder.getString()).toBe(INITIAL_STRING_2)
            })
        })

        describe('Replacer', () => {
            test('Edge Case - replace whole string', () => {
                const strBuilder = new StringBuilder(INITIAL_STRING_2)
                expect(strBuilder.replaceSubstring(customReplacer)).toBeTruthy()
                expect(strBuilder.getString()).toBe('I LOVE DOGS')
            })

            test('Without Capacity', () => {
                const strBuilder = new StringBuilder(INITIAL_STRING_2)
                expect(strBuilder.replaceSubstring(customReplacer, VALUE_7)).toBeTruthy()
                expect(strBuilder.getString()).toBe('I love DOGS')
            })

            test('With Capacity', () => {
                const strBuilder = new StringBuilder(INITIAL_STRING_2, CAPACITY_3)
                const customReplacer: Replacer = (chr: string): string => chr.toLowerCase() + chr.toUpperCase()
                expect(strBuilder.replaceSubstring(customReplacer, VALUE_7)).toBeTruthy()
                expect(strBuilder.getString()).toBe('I love dDoOgGsS')
            })
        })
    })
})
