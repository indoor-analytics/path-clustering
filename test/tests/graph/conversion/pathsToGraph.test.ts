import {pathsToGraph} from "../../../../src/graph/conversion/pathsToGraph";
import {mouaisRun, testRun} from "../../../features/runs";
import {expect} from "chai";
import {PointNode} from "../../../../src/graph/PointNode";

describe ('pathsToGraph', () => {
    it ('should create as many nodes as path points', () => {
        const graph = pathsToGraph([mouaisRun]);
        expect(graph.getNodes().length).to.equal(mouaisRun.geometry.coordinates.length);
    });

    it ('should create a graph with same nodes order as input path', () => {
        const pathPositions = testRun.geometry.coordinates;

        const graph = pathsToGraph([testRun]);
        const nodes = graph.topologicallySortedNodes();

        nodes.forEach((node: PointNode, index: number) => {
            const pathPosition = pathPositions[index];
            expect(node.point.geometry.coordinates).to.deep.equal(pathPosition);
        });
    });
});
