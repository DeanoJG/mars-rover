import {rl, question} from './question';
import { Rover, mars } from './Rover';
import readline from 'readline';

async function main() {
    const grid = (await question("Enter the grid size in the format 'X Y':"))
        .trim().split(' ').map(Number);
    
    const rovers:Rover[] = [];

    while (true) {
        const rover = (await question("Enter the rover's position, start orientation and instructions in the format '(X, Y, O) LFRFF': ")).trim().split(' ');
        const xPosition = parseInt(rover[0].replace('(', '').replace(',', ''));
        const YPosition = parseInt(rover[1].replace(',', ''));
        const orientation = rover[2].replace(')', '');
        const instructions = rover[3].trim();
        
        const newRover = new Rover(xPosition, YPosition, orientation, instructions);
        rovers.push(newRover);

        const more = await question("Do you want to add another rover? Enter 'n' to stop or anything else to continue: ");

        if (more === 'n') {
            break;
        }
    }

    mars(grid[0], grid[1], rovers);

    rl.close();
}

main();