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


# Notes and Improvements:
1. I was short for time so I took the `question.ts` code from an answer to this [Stackoverflow question](https://stackoverflow.com/questions/33858763/console-input-in-typescript) and modified it. This code is used to provide command line prompts - this is not something that I've done before with Typescript. I do not claim to have written that part but the rest of the code is mine.
2. The CLI interface and implementation is quite janky. It assumes the user enters the input correctly. I would improve this by either adding validation against the CLI input, or creating a GUI that forces users to only enter the required data in the correct format.
3. I would add unit tests against the methods to ensure that each of them works correctly, followed by some E2E tests to verify the behaviour listed in the task outline is adhered to.
4. The program would also benefit from a GUI which shows the Rovers before and after executing their instructions.
5. I have assumed that two or more rovers cannot be on the same coordinate. So if there is an occupied space, it will not allow the rover to move into the space, however it will continue executing the other commands. This behaviour should be clarified.
6. You will also see some testing I did at the bottom of the Rover.ts file, I hope this makes the useage of the mars function a bit clearer.
