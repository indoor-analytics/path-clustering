import {pathsToGraph} from "../../../../src/graph/conversion/pathsToGraph";
import {
    flandersRuns, runCrossingZoneBorderSeveralTimes,
    runEndingOutsideZone,
    runGoingOutsideThenInsideZone, runStartingAndEndingOutsideZone,
    runStartingOutsideZone
} from "../../../features/runs";
import {truncateGraph} from "../../../../src/graph/truncate/truncateGraph";
import {citadel, flandersStation} from "../../../features/zones";
import { expect } from "chai";

describe ('truncateGraph', () => {
    // https://gist.github.com/Alystrasz/ed61bac17ab98373986c5eae54b798ed
    it ("should return input graph if it's strictly included in zone", () => {
        const graph = pathsToGraph(flandersRuns());
        const truncatedGraph = truncateGraph(graph, flandersStation());
        expect(truncatedGraph).to.deep.equal(graph);
    });

    // https://gist.github.com/Alystrasz/07c1f05ce74f590369fd98e059610382
    it ('should truncate a graph with a path beginning outside zone', () => {
        const path = runStartingOutsideZone();
        expect(path.geometry.coordinates.length).to.equal(8);

        const graph = pathsToGraph([path]);
        const truncatedGraph = truncateGraph(graph, flandersStation());

        // six path locations inside zone + one zone intersection
        expect(truncatedGraph.getNodes().filter(node => node.insideZone).length).to.equal(6 + 1);
    });

    // https://gist.github.com/Alystrasz/fc97417fecd19369fdbaa94908cafd3a
    it ('should truncate a graph with a path ending outside zone', () => {
        const path = runEndingOutsideZone();
        expect(path.geometry.coordinates.length).to.equal(9);

        const graph = pathsToGraph([path]);
        const truncatedGraph = truncateGraph(graph, flandersStation());

        // five path locations inside zone + one intersection
        expect(truncatedGraph.getNodes().filter(node => node.insideZone).length).to.equal(5 + 1);
    });

    // https://gist.github.com/Alystrasz/8cfc1fc58b9cd204911d0d7dea0875a6
    it ('should truncate a graph with a path going outside, then inside zone', () => {
        const path = runGoingOutsideThenInsideZone();
        expect(path.geometry.coordinates.length).to.equal(6);

        const graph = pathsToGraph([path]);
        const truncatedGraph = truncateGraph(graph, flandersStation());

        // four path locations inside zone + two intersections
        expect(truncatedGraph.getNodes().filter(node => node.insideZone).length).to.equal(4 + 2);
    });

    // https://gist.github.com/Alystrasz/919f978c1f1e98de229660c57659278e
    it ('should truncate a graph with a path both starting and ending outside zone', () => {
        const path = runStartingAndEndingOutsideZone();
        expect(path.geometry.coordinates.length).to.equal(7);

        const graph = pathsToGraph([path]);
        const truncatedGraph = truncateGraph(graph, flandersStation());

        // we expect 3 path locations + 2 intersection locations with zone edge
        expect(truncatedGraph.getNodes().filter(node => node.insideZone).length).to.equal(5);
    });

    // https://gist.github.com/Alystrasz/5e4368441709a8e46ac33dea3c94ffcc
    it ('should truncate a graph with a path crossing zone border several times', () => {
        const path = runCrossingZoneBorderSeveralTimes();
        expect(path.geometry.coordinates.length).to.equal(12);

        const graph = pathsToGraph([path]);
        const truncatedGraph = truncateGraph(graph, flandersStation());

        // six path locations inside zone + six intersections
        expect(truncatedGraph.getNodes().filter(node => node.insideZone).length).to.equal(6 + 6);
    });

    it ('should throw if entire graph is outside zone', () => {
        const graph = pathsToGraph(flandersRuns());
        expect(
            () => truncateGraph(graph, citadel())
        ).to.throw(RangeError, 'All graph nodes are located outside zone of interest.');
    });
});
