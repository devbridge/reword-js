module.exports = ({ publish = false } = {}) => {
  const options = {
    'non-interactive': publish,
    // debugging only option
    // verbose: true,
    'dry-run': false,
    requireCleanWorkingDir: false,
    requireUpstream: false,
    changelogCommand:
      'git log --pretty=format:"* %s (%h)" $(git describe --tags --abbrev=0 HEAD^)..HEAD',
    src: {
      commit: !publish,
      commitMessage: 'Release v%s',
      tag: !publish,
      tagName: 'v%s',
      tagAnnotation: 'Release v%s',
      push: !publish,
      pushRepo: 'origin',
    },
    github: {
      release: publish,
    },
    npm: {
      publish,
    },
  };

  return options;
};
