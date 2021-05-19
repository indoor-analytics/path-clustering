import {DirectedAcyclicGraph} from "typescript-graph";
import {newPointNodeGraph, PointNode} from "../PointNode";
import {Feature, Polygon} from "@turf/helpers";

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
    return newPointNodeGraph();
}
