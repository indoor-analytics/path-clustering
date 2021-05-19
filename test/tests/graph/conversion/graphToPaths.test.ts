import {newPointNodeGraph, PointNode} from "../../../../src/graph/PointNode";
import {expect} from "chai";
import {graphToPaths} from "../../../../src/graph/conversion/graphToPaths";
import {getTestGraph} from "../../../utils/getTestGraph";


describe ('graphToPaths', () => {
    it ('should throw with graph having no nodes', () => {
        const graph = newPointNodeGraph();
        expect(
            () => graphToPaths(graph)
        ).to.throw(Error, 'Input graph must feature nodes.');
    });

    it ('should return one path', () => {
        const graph = getTestGraph(3, 1);
        const paths = graphToPaths(graph);
        expect(paths.length).to.equal(1);
    });

    it ('should return one path linking input nodes together', () => {
        const graph = newPointNodeGraph();
        const point1 = [0, 1],
            point2 = [1, 2],
            point3 = [2, 3];
        const node1 = graph.insert(new PointNode(point1)),
            node2 = graph.insert(new PointNode(point2)),
            node3 = graph.insert(new PointNode(point3));
        graph.addEdge(node1, node2);
        graph.addEdge(node2, node3);

        const paths = graphToPaths(graph);
        const path = paths[0];
        const pathCoordinates = path.geometry.coordinates;

        expect(pathCoordinates.length).to.equal(3);
        expect(pathCoordinates[0]).to.deep.equal(point1);
        expect(pathCoordinates[1]).to.deep.equal(point2);
        expect(pathCoordinates[2]).to.deep.equal(point3);
    });

    it ('should return three distinct paths', () => {
        const graph = getTestGraph(8, 3);
        const paths = graphToPaths(graph);
        expect(paths.length).to.equal(3);
    })
});
