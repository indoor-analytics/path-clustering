import {Feature, LineString} from "@turf/helpers";
import DirectedGraph from "typescript-graph/dist/types/directedGraph";
import {PointNode} from "../PointNode";


/**
 * Creates a directed graph from a bunch of paths.
 *
 * @param paths input paths
 */
export function pathsToGraph (
    paths: Feature<LineString>[]
): DirectedGraph<PointNode> {
    return new DirectedGraph<PointNode>();
}
