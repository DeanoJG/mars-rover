import { Grid } from "../src/Grid";
import { Rover } from "../src/Rover";

describe("Grid", () => {
    
    it("should create a new Grid", () => {
        const grid = new Grid(1, 1);
        expect(grid).toBeDefined();
        expect(grid.roverIds).toHaveLength(0);
    });

    describe("Grid Size", () => {
        it("0x0", () => {
            const grid = new Grid(0, 0);
            expect(grid.rovers).toHaveLength(1);
            expect(grid.rovers[0]).toHaveLength(1);
        });

        it("1x1", () => {
            const grid = new Grid(1, 1);
            expect(grid.rovers).toHaveLength(2);
            expect(grid.rovers[0]).toHaveLength(2);
        });

        it("2x1", () => {
            const grid = new Grid(2, 1);
            expect(grid.rovers).toHaveLength(3);
            expect(grid.rovers[0]).toHaveLength(2);
        });

        it("4x8", () => {
            const grid = new Grid(4, 8);
            expect(grid.rovers).toHaveLength(5);
            expect(grid.rovers[0]).toHaveLength(9);
        });

        it("8x4", () => {
            const grid = new Grid(8, 4);
            expect(grid.rovers).toHaveLength(9);
            expect(grid.rovers[0]).toHaveLength(5);
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

    // it("isOutOfBounds should return true if the space is out of bounds", () => {
    //     const grid = new Grid(1, 1);
    //     expect(grid.isOutOfBounds(2, 2)).toBe(true);
    //     expect(grid.isOutOfBounds(-1, 0)).toBe(true);
    //     expect(grid.isOutOfBounds(0, -1)).toBe(true);
    // });

    it("isOutOfBounds should return false if the space is within bounds", () => {
        const grid = new Grid(4, 8);
        expect(grid.isOutOfBounds(3, 4)).toBe(false);
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

    // it("getRoverByLocation should return null if the location is out of bounds", () => {
    //     const grid = new Grid(1, 1);
    //     expect(grid.getRoverByLocation(2, 2)).toBe(null);
    // });

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

    // it("moveRover should change rover to lost if its moved out of bounds", () => {
    //     const grid = new Grid(2, 2);
    //     const rover = new Rover(1, "N", "F");
    //     grid.addRover(2, 2, rover);
    //     expect(rover.isRoverLost()).toBe(false);
    //     grid.moveRover(2, 2, 2, 3);
    //     expect(grid.rovers[1][1]).toBe(rover);
    //     expect(rover.isRoverLost()).toBe(true);
    // })

});