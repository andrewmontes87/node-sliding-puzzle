
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
  const puzzleFlat = validateInputAsFlatList(puzzleString);

  if (!puzzleFlat) return { error: 'input must be a comma-separated string of integers 0-8' };  
  //  or 0-15

  const dim = findAndValidateDimensions(puzzleFlat);

  if (!dim) return { error: 'puzzle must have dimensions of 3x3, consisting of the integers 0-8' }; 
  //  of 4x4  or 0-15

  const puzzleBoard = formatStringInputAs2DMatrix(puzzleFlat, dim);
  const empty = findEmptyPiece(puzzleBoard, dim);
  const solutionBoard = buildSolutionMatrix(dim);

  const init = new Node(0, puzzleBoard, empty[0], empty[1], 0);
  const goal = new Node(0, solutionBoard, dim - 1, dim - 1, 0);

  const startTime = new Date();

  const astar = new AStar(init, goal, 0);

  const endTime = new Date();
  const elapsedTime = endTime - startTime;

  return {
    puzzle: puzzleString,
    solution: astar.path,
    time: elapsedTime,
    depth: astar.depth,
    size: astar.size
  };      
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


// find the dimensions of a submitted puzzle
function findAndValidateDimensions(puzzleFlat) {
  const dim = Math.sqrt(puzzleFlat.length);
  if (dim === 3) {  // turning off  || dim === 4 for now because too slow
    return dim;
  } else {
    return null;
  }
}

// make sure the input string is valid
// and shape it as a flat list
function validateInputAsFlatList(puzzleString) {
  // convert string to list of ints
  const puzzleFlat = puzzleString.split(',').map( (item) => {
    return parseInt(item);
  });

  // check if all the returned elements are integers
  const allIntegers = puzzleFlat.every( (element, index, array) => {
    return Number.isInteger(element);
  });
  if (!allIntegers) return null;

  // check if it's the correct integers
  // first create a flat list of correct ints
  const goalFlat = [];
  for (let ix = 0; ix < puzzleFlat.length; ix++) {
    goalFlat.push(ix);
  }
  // then clone and sort the flat puzzle list
  const cloneFlat = JSON.parse(JSON.stringify(puzzleFlat));
  cloneFlat.sort( (ax, bx) => {
    return ax - bx;
  });
  // then check if the two flat lists match
  const validIntegers = cloneFlat.toString() == goalFlat.toString();
  // if not, we don't have the same set of ints
  // and will never be able to find a path between puzzle and goal
  if (!validIntegers) return null;

  return puzzleFlat;
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

