import {pathsToGraph} from "../../../../src/graph/conversion/pathsToGraph";
import {flandersRuns, runStartingOutsideZone} from "../../../features/runs";
import {truncateGraph} from "../../../../src/graph/truncate/truncateGraph";
import {flandersStation} from "../../../features/zones";
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

        // two path locations are outside zone
        expect(truncatedGraph.getNodes().length).to.equal(6);
    });

    xit ('should truncate a graph with a path ending outside zone');
    xit ('should truncate a graph with a path going outside, then inside zone');
    xit ('should truncate a graph with a path both starting and ending outside zone');
    xit ('should truncate a graph with a path crossing zone border several times');
    xit ('should throw if entire graph is outside zone');
});
