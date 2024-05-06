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

    public getOrientation() {
        return this.orientation;
    }

    public setOrientation(orientation: string) {
        this.orientation = orientation;
    }

    public isRoverLost() {
        return this.isLost;
    }

    public loseRover() {
        this.isLost = true;
    }

    public getInstructions() {
        return this.instructions;
    }

    public setInstructions(instructions: string) {
        this.instructions = instructions;
    }

    public turnRover(left: boolean) {
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

    public toString(x: number, y: number) {
        return '(' + x + ', ' + y + ', ' + this.orientation + ')' + (this.isLost ? ' LOST' : '');
    }
}
