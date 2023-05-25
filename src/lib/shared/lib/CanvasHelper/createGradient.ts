type CreateGradient = (options:{
    ctx:CanvasRenderingContext2D,
    gradientPosition: Parameters<CanvasRenderingContext2D['createLinearGradient']>
    colors: {
        rgb: string,
        alpha?:number
    }[]
}) => CanvasGradient

export const createGradient:CreateGradient = ({
    ctx,
    gradientPosition,
    colors
}) => {
    const gradient = ctx.createLinearGradient(...gradientPosition)
    const genColor = (rgb:string, alpha?:number) => {
        return `rgba(${rgb}, ${alpha ?? 1})`
    }
    
    colors.forEach((color, index, arr) => {
        const offset = index / (arr.length - 1)
        gradient?.addColorStop?.(offset, genColor(color.rgb, color.alpha))
    })

    return gradient
}