import {pathsToGraph} from "../../../../src/graph/conversion/pathsToGraph";
import {flandersRuns} from "../../../features/runs";
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

    xit ('should truncate a graph with a path beginning outside zone');
    xit ('should truncate a graph with a path ending outside zone');
    xit ('should truncate a graph with a path going outside, then inside zone');
    xit ('should truncate a graph with a path both starting and ending outside zone');
    xit ('should truncate a graph with a path crossing zone border several times');
    xit ('should throw if entire graph is outside zone');
});
