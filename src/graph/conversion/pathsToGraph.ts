import {Feature, LineString, point} from "@turf/helpers";
import {PointNode} from "../PointNode";
import {DirectedAcyclicGraph} from "typescript-graph";
const hash = require('object-hash');


/**
 * Creates a directed graph from a bunch of paths.
 *
 * @param paths input paths
 */
export function pathsToGraph (
    paths: Feature<LineString>[]
): DirectedAcyclicGraph<PointNode> {
    const graph = new DirectedAcyclicGraph<PointNode>();

    for (const path of paths) {
        const positions = JSON.parse(JSON.stringify(path.geometry.coordinates));
        const firstPosition = positions.shift()!;
        let currentNode = graph.insert({point: point(firstPosition), hash: hash(firstPosition)});
        for (const position of positions) {
            const node = graph.insert({point: point(position), hash: hash(position)});
            graph.addEdge(currentNode, node);
            currentNode = node;
        }
    }

    return graph;
}
