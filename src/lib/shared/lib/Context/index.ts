import { getContext, hasContext, setContext } from 'svelte'

export class Context<T> {
	name
	data
	constructor(name: string, data?: T) {
		;(this.name = name), (this.data = data)
	}
	has() {
		return hasContext(this.name)
	}
	set(data = this.data) {
		return setContext(this.name, data)
	}
	get() {
		return getContext<T | undefined>(this.name)
	}
}
