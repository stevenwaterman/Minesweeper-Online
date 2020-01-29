# Minesweeper Constrained

This is a version of the game [minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game)) which forces you to use constraint-based solving.

A live version is hosted at http://minesweeper.stevenwaterman.uk

It was created for use in an [NE:Tech talk](https://www.meetup.com/NE-Tech/events/267298193/), "Solving Minesweeper in Polynomial time: a talk written before learning that minesweeper is NP-Complete".
Watch that talk on [YouTube](https://www.youtube.com/watch?v=2ibiA5TEsxw)!

## Quick-Start

1. `Git clone`
2. `npm i`
3. `npm run build`
4. open `build/index.html`

## Instructions:

1. Clicking a cleared cell selects the constraint created by that cell.
2. If the constraint is clearable or flaggable, clicking it will perform that action.
3. After selecting constraints, use the buttons under the grid to perform constraint actions.
4. Move the mouse to the top-right of the screen to access the options panel.

### Constraint Actions

A constraint is a set of cells, a min number of mines, and a max number of mines.
The constraint created by a cell on the board has `minMines = maxMines = cellNumber`.
At all times, min and max mines are clamped between `0` to `cells.length`.

When a constraint is created, it is placed at the bottom of the screen under the `Complex Constraints` section.
You must enable subtraction, reduction, and merging in the options panel.

**Subtraction** is performed with two constraints selected.
One constraint must be a strict subset of the other.

Given constraints `Big` and `Small`, where `cells(Big).length > cells(Small).length`, produce constraint `C`:

* `cells(C) = cells(Big) - cells(Small)`
* `maxMines(C) = maxMines(Big) - minMines(Small)`
* `minMines(C) = minMines(Big) - maxMines(Small)`

Given `Big: cells {a,b,c,d}, 1 to 2 mines` and `Small: cells {a,b,c}, 0 to 1 mines`, produces `C: cells {d}, 1 mine`

**Reduction** is performed with one constraint selected.

Given constraint `A`, for each cell `c` in `cells(A)`, produce `C`:

* `cells(C) = cells(A) - {c}`
* `maxMines(C) = maxMines(A)`
* `minMines(C) = minMines(A) - 1`

Given `A: cells {a,b,c,d}, 2 to 3 mines`, produces:

* `B: cells{b,c,d}, 1 to 3 mines`
* `C: cells{a,c,d}, 1 to 3 mines`
* `D: cells{a,b,d}, 1 to 3 mines`
* `E: cells{a,b,c}, 1 to 3 mines`

**Merging** is performed with two constraints selected.

Given constraints `A` and `B`, where `cells(A) = cells(B), and minMines(A) > minMines(B) or maxMines(A) < maxMines(B)`, produce constraint `C`:

* `cells(C) = cells(A)` (`== cells(B)`)
* `maxMines(C) = min(maxMines(A), maxMines(B))`
* `minMines(C) = max(minMines(A), minMines(B))`

Given `A: cells {a,b}, 0 to 1 mine` and `B: cells {a,b}, 1 to 2 mines`, produces `C: cells {a,b}, 1 mine`

### Options

The option panel contains the following options:

* **Show Remaining:** Each number on the board shows the remaining number of mines, not the total number
* **Cheat Mode:** Highlight constraints that can be trivially cleared/flagged
* **Auto Zero:** When a cell displays number 0, automatically clear the cells around it
* **Auto Clear:** Automatically clear any trivial constraints. Slow on large boards.
* **Auto Flag:** Automatically flag any trivial constraints. Slow on large boards.
* **Resolve Complex:** When performing a constraint action, clear/flag the result if trivial
* **Show Subtraction:** Show the subtract constraint action
* **Show Reduction:** Show the reduce constraint action
* **Show Merging:** Show the merge constraint action
* **Show Board Constraint:** Show the constraint created by knowledge of the total number of mines on the board

You can load some hard-coded boards:

* **Real:** The board used in the talk. Requires all techniques (maybe not merging)
* **Basic Training:** Can be solved with just clearing/flagging
* **Subtraction Training 1/2:** Requires use of subtraction
* **Reduction Training 1/2:** Requires use of reduction
* **Whole Board Training:** Requires use of board constraint

You can also generate a new board.
It is not guaranteed to be solvable, and guessing is not supported.

## Technology

The site is created with [React-Redux](https://github.com/reduxjs/react-redux) in [TypeScript](https://www.typescriptlang.org/), using [create-react-app](https://create-react-app.dev/docs/adding-typescript/).

The implementation is embarassingly inefficient, as it was made in a rush for one specific talk.

It would benefit a lot from the addition of [redux-thunk](https://github.com/reduxjs/redux-thunk) to retrieve state in action creators.
Currently, everything that *could* fire an action loads all the state it would need to do so, even if it never fires that action.
That means that every cell uses selectors to retrieve (create) the constraint for that cell.
Redux-Thunk would allow you to only create the constraints when needed.

The auto-zero, auto-clear, and auto-flag options are also hilariously inefficient.
Essentially, each cell's render method checks to see if its constraint could be cleared.
To clear `n` cells in a cascading manner, the render method gets called `n` times, meaning constraints are generated for the entire board `n` times.
It would be better to use [redux-saga](https://github.com/redux-saga/redux-saga) to continue dispatching actions until there's nothing left to do.
