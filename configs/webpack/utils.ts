import path from 'path';

function getRelativePath(rootPath: string) {
  return (args: string) => {
    args = args.slice();
    return path.join.apply(path, [rootPath].concat(args));
  };
}

const getRootRelativePath = getRelativePath(path.resolve(__dirname, '../../'));

export { getRelativePath, getRootRelativePath };
