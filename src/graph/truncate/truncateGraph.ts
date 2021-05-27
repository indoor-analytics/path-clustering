import {DirectedAcyclicGraph} from "typescript-graph";
import {PointNode} from "../PointNode";
import {Feature, Polygon} from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

/**
 * Eliminates all nodes outside the given zone of interest.
 * Adds nodes on intersections between path and zone edges.
 *
 * @param graph paths graph to be truncated
 * @param zone zone of interest
 */
export function truncateGraph (
    graph: DirectedAcyclicGraph<PointNode>,
    zone: Feature<Polygon>
): DirectedAcyclicGraph<PointNode> {

    let hasNodesInsideZone = false;

    // marking nodes outside zone
    for (const node of graph.getNodes()) {
        const result = booleanPointInPolygon(node.point, zone);
        node.insideZone = result;
        hasNodesInsideZone = hasNodesInsideZone || result;
    }

    if (!hasNodesInsideZone)
        throw new RangeError('All graph nodes are located outside zone of interest.');

    // inserting intersection nodes when path enters/exits zone
    const headNodes = graph.topologicallySortedNodes().filter((node) => graph.indegreeOfNode(node.hash) === 0);
    const pathGraphs = headNodes.map((headNode: PointNode) => graph.getSubGraphStartingFrom(headNode.hash));
    for (const graph of pathGraphs) {
        const nodes = graph.topologicallySortedNodes();
        for (let i=1; i<nodes.length-1; i++) {
            const previousNode = nodes[i-1];
            const currentNode = nodes[i];

            if (!previousNode.insideZone && currentNode.insideZone) {
                // TODO insert intersection node between previous and current nodes
            } else if (previousNode.insideZone && !currentNode.insideZone) {
                // TODO insert intersection node between previous and current nodes
            } else if (!previousNode.insideZone && !currentNode.insideZone) {
                // TODO check if there are zone intersections
                // TODO add them all between previous and current nodes
            }
        }
    }

    return graph;
}
