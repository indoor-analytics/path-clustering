import {Feature, LineString} from "@turf/helpers";


/**
 * Clusters a bunch of paths using random-picked lines.
 */

export function clusterPaths (
    paths: Feature<LineString>[]
): Feature<LineString>[]
{
    return paths;
}
