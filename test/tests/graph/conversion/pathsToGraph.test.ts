import {pathsToGraph} from "../../../../src/graph/conversion/pathsToGraph";
import {mouaisRun} from "../../../features/runs";
import {expect} from "chai";

describe ('pathsToGraph', () => {
    it ('should create as many nodes as path points', () => {
        const graph = pathsToGraph([mouaisRun]);
        expect(graph.getNodes().length).to.equal(mouaisRun.geometry.coordinates.length);
    });
});
