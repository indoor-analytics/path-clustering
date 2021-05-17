import {Feature, Point} from "@turf/helpers";

export type PointNode = {
    hash: string;
    point: Feature<Point>;
}
