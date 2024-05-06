import { Grid } from "./Grid";
import { Rover } from "./Rover";

export function mars(gridX: number, gridY: number) {
    const grid = new Grid(gridX, gridY);

    grid.addRover(2, 3, new Rover(1, 'N', 'FLLFR'));
    grid.addRover(1, 0, new Rover(2, 'S', 'FFRLF'));
    
    grid.roverIds.forEach((id) => {
        grid.executeRoverInstructions(id);
    })

    grid.printRovers();

}

mars(4, 8);