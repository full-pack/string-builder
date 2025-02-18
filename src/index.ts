type Replacer = (char: string, index: number, str: string) => string

class StringBuilder {
    private _cap: number
    private _str: string

    constructor()
    constructor(str: string)
    constructor(str: string, capacity: number)

    constructor(str?: string, capacity?: number) {
        this._str = String(str ?? '')
        if (typeof capacity === 'number' && isFinite(capacity) && capacity > -1) {
            this._cap = capacity
            this._str = this._str.slice(undefined, capacity)
        } else this._cap = -1
    }

    insert(index: number, value: number | string | boolean, repeatCount: number = 1): boolean {
        if (index > -1 && index < this._str.length) {
            value = value.toString()
            const operating = [this._str.slice(undefined, index)]
            for (; repeatCount > 0; repeatCount--) operating.push(value)
            operating.push(this._str.slice(index))
            const insertion = operating.join('')
            if (this.checkCapacity(insertion.length)) {
                this._str = insertion
                return true
            }
            return false
        } else throw new RangeError('Invalid Index')
    }

    append(value: number | string | boolean, repeatCount: number = 1): boolean {
        value = value.toString()
        const operating = [this._str]
        for (; repeatCount > 0; repeatCount--) operating.push(value)
        const appended = operating.join('')
        if (this.checkCapacity(appended.length)) {
            this._str = appended
            return true
        }
        return false
    }

    prepend(value: number | string | boolean, repeatCount: number = 1): boolean {
        value = value.toString()
        const operating = []
        for (; repeatCount > 0; repeatCount--) operating.push(value)
        operating.push(this._str)
        const prepended = operating.join('')
        if (this.checkCapacity(prepended.length)) {
            this._str = prepended
            return true
        }
        return false
    }

    appendNewLine(num: number = 1): boolean {
        const operating = [this._str]
        for (; num > 0; num--) operating.push('\u000a')
        const appended = operating.join('')
        if (this.checkCapacity(appended.length)) {
            this._str = appended
            return true
        }
        return false
    }

    prependNewLine(num: number = 1): boolean {
        const operating = []
        for (; num > 0; num--) operating.push('\u000a')
        operating.push(this._str)
        const prepended = operating.join('')
        if (this.checkCapacity(prepended.length)) {
            this._str = prepended
            return true
        }
        return false
    }

    appendSpace(num: number = 1): boolean {
        const operating = [this._str]
        for (; num > 0; num--) operating.push('\u0020')
        const appended = operating.join('')
        if (this.checkCapacity(appended.length)) {
            this._str = appended
            return true
        }
        return false
    }

    prependSpace(num: number = 1): boolean {
        const operating = []
        for (; num > 0; num--) operating.push('\u0020')
        operating.push(this._str)
        const prepended = operating.join('')
        if (this.checkCapacity(prepended.length)) {
            this._str = prepended
            return true
        }
        return false
    }

    appendArray(arr: Array<number | string | boolean>, separator: string = ''): boolean {
        const appended = this._str.concat(arr.join(separator))
        if (this.checkCapacity(appended.length)) {
            this._str = appended
            return true
        }
        return false
    }

    prependArray(arr: Array<number | string | boolean>, separator: string = ''): boolean {
        const prepended = arr.join(separator).concat(this._str)
        if (this.checkCapacity(prepended.length)) {
            this._str = prepended
            return true
        }
        return false
    }

    appendJSON(json: Record<any, any> | Array<Record<any, any>>, space?: string | number): boolean {
        const operating = [this._str]
        if (Array.isArray(json)) {
            json.forEach((value) => operating.push(JSON.stringify(value, undefined, space)))
        } else {
            operating.push(JSON.stringify(json, undefined, space))
        }
        const appended = operating.join('')
        if (this.checkCapacity(appended.length)) {
            this._str = appended
            return true
        }
        return false
    }

    prependJSON(json: Record<any, any> | Array<Record<any, any>>, space?: string | number): boolean {
        const operating = []
        if (Array.isArray(json)) {
            json.forEach((value) => operating.push(JSON.stringify(value, undefined, space)))
        } else {
            operating.push(JSON.stringify(json, undefined, space))
        }
        const prepended = operating.join('') + this._str
        if (this.checkCapacity(prepended.length)) {
            this._str = prepended
            return true
        }
        return false
    }

    appendCodePoint(...codePoints: number[]): boolean {
        const appended = this._str + String.fromCodePoint(...codePoints)
        if (this.checkCapacity(appended.length)) {
            this._str = appended
            return true
        }
        return false
    }

    prependCodePoint(...codePoints: number[]): boolean {
        const prepended = String.fromCodePoint(...codePoints) + this._str
        if (this.checkCapacity(prepended.length)) {
            this._str = prepended
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
                if (this.checkCapacity(str.length)) {
                    this._str = str
                    return true
                }
            } else {
                const operating: string[] = []
                for (let i = 0; i < this._str.length; i++) {
                    operating.push(str(this._str[i], i, this._str))
                }
                const replacementString = operating.join('')
                // If capacity is -1 OR capacity is more than equal to replacementString
                if (this.checkCapacity(replacementString.length)) {
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
            if (this.checkCapacity(replacementString.length)) {
                this._str = replacementString
                return true
            }
        } else {
            for (let i = start; i < end; i++) {
                replacementString += str(this._str[i], i, this._str)
            }
            replacementString = this._str.slice(undefined, start) + replacementString + this._str.slice(end)
            // If capacity is -1 OR capacity is more than equal to replacementString
            if (this.checkCapacity(replacementString.length)) {
                this._str = replacementString
                return true
            }
        }
        return false
    }

    setString(value: string): boolean {
        if (this.checkCapacity(value.length)) {
            this._str = value
            return true
        }
        return false
    }

    private checkCapacity(newStrLen: number): boolean {
        return this._cap === -1 || this._cap >= newStrLen
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

    /**
     * Only removes the string.
     */
    clear(): void {
        this._str = ''
    }

    /**
     * Removes string & capacity.
     */
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
