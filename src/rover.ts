
export class Grid {
    rovers: Rover[][];

    constructor(x: number, y: number) { 
        this.rovers = [];
        for (let i = 0; i < x; i++) {
            this.rovers.push([]);
            for (let j = 0; j < y; j++) {
                this.rovers[i].push(null);
            }
        }
    }

    public addRover(x: number, y: number, rover: Rover) {
        if (!this.isSpaceEmpty(x, y)) {
            console.log('A rover is already in that position')
            return false;
        }

        if (this.isOutOfBounds(x, y)) {
            console.log('That location is out of bounds');
            return false;
        }

        this.rovers[x][y] = rover;

        return true;
    }

    public isSpaceEmpty(x: number, y: number) {
        return this.rovers[x][y] === null;        
    }

    public isOutOfBounds(x: number, y: number) {
        return x < 0 || x > this.rovers.length || y < 0 || y > this.rovers[0].length;
    }

    public printRovers() {
        const rovers = [];
        this.rovers.forEach((column) => {
            column.forEach((space) => {
                if (space !== null) {
                    rovers.push(space)
                }
            })
        });

        rovers.sort((a, b) => a.id - b.id).forEach((rover) => {
            console.log(rover.toString(this));
        });
    }

    public getRoverById(id: number) {
        let roverFound = null;
        this.rovers.forEach((column) => {
            column.forEach((space) => {              
                if (space !== null && space.id === id) {
                    roverFound = space;
                }
            })
        });

        return roverFound;
    }

    public getRoverLocationById(id: number) {
        let coordinates = null;
        this.rovers.forEach((column, i) => {
            column.forEach((space, j) => {
                if (space !== null && space.id === id) {
                    coordinates = [i, j];
                }
            })
        });

        return coordinates;
    }

    public moveRover(x: number, y: number, newX: number, newY: number) {
        if (this.isOutOfBounds(newX, newY)) {
            this.rovers[x][y].loseRobot();
            return;
        }

        if (!this.isSpaceEmpty(newX, newY)) {
            return;
        }

        this.rovers[newX][newY] = this.rovers[x][y];
        this.rovers[x][y] = null;
    }

    public executeInstructions(roverId: number) {
        const rover = this.getRoverById(roverId);
        rover.executeInstructions(this);
        rover.instructions = '';
    }
}

export class Rover {
    id: number;
    orientation: string;
    isLost: boolean;
    instructions: string;
    
    public constructor(id: number, orientation: string, instructions: string) {
        this.id = id;
        this.orientation = orientation;
        this.isLost = false;
        this.instructions = instructions;
    }

    public loseRobot() {
        this.isLost = true;
    }

    private isRobotLost() {
        return this.isLost;
    }


    private turnRover(left: boolean) {
        const directions = ['N', 'E', 'S', 'W'];

        // +4 to eliminate case of negative indexes
        const currentDirectionIndex = directions.indexOf(this.orientation) + 4;
        let newDirectionIndex: number;

        if (left) {
            newDirectionIndex = (currentDirectionIndex - 1) % 4;
        } else {
            newDirectionIndex = (currentDirectionIndex + 1) % 4;
        }

        this.orientation = directions[newDirectionIndex]
    }

    public moveForward(grid: Grid) {
        const [currentX, currentY] = grid.getRoverLocationById(this.id);
        
        if (currentX === null || currentY === null) {
            return;
        }

        let newX = currentX;
        let newY = currentY;


        switch (this.orientation) {
            case 'N':
                newY += 1;
                break;
            case 'E':
                newX += 1;
                break;
            case 'S':
                newY -= 1;
                break;
            case 'W':
                newX -= 1;
                break;
        }

        grid.moveRover(currentX, currentY, newX, newY);
    }

    private executeInstruction(instruction: string, grid: Grid) {
        switch (instruction) {
            case 'F':
                this.moveForward(grid);
                break;
            case 'L':
                this.turnRover(true);
                break;
            case 'R':
                this.turnRover(false);
                break;
        }
    }

    public executeInstructions(grid: Grid) {
        Array.from(this.instructions).forEach((instruction) => {
            if (this.isRobotLost()) {
                return;
            }
            this.executeInstruction(instruction, grid);
        })
    }

    public toString(grid: Grid) {
        const [currentX, currentY] = grid.getRoverLocationById(this.id) ?? [-1, -1];
        return '(' + currentX + ', ' + currentY + ', ' + this.orientation + ')' + (this.isLost ? ' LOST' : '');
    }
}

export function mars(gridX: number, gridY: number) {
    const grid = new Grid(gridX, gridY);

    grid.addRover(2, 3, new Rover(1, 'N', 'FLLFR'));
    grid.addRover(1, 0, new Rover(2, 'S', 'FFRLF'));


    grid.executeInstructions(1);
    grid.executeInstructions(2);

    grid.printRovers();

}

mars(4, 8);