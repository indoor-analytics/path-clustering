import {Feature, LineString} from "@turf/helpers";
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
    return new DirectedGraph<PointNode>();
}