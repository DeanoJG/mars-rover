
export class Grid {
    x: number;
    y: number;
    rovers: Rover[];

    constructor(x: number, y: number) { 
        this.x = x;
        this.y = y;
        this.rovers = [];
    }

    public addRover(rover: Rover) {
        this.rovers.push(rover);
    }
}

export class Rover {
    x: number;
    y: number;
    orientation: string;
    isLost: boolean;
    instructions: string;
    
    public constructor(x: number, y: number, orientation: string, instructions: string) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.isLost = false;
        this.instructions = instructions;
    }

    private loseRobot() {
        this.isLost = true;
    }

    public isRobotLost() {
        return this.isLost;
    }

    public addInstructions(instructions: string) {
        this.instructions = instructions;
    }

    private isOutOfBounds(x: number, y: number, grid: Grid) {
        return x < 0 || x > grid.x || y < 0 || y > grid.y;
    }

    private moveForward(grid: Grid) {
        let newX = this.x;
        let newY = this.y;

        switch (this.orientation) {
            case 'N':
                newY = this.y + 1;
                break;
            case 'E':  
                newX = this.x + 1;
                break;
            case 'S':
                newY = this.y - 1;
                break;
            case 'W':
                newX = this.x - 1;
                break;
        }

        if (this.isOutOfBounds(newX, newY, grid)) {
            this.loseRobot();
            return;
        }

        if (!this.isSpaceEmpty(grid, newX, newY)) {
            return;
        }

        this.x = newX;
        this.y = newY;
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

    public isSpaceEmpty(grid: Grid, x: number, y: number) {
        let isEmpty = true;
        grid.rovers.forEach((rover) => {
            if (rover.x === x && rover.y === y) {
                isEmpty = false;
            }
        })

        return isEmpty
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

    public toString() {
        return '(' + this.x + ', ' + this.y + ', ' + this.orientation + ') ' + (this.isLost ? 'LOST' : '');
    }
}

export function mars(gridX: number, gridY: number, rovers: Rover[]) {
    const grid = new Grid(gridX, gridY);
    rovers.forEach((rover) => {
        grid.addRover(rover)
    });

    grid.rovers.forEach((rover) => {
        rover.executeInstructions(grid);
        console.log(rover.toString());
    });

}

// const roversA = [new Rover(2, 3, 'E', 'LFRFF'), new Rover(0, 2, 'N', 'FFLFRFF')];
// const roversB = [new Rover(2, 3, 'N', 'FLLFR'), new Rover(1, 0, 'S', 'FFRLF')];

// function main() {
//     mars(4, 8, roversA);
//     mars(4, 8, roversB);
// }

// main();