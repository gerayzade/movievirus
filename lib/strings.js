export function toTitleCase() {
	const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i
	const alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/
	const wordSeparators = /([ :–—-])/

	return this.split(wordSeparators)
		.map((current, index, array) => {
			if (
				/* check for small words */
				current.search(smallWords) > -1 &&
				/* skip first and last word */
				index !== 0 && index !== array.length - 1 &&
				/* ignore title end and subtitle start */
				array[index - 3] !== ':' && array[index + 1] !== ':' &&
				/* ignore small words that start a hyphenated phrase */
				(array[index + 1] !== '-' || (array[index - 1] === '-' && array[index + 1] === '-'))
			) {
				return current.toLowerCase();
			}
			/* ignore intentional capitalization */
			if (current.substr(1).search(/[A-Z]|\../) > -1) return current;
			/* ignore URLs */
			if (array[index + 1] === ':' && array[index + 2] !== '') return current;
			/* capitalize the first letter */
			return current.replace(alphanumericPattern, (match) => match.toUpperCase());
		})
		.join('');
}