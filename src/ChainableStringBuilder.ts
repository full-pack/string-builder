import { StringBuilder } from '.'
import type { Replacer } from '.'

class ChainableStringBuilder {
    private readonly sb: StringBuilder
    readonly UNSET_VALUE = -1

    static fromStringBuilder(sb: StringBuilder): ChainableStringBuilder {
        return new ChainableStringBuilder(sb.getString(), sb.capacity)
    }

    constructor(str?: string, capacity?: number) {
        this.sb = new StringBuilder(str ?? '', capacity ?? this.UNSET_VALUE)
    }

    insert(index: number, value: number | string | boolean, repeatCount = 1): this {
        this.sb.insert(index, value, repeatCount)
        return this
    }

    append(value: number | string | boolean, repeatCount = 1): this {
        this.sb.append(value, repeatCount)
        return this
    }

    prepend(value: number | string | boolean, repeatCount = 1): this {
        this.sb.prepend(value, repeatCount)
        return this
    }

    appendNewLine(num = 1): this {
        this.sb.appendNewLine(num)
        return this
    }

    prependNewLine(num = 1): this {
        this.sb.prependNewLine(num)
        return this
    }

    appendSpace(num = 1): this {
        this.sb.appendSpace(num)
        return this
    }

    prependSpace(num = 1): this {
        this.sb.prependSpace(num)
        return this
    }

    appendArray(arr: Array<number | string | boolean>, separator = ''): this {
        this.sb.appendArray(arr, separator)
        return this
    }

    prependArray(arr: Array<number | string | boolean>, separator = ''): this {
        this.sb.prependArray(arr, separator)
        return this
    }

    appendJSON(
        json: Record<string | number | symbol, unknown> | Array<Record<string | number | symbol, unknown>>,
        space?: string | number
    ): this {
        this.sb.appendJSON(json, space)
        return this
    }

    prependJSON(
        json: Record<string | number | symbol, unknown> | Array<Record<string | number | symbol, unknown>>,
        space?: string | number
    ): this {
        this.sb.prependJSON(json, space)
        return this
    }

    appendCodePoint(...codePoints: number[]): this {
        this.sb.appendCodePoint(...codePoints)
        return this
    }

    prependCodePoint(...codePoints: number[]): this {
        this.sb.prependCodePoint(...codePoints)
        return this
    }

    replaceSubstring(str: string | Replacer, start?: number, end?: number): this {
        this.sb.replaceSubstring(str, start, end)
        return this
    }

    setString(value: string): this {
        this.sb.setString(value)
        return this
    }

    trim(): this {
        this.sb.trim()
        return this
    }

    clear(): this {
        this.sb.clear()
        return this
    }

    reset(): this {
        this.sb.reset()
        return this
    }

    clone(): ChainableStringBuilder {
        return new ChainableStringBuilder(this.sb.getString(), this.sb.capacity)
    }

    build(): StringBuilder {
        return this.sb
    }

    getString(): string {
        return this.sb.getString()
    }

    get capacity(): number {
        return this.sb.capacity
    }

    set capacity(value: number) {
        this.sb.capacity = value
    }

    get length(): number {
        return this.sb.length
    }
    set length(value: number) {
        this.sb.length = value
    }
}

export { ChainableStringBuilder }
