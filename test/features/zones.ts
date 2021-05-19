import {Feature, Polygon, polygon} from "@turf/helpers";

export const citadel = (): Feature<Polygon> => polygon([
    [
        [
            3.0382776260375977,
            50.63713226428859
        ],
        [
            3.0512380599975586,
            50.63713226428859
        ],
        [
            3.0512380599975586,
            50.64535143619798
        ],
        [
            3.0382776260375977,
            50.64535143619798
        ],
        [
            3.0382776260375977,
            50.63713226428859
        ]
    ]
]);

export const flandersStation = (): Feature<Polygon> => polygon([
    [
        [
            3.069777488708496,
            50.6344035624352
        ],
        [
            3.0749595165252686,
            50.6344035624352
        ],
        [
            3.0749595165252686,
            50.63730918213233
        ],
        [
            3.069777488708496,
            50.63730918213233
        ],
        [
            3.069777488708496,
            50.6344035624352
        ]
    ]
]);
