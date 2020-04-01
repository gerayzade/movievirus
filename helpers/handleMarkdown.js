const getContextModule = (folder) => {
  return ({
    facts: require.context('../content/facts', false, /\.md$/)
  })[folder];
}

export const getMarkdownFile = async (folder, filename, id = 0) => {
  const markdown = await import(`../content/${folder}/${filename}`);
  const slug = filename.substring(0, filename.length - 3);
  return { ...markdown.attributes, id, slug };
}

export const importMarkdownFiles = async (folder) => {
  // https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f
  const markdownFiles = getContextModule(folder).keys().map(relativePath => relativePath.substring(2));
  return Promise.all(markdownFiles.map(async (filename, i) => getMarkdownFile(folder, filename, i)));
};