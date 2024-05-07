import { Grid } from "../src/Grid";
import { Rover } from "../src/Rover";

describe("Grid", () => {
    
    it("should create a new Grid", () => {
        const grid = new Grid(1, 1);

        expect(grid).toBeDefined();
        expect(grid.roverIds).toHaveLength(0);
    });

    it("should not create a new Grid if the dimensions are negative", () => {
        console.log = jest.fn();
        const grid = new Grid(-1, -1);

        expect(grid.roverIds).toBeUndefined();
        expect(grid.rovers).toBeUndefined();
        expect(console.log).toHaveBeenCalledWith("Grid dimensions must be positive");
    });

    describe("Grid Size", () => {
        it.each(
            [
                [0, 0],
                [1, 1],
                [2, 1],
                [4, 8],
                [8, 4]
            ])(`should create a grid with dimensions %i x %i`, (x, y) => {
            const grid = new Grid(x, y);

            expect(grid.rovers).toHaveLength(x + 1);
            expect(grid.rovers[0]).toHaveLength(y + 1);
        });
        
    });

    it("addRover should add a rover to the grid at the specified coordinates", () => {
        const grid = new Grid(4, 8);
        const rover = new Rover(1, "N", "FLLFR");

        expect(grid.rovers[3][4]).toBe(null);

        grid.addRover(3, 4, rover);

        expect(grid.rovers[3][4]).toBe(rover);
    });

    it("addRover should store the rover's id", () => {
        const grid = new Grid(4, 8);
        const rover = new Rover(1, "N", "FLLFR");

        expect(grid.roverIds).not.toContain(rover.id);

        grid.addRover(3, 4, rover);

        expect(grid.roverIds).toContain(rover.id);
    });

    it("addRover should not add a rover if the space is out of bounds", () => {
        const grid = new Grid(1, 1);
        const rover = new Rover(1, "N", "FLLFR");

        grid.addRover(0, 2, rover);
        grid.rovers.forEach((column) => {
            column.forEach((space) => {
                expect(space).toBe(null);
            });
        });

        expect(grid.roverIds).not.toContain(rover.id);
    });

    it("addRover should not add a rover if the space is occupied", () => {
        const grid = new Grid(4, 8);

        const rover = new Rover(1, "N", "FLLFR");
        const rover2 = new Rover(2, "N", "FLLFR");

        grid.addRover(3, 4, rover);
        grid.addRover(3, 4, rover2);

        expect(grid.rovers[3][4]).toBe(rover);
        expect(grid.roverIds).not.toContain(rover2.id);
    });

    it("isSpaceEmpty should return true if the space is empty", () => {
        const grid = new Grid(4, 8);

        expect(grid.isSpaceEmpty(3, 4)).toBe(true);
    });

    it("isSpaceEmpty should return false if the space is occupied", () => {
        const grid = new Grid(4, 8);
        const rover = new Rover(1, "N", "FLLFR");
        grid.addRover(3, 4, rover);

        expect(grid.isSpaceEmpty(3, 4)).toBe(false);
    });

    it("isOutOfBounds should return true if the space is out of bounds", () => {
        const grid = new Grid(1, 1);

        expect(grid.isOutOfBounds(-1, 0)).toBe(true);
        expect(grid.isOutOfBounds(0, -1)).toBe(true);
        expect(grid.isOutOfBounds(2, 2)).toBe(true);
    });

    it("isOutOfBounds should return false if the space is within bounds", () => {
        const grid = new Grid(1, 1);

        expect(grid.isOutOfBounds(0, 0)).toBe(false);
        expect(grid.isOutOfBounds(0, 1)).toBe(false);
        expect(grid.isOutOfBounds(1, 1)).toBe(false);
        expect(grid.isOutOfBounds(1, 0)).toBe(false);
    });

    it("getRoverById should return the rover with the specified id", () => {
        const grid = new Grid(4, 8);
        const rover = new Rover(1, "N", "FLLFR");

        grid.addRover(3, 4, rover);

        expect(grid.getRoverById(rover.id)).toBe(rover);
    });

    it("getRoverById should return null if the id does not exist", () => {
        const grid = new Grid(4, 8);

        expect(grid.getRoverById(1)).toBe(null);
    });

    it("getRoverByLocation should return the rover at the specified location", () => {
        const grid = new Grid(1, 1);
        const rover = new Rover(1, "N", "FLLFR");

        grid.addRover(0, 0, rover);

        expect(grid.getRoverByLocation(0, 0)).toBe(rover);
    });

    it("getRoverByLocation should return null if the location is out of bounds", () => {
        const grid = new Grid(1, 1);

        expect(grid.getRoverByLocation(2, 2)).toBe(null);
    });

    it("getRoverByLocation should return null if the location is empty", () => {
        const grid = new Grid(1, 1);

        expect(grid.getRoverByLocation(0, 0)).toBe(null);
    });

    it("getRoverLocationById should return the location of the rover with the specified id", () => {
        const grid = new Grid(1, 1);
        const rover = new Rover(1, "N", "FLLFR");

        grid.addRover(0, 0, rover);

        expect(grid.getRoverLocationById(rover.id)).toEqual([0, 0]);
    });

    it("getRoverLocationById should return null if the id does not exist", () => {
        const grid = new Grid(1, 1);

        expect(grid.getRoverLocationById(1)).toBe(null);
    });

    it("moveRover should move the rover to the specified location", () => {
        const grid = new Grid(1, 1);
        const rover = new Rover(1, "N", "FLLFR");

        grid.addRover(0, 0, rover);
        grid.moveRover(0, 0, 0, 1);

        expect(grid.rovers[0][0]).toBe(null);
        expect(grid.rovers[0][1]).toBe(rover);
    });

    it("moveRover should change rover to lost if its moved out of bounds", () => {
        const grid = new Grid(2, 2);
        const rover = new Rover(1, "N", "F");

        grid.addRover(2, 2, rover);

        expect(rover.isRoverLost()).toBe(false);

        grid.moveRover(2, 2, 2, 3);

        expect(grid.rovers[2][2]).toBe(rover);
        expect(rover.isRoverLost()).toBe(true);
    })

    it("moveRover should not move the rover if the space is occupied", () => {
        const grid = new Grid(1, 1);
        const rover = new Rover(1, "N", "FLLFR");
        const rover2 = new Rover(2, "N", "FLLFR");

        grid.addRover(0, 0, rover);
        grid.addRover(0, 1, rover2);
        grid.moveRover(0, 0, 0, 1);

        expect(grid.rovers[0][0]).toBe(rover);
        expect(grid.rovers[0][1]).toBe(rover2);
    });

    it("executeRoverInstructions should execute the rover's instructions", () => {
        const grid = new Grid(1, 1);
        const rover = new Rover(1, "N", "FLLFLF");

        grid.addRover(0, 0, rover);
        grid.executeRoverInstructions(1);

        expect(grid.getRoverLocationById(1)).toEqual([1, 0]);
    });

    it("executeRoverInstructions should set the rover's instructions to empty after completing", () => {
        const grid = new Grid(1, 1);
        const rover = new Rover(1, "N", "FLLFLF");

        grid.addRover(0, 0, rover);
        grid.executeRoverInstructions(1);

        expect(rover.instructions).toBe("");
    });

    describe("moveRoverForward should move the rover forward", () => {
        it.each([
            ["N", 1 , 2],
            ["E", 2 , 1],
            ["S", 1 , 0],
            ["W", 0 , 1]
        ])(`should move the rover forward when facing %s to (%i, %i)`, (direction, newX, newY) => {
            const grid = new Grid(3, 3);
            const rover = new Rover(1, direction, "F");

            grid.addRover(1, 1, rover);
            grid.moveRoverForward(1);
            expect(grid.rovers[1][1]).toBe(null);
            expect(grid.rovers[newX][newY]).toBe(rover);
        });


    })

    describe("printRovers should print the rovers in the grid", () => {
        console.log = jest.fn();
        
        const grid = new Grid(4, 8);
        grid.addRover(2, 3, new Rover(1, 'N', 'FLLFR'));
        grid.addRover(1, 0, new Rover(2, 'S', 'FFRLF'));

        grid.executeRoverInstructions(1);  
        grid.executeRoverInstructions(2);

        grid.printRovers();

        expect(console.log).toHaveBeenCalledTimes(2);
        expect(console.log).toHaveBeenNthCalledWith(1, "(2, 3, W)");
        expect(console.log).toHaveBeenNthCalledWith(2, "(1, 0, S) LOST");



    });

});