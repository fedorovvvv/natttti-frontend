import type { ETokenAccessTypes } from "$shared/types/token";

export class TokenHelper {
    static getAccessTypeText(type:ETokenAccessTypes) {
        switch (type) {
            case 1: return '🐣 Член профсоюза'
            case 2: return '🐥 Админушка'
            case 3: return '🌟 Боженька'
            default: return ''
        }
    }
}