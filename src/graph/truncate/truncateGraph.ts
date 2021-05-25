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

    for (const node of graph.getNodes()) {
        node.insideZone = booleanPointInPolygon(node.point, zone);
    }

    return graph;
}
