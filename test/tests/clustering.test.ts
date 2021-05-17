import {clusterPaths} from "../../src/clustering";
import {flandersRuns} from "../features/runs";
const expect = require('chai').expect;

describe ('clustering', () => {
    it ('should return some paths', () => {
        const clusteredPaths = clusterPaths(flandersRuns);
        expect(clusteredPaths.length).to.not.equal(0);
    });

    it ('should not return input paths', () => {
        const clusteredPaths = clusterPaths(flandersRuns);
        expect(clusteredPaths).to.not.deep.equal(flandersRuns);
    });
});
