By: Dean Lobo

Date: 01/05/2024

# Getting started:

Pre reqs:
- Node v18
- Yarn

## Get it running:
1. `nvm use`
2. `yarn install`
3. `yarn start:dev`

## Run unit tests:
- `yarn test`

# How it works:

- `Grid` object keeps track of its length (int), width (int) and a list of rovers within the grid (array of `Rover` objects).
- `Rover` object keeps track of its location in the grid (x and y coordinates stored as int), orientation (string/char), instructions (string) and whether the robot is lost (bool)
- `Mars` function takes grid size and a list of rovers as input, creates the grid, adds the rovers and then executes their instructions.
- `question.ts` has a function to ask the user a question through the CLI.
- `index.ts` asks users to input rovers and then executes the world.


# Notes and Improvements:
1. I was short for time so I took the `question.ts` code from an answer to this [Stackoverflow question](https://stackoverflow.com/questions/33858763/console-input-in-typescript) and modified it. This code is used to provide command line prompts - this is not something that I've done before with Typescript. I do not claim to have written that part but the rest of the code is mine.
2. The CLI interface and implementation is quite janky. It assumes the user enters the input correctly. I would improve this by either adding validation against the CLI input, or creating a GUI that forces users to only enter the required data in the correct format.
3. If I had more time I would write a complete exhaustive list of unit tests (particularly for the `question.ts` and `index.ts` files) and then look at adding more types of tests from the testing pyramid, e.g. smoke, integration and functional/E2E tests.
4. The program would also benefit from a GUI which shows the Rovers before and after executing their instructions.
5. I have assumed that two or more rovers cannot be on the same coordinate. So if there is an occupied space, it will not allow the rover to move into the space, however it will continue executing the other commands. During intiation the user is also unable to add a rover to a space which is occupied and prints an error message. This behaviour should be clarified.

# Iteration 2

In the spirit of continuous improvement, I had a second stab at this over the weekend and changed my implementation to store the Rovers locations in a 2D array. 

I believe that this is a better solution because we can instantly check the status of a coordinate (whether it's filled or not). In the previous iteration (currently on main branch), each Rover stored its coordinates. This meant we were having to iterate over the array of Rovers each time we wanted to execute an instruction to verify that no other Rover was sat on the space.

As executing instructions is the main function of the rover, it was a costly exercise. As the scale of the map and number of rovers grows, the time taken to iterate through to modify coordinates would increase drastically.

[You can view my 2nd attempt in this PR here](https://github.com/DeanoJG/mars-rover/pull/1)