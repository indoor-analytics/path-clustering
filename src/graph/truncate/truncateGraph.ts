import {DirectedAcyclicGraph} from "typescript-graph";
import {PointNode} from "../PointNode";
import {Feature, Polygon} from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

/**
 * Eliminates all nodes outside the given zone of interest.
 *
 * @param graph paths graph to be truncated
 * @param zone zone of interest
 */
export function truncateGraph (
    graph: DirectedAcyclicGraph<PointNode>,
    zone: Feature<Polygon>
): DirectedAcyclicGraph<PointNode> {

    let hasNodesInsideZone = false;

    for (const node of graph.getNodes()) {
        const result = booleanPointInPolygon(node.point, zone);
        node.insideZone = result;
        hasNodesInsideZone = hasNodesInsideZone || result;
    }

    if (!hasNodesInsideZone)
        throw new RangeError('All graph nodes are located outside zone of interest.');

    return graph;
}
