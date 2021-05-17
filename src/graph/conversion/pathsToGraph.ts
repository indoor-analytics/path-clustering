import {Feature, LineString, point} from "@turf/helpers";
import {PointNode} from "../PointNode";
import {DirectedGraph} from "typescript-graph";


/**
 * Creates a directed graph from a bunch of paths.
 *
 * @param paths input paths
 */
export function pathsToGraph (
    paths: Feature<LineString>[]
): DirectedGraph<PointNode> {
    const graph = new DirectedGraph<PointNode>();

    for (const path of paths) {
        const positions = JSON.parse(JSON.stringify(path.geometry.coordinates));
        let currentNode = graph.insert({point: point(positions.shift()!)});
        for (const position of positions) {
            const node = graph.insert({point: point(position)});
            graph.addEdge(currentNode, node);
            currentNode = node;
        }
    }

    return graph;
}
