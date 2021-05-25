import {Feature, point, Point, Position} from "@turf/helpers";
import {DirectedAcyclicGraph} from "typescript-graph";
import {sha1} from "object-hash";

export class PointNode {
    public hash: string;
    public point: Feature<Point>;
    public insideZone: boolean;

    constructor (position: Position) {
        this.hash = PointNode.getNodeHash(position);
        this.point = point(position);
        this.insideZone = true;
    }

    static getNodeHash (position: Position): string {
        return sha1(position);
    }
}


/**
 * Creates an empty graph with an identity function linking position hashes to nodes.
 */
export function newPointNodeGraph(): DirectedAcyclicGraph<PointNode> {
    return new DirectedAcyclicGraph<PointNode>((node) => node.hash);
}
