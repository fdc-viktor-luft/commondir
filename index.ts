import path from "node:path";

const commonDir = (absoluteFiles: string[]): string => {
    if (!absoluteFiles.length) return path.sep;
    
    const first = absoluteFiles[0].split(path.sep);
    let max = first.length;
    for (let i = 1; i < absoluteFiles.length; i++) {
        const next = absoluteFiles[i].split(path.sep);
        for (let j = 0; j < max; j++) {
            if (first[j] !== next[j]) {
                max = j;
                break;
            }
        }
        if (max < 2) break;
    }

    return max > 1 ? first.slice(0, max).join(path.sep) : path.sep
}

/**
 * commondir(["/x/y/z", "/x/y", "/x/y/w/q"]) === "/x/y"
 */
export default ((files: string[], { cwd, relative }: { cwd?: string; relative?: boolean } = {}): string => {
    const usedCwd = cwd || process.cwd();
    const absolutePaths = files.map((f) => path.isAbsolute(f) ? f : path.resolve(usedCwd, f));
    const common = commonDir(absolutePaths);
    return relative ? path.relative(usedCwd, common) : common;
});
