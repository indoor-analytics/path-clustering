import {Feature, LineString, point} from "@turf/helpers";
import {newPointNodeGraph, PointNode} from "../PointNode";
import {DirectedAcyclicGraph} from "typescript-graph";
import {sha1} from "object-hash";


/**
 * Creates a directed graph from a bunch of paths.
 *
 * @param paths input paths
 */
export function pathsToGraph (
    paths: Feature<LineString>[]
): DirectedAcyclicGraph<PointNode> {
    const graph = newPointNodeGraph();

    for (const path of paths) {
        const positions = JSON.parse(JSON.stringify(path.geometry.coordinates));
        const firstPosition = positions.shift()!;
        let currentNode = graph.insert({point: point(firstPosition), hash: sha1(firstPosition)});
        for (const position of positions) {
            const node = graph.insert({point: point(position), hash: sha1(position)});
            graph.addEdge(currentNode, node);
            currentNode = node;
        }
    }

    return graph;
}
