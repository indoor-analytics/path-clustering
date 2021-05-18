import {Feature, LineString} from "@turf/helpers";
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

    return [];
}
