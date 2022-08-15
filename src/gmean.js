export default function gmean(values, valueof) {
	const r = 64;
	const K = 2 ** r;
	const K1 = 2 ** -r;
	let p = 1; // product
	let n = 0; // count
	let s = 1; // sign
	let k = 0; // track exponent to prevent under/overflows
	if (valueof === undefined) {
		for (let value of values) {
			if (value != null && (value = +value) >= value) {
					n++;
					s = Math.sign(value);
					if (s === 0) return 0;
					p *= Math.abs(value);
					while (p > K) (p *= K1), ++k;
					while (p < K1) (p *= K), --k;    
			}
		}
	} else {
		let index = -1;
		for (let value of values) {
			if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
				n++;
				s = Math.sign(value);
				if (s === 0) return 0;
				p *= Math.abs(value);
				while (p > K) (p *= K1), ++k;
				while (p < K1) (p *= K), --k; 
			}
		}
	}
	if (n) return s * 2 ** ((Math.log2(p) + k * r) / n)
}