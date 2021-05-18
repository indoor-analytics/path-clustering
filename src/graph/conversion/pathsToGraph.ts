import {Feature, LineString} from "@turf/helpers";
import {newPointNodeGraph, PointNode} from "../PointNode";
import {DirectedAcyclicGraph} from "typescript-graph";


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
        let currentNode = graph.insert(new PointNode(firstPosition));
        for (const position of positions) {
            const node = graph.insert(new PointNode(position));
            graph.addEdge(currentNode, node);
            currentNode = node;
        }
    }

    return graph;
}
