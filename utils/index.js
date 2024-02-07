export function js2Fixed(target, num) {
	let o = Math.pow(10, num);
	return (parseInt(target * o)/o).toFixed(num)
}