import PocketBase from 'pocketbase'

export const createPocketBaseInstance = () => new PocketBase('https://pocketbase.eveloth.ru')

export const pb = createPocketBaseInstance()
