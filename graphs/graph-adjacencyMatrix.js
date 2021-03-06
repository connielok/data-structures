// undirected graph using adjacency matrix

/*
ex adjacency matrix
  //        A
  //      /   \
  //     B    C
  //    /      \
  //   D-------E
  //    \     /
  //       F

      A  B  C  D  E  F
    [
  A  [0, 1, 1, 0, 0, 0],
  B  [1, 0, 0, 1, 0, 0],
  C  [1, 0, 0, 0, 1, 0],
  D  [0, 1, 0, 0, 1, 1],
  E  [0, 0, 1, 1, 0, 1],
  F  [0, 0, 0, 1, 1, 0]
    ]
*/

class Graph {
  constructor(numVertices = 6) {
    this.adjacencyMatrix = new Array(numVertices)
      .fill()
      .map(() => new Array(numVertices).fill(0));
    this.vertices = new Map();
  }

  // O(1) time complexity
  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      const idx = this.vertices.size;
      this.vertices.set(vertex, idx);
    }
  }

  // O(1) time complexity
  addEdge(vertex1, vertex2) {
    const idx1 = this.vertices.get(vertex1);
    const idx2 = this.vertices.get(vertex2);
    if (idx1 !== undefined && idx2 !== undefined) {
      this.adjacencyMatrix[idx1][idx2] = 1;
      this.adjacencyMatrix[idx2][idx1] = 1;
    } else {
      throw new Error('Vertex does not exist in graph.');
    }
  }

  // O(1) time complexity
  removeEdge(vertex1, vertex2) {
    const idx1 = this.vertices.get(vertex1);
    const idx2 = this.vertices.get(vertex2);
    if (idx1 !== undefined && idx2 !== undefined) {
      this.adjacencyMatrix[idx1][idx2] = 0;
      this.adjacencyMatrix[idx2][idx1] = 0;
    } else {
      throw new Error('Vertex does not exist in graph.');
    }
  }

  // O(v^2) time complexity where v is number of vertices
  removeVertex(vertex) {
    const idx = this.vertices.get(vertex);
    if (idx !== undefined) {
      this.adjacencyMatrix.forEach((row) => {
        row.splice(idx, 1);
      });
      this.adjacencyMatrix.splice(idx, 1);
      this.vertices.delete(vertex);
      for (let [key, value] of this.vertices) {
        if (value > idx) {
          this.vertices.set(key, value - 1);
        }
      }
    } else {
      throw new Error('Vertex does not exist in graph.');
    }
  }

  // depth first search traversal
  // use stack data structure
  // continue following all neighbors of a node before going to "sibling" neighbor
  dfs(vertex, cb, visited = {}) {
    const idx = this.vertices.get(vertex);
    if (idx !== undefined) {
      const keys = Array.from(this.vertices.keys());
      cb(keys[idx]);
      visited[idx] = true;
      const row = this.adjacencyMatrix[idx];
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 1 && !visited[i]) {
          this.dfs(keys[i], cb, visited);
        }
      }
    } else {
      throw new Error('Vertex does not exist in graph.');
    }
  }

  // breadth first search traversal
  // use queue data structure
  // visit neighbors at current depth (row) first
  bfs(vertex, cb) {
    const idx = this.vertices.get(vertex);
    if (idx !== undefined) {
      const keys = Array.from(this.vertices.keys());
      const queue = [idx];
      const visited = { [idx]: true };

      while (queue.length) {
        const currIdx = queue.shift();
        const row = this.adjacencyMatrix[currIdx];

        for (let i = 0; i < row.length; i++) {
          if (row[i] === 1 && !visited[i]) {
            queue.push(i);
            visited[i] = true;
          }
        }

        cb(keys[currIdx]);
      }
    } else {
      throw new Error('Vertex does not exist in graph.');
    }
  }
}

module.exports = Graph;
