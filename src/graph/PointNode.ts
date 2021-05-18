import {Feature, Point} from "@turf/helpers";
import {DirectedAcyclicGraph} from "typescript-graph";

export type PointNode = {
    hash: string;
    point: Feature<Point>;
}


/**
 * Creates an empty graph with an identity function linking position hashes to nodes.
 */
export function newPointNodeGraph(): DirectedAcyclicGraph<PointNode> {
    return new DirectedAcyclicGraph<PointNode>((node) => node.hash);
}
