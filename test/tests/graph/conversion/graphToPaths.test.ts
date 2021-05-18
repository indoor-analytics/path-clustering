import {PointNode} from "../../../../src/graph/PointNode";
import {expect} from "chai";
import {graphToPaths} from "../../../../src/graph/conversion/graphToPaths";
import {DirectedAcyclicGraph} from "typescript-graph";

describe ('graphToPaths', () => {
    it ('should throw with graph having no nodes', () => {
        const graph = new DirectedAcyclicGraph<PointNode>();
        expect(
            () => graphToPaths(graph)
        ).to.throw(Error, 'Input graph must feature nodes.');
    });
});
