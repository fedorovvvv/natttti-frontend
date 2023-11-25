export const roundedRectPath = (options: { x: number; y: number; width: number; height: number; radius: number }) => {
	const { x, y, width: w, height: h, radius } = options
	const r = Math.min(w, h) / 2 > radius ? radius : Math.min(w, h) / 2
	return `M ${x + r} ${y} l ${w - 2 * r} 0 q ${r} 0 ${r} ${r}
        l 0 ${h - 2 * r} q 0 ${r} ${-r} ${r}
        l ${-w + 2 * r} 0 q ${-r} 0 ${-r} ${-r}
        l 0 ${-h + 2 * r} q 0 ${-r} ${r} ${-r}`
}
