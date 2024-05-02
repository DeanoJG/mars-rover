
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
        if (!this.isSpaceEmpty(rover.x, rover.y)) {
            return;
        }
        this.rovers.push(rover);
    }

    public isSpaceEmpty(x: number, y: number) {
        let isEmpty = true;
        this.rovers.forEach((rover) => {
            if (rover.x === x && rover.y === y) {
                isEmpty = false;
            }
        })
        return isEmpty
    }


    public printRovers() {
        this.rovers.forEach((rover) => {
            console.log(rover.toString());
        });
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

        if (!grid.isSpaceEmpty(newX, newY)) {
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
        return '(' + this.x + ', ' + this.y + ', ' + this.orientation + ')' + (this.isLost ? ' LOST' : '');
    }
}

export function mars(gridX: number, gridY: number, rovers: Rover[]) {
    const grid = new Grid(gridX, gridY);
    rovers.forEach((rover) => {
        grid.addRover(rover)
    });

    grid.rovers.forEach((rover) => {
        rover.executeInstructions(grid);
    });

    grid.printRovers();

    return grid;

}
