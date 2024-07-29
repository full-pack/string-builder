type Replacer = (char: string, index: number, str: string) => string

class StringBuilder {
    private _cap: number
    private _str: string

    constructor()
    constructor(str: string)
    constructor(str: string, capacity: number)

    constructor(str?: string, capacity?: number) {
        if (typeof str === 'string' || typeof str === 'boolean' || typeof str === 'number') this._str = String(str)
        else this._str = ''
        if (typeof capacity === 'number' && isFinite(capacity) && capacity > -1) {
            this._cap = capacity
            this._str = this._str.slice(undefined, capacity)
        } else this._cap = -1
    }

    insert(index: number, value: number | string | boolean, repeatCount: number = 1): boolean {
        if (index > -1 && index < this._str.length) {
            value = value.toString()
            let repeated = ''
            for (; repeatCount > 0; repeatCount--) repeated = repeated.concat(value)
            const inserted = this._str.slice(undefined, index) + repeated + this._str.slice(index)
            if (this.checkCapacity(inserted)) {
                this._str = inserted
                return true
            }
            return false
        } else throw new RangeError('Invalid Index')
    }

    append(value: number | string | boolean, repeatCount: number = 1): boolean {
        value = value.toString()
        let repeated = ''
        for (; repeatCount > 0; repeatCount--) repeated = repeated.concat(value)
        const appended = this._str.concat(repeated)
        if (this.checkCapacity(appended)) {
            this._str = appended
            return true
        }
        return false
    }

    prepend(value: number | string | boolean, repeatCount: number = 1): boolean {
        value = value.toString()
        let repeated = ''
        for (; repeatCount > 0; repeatCount--) repeated = repeated.concat(value)
        const prepended = repeated.toString().concat(this._str)
        if (this.checkCapacity(prepended)) {
            this._str = prepended
            return true
        }
        return false
    }

    appendNewLine(num: number = 1): boolean {
        let lineBreaks = ''
        for (; num > 0; num--) lineBreaks = lineBreaks.concat('\u000a')
        const appended = this._str.concat(lineBreaks)
        if (this.checkCapacity(appended)) {
            this._str = appended
            return true
        }
        return false
    }

    prependNewLine(num: number = 1): boolean {
        let lineBreaks = ''
        for (; num > 0; num--) lineBreaks = lineBreaks.concat('\u000a')
        const prepended = lineBreaks.concat(this._str)
        if (this.checkCapacity(prepended)) {
            this._str = prepended
            return true
        }
        return false
    }

    appendSpace(num: number = 1): boolean {
        let spaces = ''
        for (; num > 0; num--) spaces = spaces.concat('\u0020')
        const appended = this._str.concat(spaces)
        if (this.checkCapacity(appended)) {
            this._str = appended
            return true
        }
        return false
    }

    prependSpace(num: number = 1): boolean {
        let spaces = ''
        for (; num > 0; num--) spaces = spaces.concat('\u0020')
        const prepended = spaces.concat(this._str)
        if (this.checkCapacity(prepended)) {
            this._str = prepended
            return true
        }
        return false
    }

    appendArray(arr: Array<number | string | boolean>, separator: string = ''): boolean {
        const merged = arr.join(separator)
        const appended = this._str.concat(merged)
        if (this.checkCapacity(appended)) {
            this._str = appended
            return true
        }
        return false
    }

    prependArray(arr: Array<number | string | boolean>, separator: string = ''): boolean {
        const merged = arr.join(separator)
        const prepended = merged.concat(this._str)
        if (this.checkCapacity(prepended)) {
            this._str = prepended
            return true
        }
        return false
    }

    appendJSON(json: Record<any, any> | Array<Record<any, any>>, space?: string | number): boolean {
        let appended = ''
        if (Array.isArray(json)) {
            json.forEach((value) => (appended = appended.concat(JSON.stringify(value, undefined, space))))
        } else {
            appended = appended.concat(JSON.stringify(json, undefined, space))
        }
        if (this.checkCapacity(this._str + appended)) {
            this._str = this._str.concat(appended)
            return true
        }
        return false
    }

    prependJSON(json: Record<any, any> | Array<Record<any, any>>, space?: string | number): boolean {
        let prepended = ''
        if (Array.isArray(json)) {
            json.forEach((value) => (prepended = JSON.stringify(value, undefined, space).concat(prepended)))
        } else {
            prepended = prepended.concat(JSON.stringify(json, undefined, space))
        }
        if (this.checkCapacity(prepended + this._str)) {
            this._str = prepended.concat(this._str)
            return true
        }
        return false
    }

    appendCodePoint(...codePoints: number[]): boolean {
        const appended = String.fromCodePoint(...codePoints)
        if (this.checkCapacity(this._str + appended)) {
            this._str = this._str.concat(appended)
            return true
        }
        return false
    }

    prependCodePoint(...codePoints: number[]): boolean {
        const prepended = String.fromCodePoint(...codePoints)
        if (this.checkCapacity(prepended + this._str)) {
            this._str = prepended.concat(this._str)
            return true
        }
        return false
    }

    replaceSubstring(str: string | Replacer, start?: number, end?: number): boolean {
        // Edge case - when both start & end are not defined than replace whole string.
        if (start === undefined && end === undefined) {
            // If str is string else it is replacer
            if (typeof str === 'string') {
                // If capacity is -1 OR capacity is more than equal to given str
                if (this.checkCapacity(str)) {
                    this._str = str
                    return true
                }
            } else {
                let replacementString: string = ''
                for (let i = 0; i < this._str.length; i++) {
                    replacementString += str(this._str[i], i, this._str)
                }
                // If capacity is -1 OR capacity is more than equal to replacementString
                if (this.checkCapacity(replacementString)) {
                    this._str = replacementString
                    return true
                }
            }
            return false
        }

        // If start OR end is undefined than giving it default value
        if (start === undefined) start = 0
        if (end === undefined) end = this._str.length

        let replacementString: string = ''

        // If str is string else it is replacer
        if (typeof str === 'string') {
            replacementString = this._str.slice(undefined, start) + str + this._str.slice(end)
            // If capacity is -1 OR capacity is more than equal to replacementString
            if (this.checkCapacity(replacementString)) {
                this._str = replacementString
                return true
            }
        } else {
            for (let i = start; i < end; i++) {
                replacementString += str(this._str[i], i, this._str)
            }
            replacementString = this._str.slice(undefined, start) + replacementString + this._str.slice(end)
            // If capacity is -1 OR capacity is more than equal to replacementString
            if (this.checkCapacity(replacementString)) {
                this._str = replacementString
                return true
            }
        }
        return false
    }

    setString(value: string): boolean {
        if (this.checkCapacity(value)) {
            this._str = value
            return true
        }
        return false
    }

    private checkCapacity(optString: string): boolean {
        return this._cap === -1 || this._cap >= optString.length
    }

    getString(): string {
        return this._str
    }

    indexOf(searchString: string, position?: number): number {
        return this._str.indexOf(searchString, position)
    }

    lastIndexOf(searchString: string, position?: number): number {
        return this._str.lastIndexOf(searchString, position)
    }

    setChar(index: number, char: string): string {
        let removed = ''
        if (char.length === 1 || char.length === 0) {
            removed = this._str.charAt(index)
            this._str = this._str.slice(undefined, index) + char + this._str.slice(index + 1)
        }
        return removed
    }

    substring(start: number, end?: number): string {
        return this._str.substring(start, end)
    }

    trim(): void {
        this._str = this._str.trim()
    }

    public get capacity(): number {
        return this._cap
    }

    public set capacity(value: number) {
        if (typeof value === 'number' && isFinite(value) && value > -1) {
            this._cap = value
            this._str = this._str.slice(undefined, value)
        } else this._cap = -1
    }

    public get length(): number {
        return this._str.length
    }

    public set length(value: number) {
        if (typeof value === 'number' && isFinite(value) && value > -1) this._str = this._str.slice(undefined, value)
    }

    // removes string
    clear(): void {
        this._str = ''
    }

    // removes string & capacity
    reset(): void {
        this._str = ''
        this._cap = -1
    }

    clone(): StringBuilder {
        return new StringBuilder(this._str, this._cap)
    }

    isFull(): boolean {
        return this._cap !== -1 && this._cap === this._str.length
    }

    isEmpty(): boolean {
        return this._str.length === 0
    }
}

export default { StringBuilder }
export { StringBuilder }
export type { Replacer }
