import {Feature, point, Point, Position} from "@turf/helpers";
import {DirectedAcyclicGraph} from "typescript-graph";
import {sha1} from "object-hash";

export class PointNode {
    public hash: string;
    public point: Feature<Point>;

    constructor (position: Position) {
        this.hash = sha1(position);
        this.point = point(position);
    }
}


/**
 * Creates an empty graph with an identity function linking position hashes to nodes.
 */
export function newPointNodeGraph(): DirectedAcyclicGraph<PointNode> {
    return new DirectedAcyclicGraph<PointNode>((node) => node.hash);
}
