import { Grid, Rover } from "../src/rover";

describe("Rover", () => {
    it("should create a new Rover", () => {
        const rover = new Rover(1, 2, "N", "FLLFR");
        expect(rover).toBeDefined();
    });

    it("instruction 'L' should turn the rover left", () => {
        const rover = new Rover(0, 0, "N", "L");
        rover.executeInstructions(new Grid(0, 0));
        expect(rover.orientation).toBe("W");
    });

    it("instruction 'R' should turn the rover right", () => {
        const rover = new Rover(0, 0, "N", "R");
        rover.executeInstructions(new Grid(0, 0));
        expect(rover.orientation).toBe("E");
    });

    it("instruction 'F' should move the rover forwards", () => {
        const rover = new Rover(0, 0, "N", "F");
        rover.executeInstructions(new Grid(1, 1));
        expect(rover.x).toBe(0);
        expect(rover.y).toBe(1);
        expect(rover.orientation).toBe("N");
    });

    it("should move execute all instructions", () => {
        const grid = new Grid(4, 8)
        const rover = new Rover(2, 3, "N", "FLLFR");
        rover.executeInstructions(grid);
        expect(rover.x).toBe(2);
        expect(rover.y).toBe(3);
        expect(rover.orientation).toBe("W");
    });

    it("should return a string representation of the rover", () => {
        const rover = new Rover(2, 3, "N", "FLLFR");
        expect(rover.toString()).toBe("(2, 3, N)");
    });

    it("should return a string representation with 'LOST' when it is lost", () => {
        const rover = new Rover(0, 0, "S", "F");
        const grid = new Grid(4, 8)
        rover.executeInstructions(grid);
        expect(rover.toString()).toBe("(0, 0, S) LOST");
    });



});