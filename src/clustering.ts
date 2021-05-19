import {Feature, LineString, Polygon} from "@turf/helpers";
import {PointNode} from "./graph/PointNode";
import {pathsToGraph} from "./graph/conversion/pathsToGraph";
import {DirectedAcyclicGraph} from "typescript-graph";
import {graphToPaths} from "./graph/conversion/graphToPaths";
import {truncateGraph} from "./graph/truncate/truncateGraph";


/**
 * Clusters a bunch of paths using random-picked lines.
 */

export function clusterPaths (
    paths: Feature<LineString>[],
    zoneOfInterest: Feature<Polygon>
): Feature<LineString>[]
{
    if (paths.length < 2)
        throw new RangeError('Input paths array must contain at least two paths.');

    const inputGraph: DirectedAcyclicGraph<PointNode> = pathsToGraph(paths);
    const truncatedGraph = truncateGraph(inputGraph, zoneOfInterest);

    // TODO cluster/split steps

    return graphToPaths(truncatedGraph);
}
