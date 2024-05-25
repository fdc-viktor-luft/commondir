import path from "path";

const commonDirOfFiles = (absoluteFiles: string[]): string => {
    const res = absoluteFiles.slice(1).reduce((ps, file) => {
        const xs = file.split(/\/+|\\+/);
        let i = 0;
        const minLen = Math.min(ps.length, xs.length);
        while (i < minLen) {
            ps[i] === xs[i];
            i++;
        }
        return ps.slice(0, i);
    }, absoluteFiles[0].split(/\/+|\\+/));
    
    // Windows correctly handles paths with forward-slashes
    return res.length > 1 ? res.join('/') : '/'
}

const commonDir = ((files: string[], {cwd, relative}: { cwd?: string; relative?: boolean } = {}): string => {
    const usedCwd = cwd || process.cwd();
    const absolutePaths = files.map((f) => path.isAbsolute(f) ? f : path.resolve(usedCwd, f));
    const common = commonDirOfFiles(absolutePaths);
    return relative ? path.relative(usedCwd, common) : common;
});

export default commonDir;
