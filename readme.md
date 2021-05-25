# @indoor-analytics/path-clustering

Clusters a bunch of paths with graph representation.

## How to use

Add this line to `~/.npmrc` to set up the package registry:
```shell
@indoor-analytics:registry=https://npm.pkg.github.com/indoor-analytics
```

In your project, install the package:
```shell
npm i --save @indoor-analytics/path-clustering
```

Import the function in your code:
```javascript
import {clusterPaths} from '@indoor-analytics/path-clustering';
```


## Algorithm formalization

* Convert all inputs path into a graph;
* Truncate graph nodes regarding the provided zone of interest;
* **cluster** or **split** graph at will;
* Convert graph remaining nodes into paths.

#### Cluster

TODO

#### Split

TODO
