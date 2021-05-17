import {Feature, LineString} from "@turf/helpers";
import DirectedGraph from "typescript-graph/dist/types/directedGraph";
import {PointNode} from "./graph/PointNode";
import {pathsToGraph} from "./graph/conversion/pathsToGraph";


/**
 * Clusters a bunch of paths using random-picked lines.
 */

export function clusterPaths (
    paths: Feature<LineString>[]
): Feature<LineString>[]
{
    if (paths.length < 2)
        throw new RangeError('Input paths array must contain at least two paths.');

    const inputGraph: DirectedGraph<PointNode> = pathsToGraph(paths);

    return paths;
}
