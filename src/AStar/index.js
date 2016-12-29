
import Node from './AStarNode';
import AStar from './AStar';

// we want to do this:
// - convert posted string back into a 2-D array
// - use Math.sqrt(arr.length) to find dim
// - build solution board
// - find x,y of empty
// - make Nodes
// const init = new Node(0, puzzleBoard, empty[0], empty[1], 0);
// const goal = new Node(0, solutionBoard, dim - 1, dim - 1, 0);
// - execute AStar
// const astar = new AStar(init, goal, 0);
// - return astar.path

export function getPuzzleJSON(puzzleString) {
  const puzzleFlat = formatStringInputAs1DMatrix(puzzleString);
  const dim = findDimensions(puzzleFlat);
  if (!validateDimensions(dim)) {
    return 'error: pls submit a properly formatted 3x3, 4x4, or 5x5 puzzle';
  } else {
    const puzzleBoard = formatStringInputAs2DMatrix(puzzleFlat, dim);
    const empty = findEmptyPiece(puzzleBoard, dim);
    const solutionBoard = buildSolutionMatrix(dim);

    const init = new Node(0, puzzleBoard, empty[0], empty[1], 0);
    const goal = new Node(0, solutionBoard, dim - 1, dim - 1, 0);

    const astar = new AStar(init, goal, 0);

    return astar.path;      
  }
}


// create a new solved board
function buildSolutionMatrix(dim) {
  const data = [];
  for (let idx = 0; idx < dim; idx++) {
    data.push([]);
    for (let nidx = 1 + (idx * dim); nidx <= dim + (idx * dim); nidx++) {
      data[idx].push(nidx);
    }
  }
  // add empty piece to the end
  data[dim - 1][dim - 1] =  0;
  return data;
}

// maybe not the best function
// find the empty piece on the board
function findEmptyPiece(data, dim) {
  for (let ir = 0; ir < dim; ir++) {
    for (let ic = 0; ic < dim; ic++) {
      if (data[ir][ic] === 0) {
        return [ir, ic];
      }
    }
  }
  return null;
}

// only allow three sizes for now
function validateDimensions(dim) {
  if (dim === 3 || dim === 4 || dim === 5) {
    return dim;
  } else {
    return null;
  }
}

// find the dimensions of a submitted puzzle
function findDimensions(puzzleFlat) {
  const result = Math.sqrt(puzzleFlat.length);
  return validateDimensions(result);
}

function formatStringInputAs1DMatrix(puzzleString) {
  return puzzleString.split(',').map( (item) => {
    return parseInt(item);
  });
}

// helper to format posted puzzle string
function formatStringInputAs2DMatrix(puzzleFlat, dim) {
  let target = [];
  for (let ix = 0; ix < dim; ix++) {
    const start = ix * dim;
    const end = start + dim;
    const row = puzzleFlat.slice(start, end);
    target[ix] = row;
  }
  return target;
}

