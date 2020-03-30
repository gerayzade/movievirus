const getContextModule = (folder) => {
  // second flag in require.context function is if subdirectories should be searched
  switch(folder) {
    case 'facts':
      return require.context('../content/facts', false, /\.md$/);
  }
}

export const importMarkdownFiles = async (folder) => {
  // https://medium.com/@shawnstern/importing-multiple-markdown-files-into-a-react-component-with-webpack-7548559fce6f
  const markdownFiles = getContextModule(folder).keys().map(relativePath => relativePath.substring(2));
  return Promise.all(
    markdownFiles.map(async (path, index) => {
      const markdown = await import(`../content/${folder}/${path}`);
      return { 
        id: index, 
        slug: path.substring(0, path.length - 3), 
        ...markdown.attributes 
      };
    })
  );
};