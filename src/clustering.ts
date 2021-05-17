import {Feature, LineString} from "@turf/helpers";
import {PointNode} from "./graph/PointNode";
import {pathsToGraph} from "./graph/conversion/pathsToGraph";
import {DirectedAcyclicGraph} from "typescript-graph";


/**
 * Clusters a bunch of paths using random-picked lines.
 */

export function clusterPaths (
    paths: Feature<LineString>[]
): Feature<LineString>[]
{
    if (paths.length < 2)
        throw new RangeError('Input paths array must contain at least two paths.');

    const inputGraph: DirectedAcyclicGraph<PointNode> = pathsToGraph(paths);

    // TODO cluster/split steps

    // TODO rebuild graph into paths

    // TODO remove fake return
    return [paths[0]];
}
