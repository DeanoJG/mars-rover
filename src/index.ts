import {rl, question} from './question';
import { Rover } from './Rover';
import { Grid } from './Grid';
import readline from 'readline';

async function main() {
    const gridSize = (await question("Enter the grid size in the format 'X Y':"))
        .trim().split(' ').map(Number);

    const grid = new Grid(gridSize[0], gridSize[1]);
    
    while (true) {
        const rover = (await question("Enter the rover's position, start orientation and instructions in the format '(X, Y, O) LFRFF': ")).trim().split(' ');
        const xPosition = parseInt(rover[0].replace('(', '').replace(',', ''));
        const YPosition = parseInt(rover[1].replace(',', ''));
        const orientation = rover[2].replace(')', '');
        const instructions = rover[3].trim();
        const idNumber = grid.roverCount() + 1;

        const newRover = new Rover(idNumber, orientation, instructions);
        grid.addRover(xPosition, YPosition, newRover);

        const more = await question("Do you want to add another rover? Enter 'n' to stop or anything else to continue: ");

        if (more === 'n') {
            break;
        }
    }

    grid.runRovers();
    grid.printRovers();

    rl.close();
}

main();