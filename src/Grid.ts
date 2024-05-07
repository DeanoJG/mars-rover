import { Rover } from "./Rover";

export class Grid {
    rovers: Rover[][];
    roverIds: number[];

    constructor(x: number, y: number) {
        this.roverIds = []; 
        this.rovers = [];
        for (let i = 0; i < x + 1; i++) {
            this.rovers.push([]);
            for (let j = 0; j < y + 1; j++) {
                this.rovers[i].push(null);
            }
        }
    }

    public addRover(x: number, y: number, rover: Rover) {
        if (this.isOutOfBounds(x, y)) {
            console.log('That location is out of bounds');
            return;
        }

        if (!this.isSpaceEmpty(x, y)) {
            console.log('A rover is already in that position')
            return;
        }

        this.rovers[x][y] = rover;
        this.roverIds.push(rover.id);
    }

    public isSpaceEmpty(x: number, y: number) {
        return this.rovers[x][y] === null;        
    }

    public isOutOfBounds(x: number, y: number) {
        return x < 0 || x > this.rovers.length || y < 0 || y > this.rovers[0].length;
    }

    public getRoverById(id: number) {
        if (!this.roverIds.includes(id)) {
            return null;
        }
        
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

    public getRoverByLocation(x: number, y: number) {
        if (this.isOutOfBounds(x, y)) {
            return null;
        }
        return this.rovers[x][y];
    }

    public getRoverLocationById(id: number) {
        if (!this.roverIds.includes(id)) {
            return null;
        }

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
        console.log('***Here!')
        if (this.isOutOfBounds(newX, newY)) {
            console.log("here!!!")
            this.rovers[x][y].loseRover();
            return;
        }

        if (!this.isSpaceEmpty(newX, newY)) {
            return;
        }

        this.rovers[newX][newY] = this.rovers[x][y];
        this.rovers[x][y] = null;
    }

    public printRovers() {
        this.roverIds.forEach((id) => {
            const [x, y] = this.getRoverLocationById(id);
            const rover = this.getRoverByLocation(x, y);
            console.log(rover.toString(x, y));
        });
    }

    public executeRoverInstructions(id: number) {
        const rover = this.getRoverById(id);
        Array.from(rover.getInstructions()).forEach((instruction) => {
            if (instruction === 'F') {
                this.moveRoverForward(rover.id);
            } else {
                rover.turnRover(instruction === 'L');
            }
        })

        rover.setInstructions('');
    }

    public moveRoverForward(id: number) {
        const [currentX, currentY] = this.getRoverLocationById(id);
        const rover = this.getRoverByLocation(currentX, currentY);
        
        if (currentX === null || currentY === null) {
            return;
        }

        let newX = currentX;
        let newY = currentY;


        switch (rover.getOrientation()) {
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

        this.moveRover(currentX, currentY, newX, newY);
    }
    
}