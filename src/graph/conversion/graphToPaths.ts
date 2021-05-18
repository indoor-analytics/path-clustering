import {Feature, lineString, LineString} from "@turf/helpers";
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

    return pathGraphs.map((graph) => {
        return lineString(graph.topologicallySortedNodes().map(node => node.point.geometry.coordinates));
    });
}
