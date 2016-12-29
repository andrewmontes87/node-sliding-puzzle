# node-sliding-puzzle

A web service to solve sliding puzzle problems.


## How it works

Implementation of the A* algorithm is based on [this blog post](https://www.smashingmagazine.com/2016/02/javascript-ai-html-sliding-tiles-puzzle/) by Arnaldo Perez Castano.

The webservice accepts input as a CSV string, where a puzzle:
`[[1,2,3],[4,5,6],[7,8,0]]`
is submitted as:
`"1,2,3,4,5,6,7,8,0"`

Results are returned as a string, to be interpreted as instructions to solve the puzzle.
`LLDRRULD` 
See react-sliding-puzzle for how to translate the solution string to board movements.


## Play with it

Requires python 2.7 and virtualenv.

```
source venv/bin/activate
cd notebooks && jupyter notebook
```

Use your web browser to open the "requesting node-sliding-puzzle" notebook.
Change parameters and run the cell to see results.


## Deploy

`git push heroku master`

http://node-sliding-puzzle.herokuapp.com/