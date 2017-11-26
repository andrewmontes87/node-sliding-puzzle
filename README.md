# node-sliding-puzzle

A web service to solve sliding puzzle problems. Test.


## How it works

Implementation of the A* algorithm is based on [this blog post](https://www.smashingmagazine.com/2016/02/javascript-ai-html-sliding-tiles-puzzle/) by Arnaldo Perez Castano.

The webservice accepts input as a CSV string, where a puzzle structured as a 2D matrix:

```
[[4,3,1],
 [5,0,2],
 [7,8,6]]
```

is submitted as:

```
"4,3,1,5,0,2,7,8,6"
```

The puzzle string is submitted as the `p` parameter using a GET request:

```
/api/v1/puzzle?p=4,3,1,5,0,2,7,8,6
```

Results are returned as JSON:

```
{
  "puzzle": "4,3,1,5,0,2,7,8,6",
  "solution": "URDLLURRDD",
  "time": 35,
  "depth": 10,
  "size": 3
}
```

`solution` string should be interpreted as which pieces to move relative to the empty space in order to make the puzzle match the solved configuration. See [react-sliding-puzzle](https://github.com/andrewmontes87/react-sliding-puzzle) for implementation.


## Development

```
$ npm install
$ npm start
```

The app will be available at http://localhost:3000



## Play with it

Requires python 2.7 and virtualenv.

Set up the virtualenv and install required packages:

```
$ virtualenv venv
$ pip install -r requirements.txt
```

Activate the virtualenv:

```
$ source venv/bin/activate
$ cd notebooks && jupyter notebook
```

Use your web browser to open the "requesting node-sliding-puzzle" notebook.
Change parameters and run the cell to see results.

When finished, deactivate the virtualenv:

```
$ deactivate
```



## Deploy

`git push heroku master`

http://node-sliding-puzzle.herokuapp.com/
