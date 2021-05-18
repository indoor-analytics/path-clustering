import {PointNode} from "../../../../src/graph/PointNode";
import {expect} from "chai";
import {graphToPaths} from "../../../../src/graph/conversion/graphToPaths";
import {DirectedAcyclicGraph} from "typescript-graph";
import {sha1} from "object-hash";
import {point} from "@turf/helpers";

describe ('graphToPaths', () => {
    it ('should throw with graph having no nodes', () => {
        const graph = new DirectedAcyclicGraph<PointNode>();
        expect(
            () => graphToPaths(graph)
        ).to.throw(Error, 'Input graph must feature nodes.');
    });

    it ('should return one path', () => {
        const graph = new DirectedAcyclicGraph<PointNode>();
        const point1 = [0, 1],
            point2 = [1, 2],
            point3 = [2, 3];
        const node1 = graph.insert({hash: sha1(point1), point: point(point1)}),
            node2 = graph.insert({hash: sha1(point2), point: point(point2)}),
            node3 = graph.insert({hash: sha1(point3), point: point(point3)});
        graph.addEdge(node1, node2);
        graph.addEdge(node2, node3);

        const paths = graphToPaths(graph);
        expect(paths.length).to.equal(1);
    });

    it ('should return one path linking input nodes together', () => {
        const graph = new DirectedAcyclicGraph<PointNode>();
        const point1 = [0, 1],
            point2 = [1, 2],
            point3 = [2, 3];
        const node1 = graph.insert({hash: sha1(point1), point: point(point1)}),
            node2 = graph.insert({hash: sha1(point2), point: point(point2)}),
            node3 = graph.insert({hash: sha1(point3), point: point(point3)});
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
});
