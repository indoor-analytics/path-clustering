import {clusterPaths} from "../../src/clustering";
import {flandersRuns, mouaisRun} from "../features/runs";
import { expect } from "chai";
import {flandersStation} from "../features/zones";

describe ('clustering', () => {
    it ('should return some paths', () => {
        const clusteredPaths = clusterPaths(flandersRuns, flandersStation());
        expect(clusteredPaths.length).to.not.equal(0);
    });

    it ('should not return input paths', () => {
        const clusteredPaths = clusterPaths(flandersRuns, flandersStation());
        expect(clusteredPaths).to.not.deep.equal(flandersRuns);
    });

    it ('should throw with no input paths', () => {
        expect(
            () => clusterPaths([], flandersStation())
        ).to.throw(RangeError, 'Input paths array must contain at least two paths.');
    });

    it ('should throw with one input path', () => {
        expect(
            () => clusterPaths([mouaisRun], flandersStation())
        ).to.throw(RangeError, 'Input paths array must contain at least two paths.');
    });
});
