import {clusterPaths} from "../../src/clustering";
import {flandersRuns} from "../features/runs";
import { expect } from "chai";

describe ('clustering', () => {
    it ('should return some paths', () => {
        const clusteredPaths = clusterPaths(flandersRuns);
        expect(clusteredPaths.length).to.not.equal(0);
    });

    it ('should not return input paths', () => {
        const clusteredPaths = clusterPaths(flandersRuns);
        expect(clusteredPaths).to.not.deep.equal(flandersRuns);
    });

    it ('should throw with no input paths', () => {
        expect(
            () => clusterPaths([])
        ).to.throw(RangeError, 'Input paths array must contain at least two paths.');
    });
});
