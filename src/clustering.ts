import {Feature, LineString} from "@turf/helpers";


/**
 * Clusters a bunch of paths using random-picked lines.
 */

export function clusterPaths (
    paths: Feature<LineString>[]
): Feature<LineString>[]
{
    if (paths.length < 2)
        throw new RangeError('Input paths array must contain at least two paths.');

    return paths;
}
