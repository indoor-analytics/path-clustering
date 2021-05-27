import {Feature, lineString, LineString, Position} from "@turf/helpers";
import {PointNode} from "../PointNode";
import {DirectedAcyclicGraph} from "typescript-graph";


/**
 * Extract paths from a given graph.
 *
 * @param graph input graph
 */
export function graphToPaths (
    graph: DirectedAcyclicGraph<PointNode>
): Feature<LineString>[] {
    if (graph.getNodes().length === 0)
        throw new Error('Input graph must feature nodes.');

    const headNodes = graph.topologicallySortedNodes().filter((node) => graph.indegreeOfNode(node.hash) === 0);
    const pathGraphs = headNodes.map((headNode: PointNode) => graph.getSubGraphStartingFrom(headNode.hash));

    const paths: Feature<LineString>[] = [];

    pathGraphs.map((graph) => {
        const coordinates: Position[] = [];
        for (const node of graph.topologicallySortedNodes()) {
            if (node.insideZone)
                coordinates.push(node.point.geometry.coordinates);
            else {
                if (coordinates.length > 1) {
                    paths.push(lineString(coordinates));
                    coordinates.length = 0;
                }
            }
        }

        if (coordinates.length > 1)
            paths.push(lineString(coordinates));
    });

    return paths;
}
