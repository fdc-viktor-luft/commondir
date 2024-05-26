import { describe, it, expect } from 'bun:test';
import commondir from './index';

describe("commondir", () => {
    it("computes common dir for absolute paths", () => {
        expect(commondir(["/x/y/z", "/x/y", "/x/y/w/q"])).toBe("/x/y");
        expect(commondir(["/x/y/z", "/foo/bar", "/x/y/w/q"])).toBe("/");
    });

    it("computes common dir for relative paths with given cwd", () => {
        expect(commondir(["/0/1/2/3", "../../foo", "../../../2/bar"], { cwd: "/0/1/2/3/4" })).toBe("/0/1/2");
        expect(commondir(["/0/1/2/3", "../../foo", "../../../2/bar"], { cwd: "/0/1/2/3/4", relative: true })).toBe("../..");
        expect(commondir(["/0/1/2/3", "./3/4/foo", "./bar"], { cwd: "/0/1/2", relative: true })).toBe("");
        expect(commondir(["/0/1/2/3", "./3/4/foo", "./3/bar"], { cwd: "/0/1/2", relative: true })).toBe("3");
    });
})