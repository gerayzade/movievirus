const fs = require('fs');
const { exec } = require('child_process');
const matter = require('gray-matter');
const prompt = require('prompt-async');

const cwd = process.cwd();
const contentDirectory = `${cwd}/content`;

String.prototype.toTitleCase = function() {
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

String.prototype.toSlug = function() {
  const charsFrom = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
	const charsTo   = 'aaaaeeeeiiiioooouuuunc------';
	
	let title = this.toLowerCase();
  for (let i = 0, l = charsFrom.length; i < l; i++) {
    title = title.replace(new RegExp(charsFrom.charAt(i), 'g'), charsTo.charAt(i));
  }

	return title
		.replace(/^\s+|\s+$/g, '') // trim
		.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by dashes
		.replace(/-+/g, '-') // collapse dashes
}

const schema = {
  properties: {
    title: {
      description: '\nEnter title',
      type: 'string',
      message: 'Title is required',
      required: true
		}
  }
};

(async () => {
  try {
		prompt.start();
		// get input
		const { title } = await prompt.get(schema);
		// generate default data
		const data = {};
		data.title = title.toTitleCase();
		data.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
		data.image = '/media/example.jpg';
		data.source = 'https://www.example.com/';
		data.tags = ['tag'];
		// write to file
		const filePath = `${contentDirectory}/facts/${title.toSlug()}.md`;
		const fileContent = matter.stringify('', data);
		await fs.writeFileSync(filePath, fileContent);
		// continue in code editor
		exec(`code ${filePath}`);
  } catch(err) {
    console.error(err);
  }
})();