import {DirectedAcyclicGraph} from "typescript-graph";
import {newPointNodeGraph, PointNode} from "../../src/graph/PointNode";

export function getTestGraph (nodesCount: number, pathsCount: number): DirectedAcyclicGraph<PointNode> {
    if (nodesCount < 2) throw new Error();

    const graph = newPointNodeGraph();

    for (let c=1; c<pathsCount+1; c++) {
        const index = 42 * c;
        const firstPosition = [index, index];
        let currentNode = graph.insert(new PointNode(firstPosition));

        for (let i=1; i<nodesCount+1; i++) {
            const currentPosition = [index+i, index+i];
            const newNode = graph.insert(new PointNode(currentPosition));
            graph.addEdge(currentNode, newNode);
            currentNode = newNode;
        }
    }

    return graph;
}
