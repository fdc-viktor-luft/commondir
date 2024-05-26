# commondir

> ⚠️ This is a replacement for [`commondir`](https://www.npmjs.com/package/commondir) with improved API, integrated types and less outdated.
>
> Caveat: It works only with paths working in the current OS. Previously, you could e.g. kind of mix Windows and Linux paths.

## Example usages

```ts
import commondir from "@backend/commondir";

commondir(["/x/y/z", "/x/y", "/x/y/w/q"]); // "/x/y"
// use optional "cwd" (current work dir) override when using relative paths
commondir(["/0/1/2/3", "../../foo", "../../../2/bar"], { cwd: "/0/1/2/3/4" }); // "/0/1/2"
// use "relative" to return a relative path instead
commondir(["/0/1/2/3", "./3/4/foo", "./3/bar"], { cwd: "/0/1/2", relative: true }); // "3"
```
