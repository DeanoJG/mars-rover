import { Grid, Rover, mars } from "../src/rover";

describe("Rover", () => {
    it("should create a new Rover", () => {
        const rover = new Rover(1, 2, "N", "FLLFR");
        expect(rover).toBeDefined();
    });

    describe("instructions", () => {
        it("'L' should turn the rover left", () => {
            const rover = new Rover(0, 0, "N", "L");
            rover.executeInstructions(new Grid(0, 0));
            expect(rover.orientation).toBe("W");
        });
    
        it("'R' should turn the rover right", () => {
            const rover = new Rover(0, 0, "N", "R");
            rover.executeInstructions(new Grid(0, 0));
            expect(rover.orientation).toBe("E");
        });
    
        it("'F' should move the rover forwards", () => {
            const rover = new Rover(0, 0, "N", "F");
            rover.executeInstructions(new Grid(1, 1));
            expect(rover.x).toBe(0);
            expect(rover.y).toBe(1);
            expect(rover.orientation).toBe("N");
        });

        it("should execute all instructions given", () => {
            const grid = new Grid(4, 8)
            const rover = new Rover(2, 3, "N", "FLLFR");
            rover.executeInstructions(grid);
            expect(rover.x).toBe(2);
            expect(rover.y).toBe(3);
            expect(rover.orientation).toBe("W");
        });
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

    it("should not execute an instruction if the next position is outside the grid", () => {
        const rover = new Rover(0, 0, "S", "F");
        rover.executeInstructions(new Grid(0, 0));
        expect(rover.x).toBe(0);
        expect(rover.y).toBe(0);
    });

    it("should store the last valid position if it gets lost", () => {
        const rover = new Rover(0, 0, "N", "F");
        rover.executeInstructions(new Grid(0, 0));
        expect(rover.x).toBe(0);
        expect(rover.y).toBe(0);
        expect(rover.orientation).toBe("N");
        expect(rover.isLost).toBe(true);
    });

    it("should not execute an instruction if the next position is occupied", () => {
        const grid = new Grid(1, 1)
        grid.addRover(new Rover(0, 1, "N", "F"));
        grid.addRover(new Rover(0, 0, "N", "F"));
        const secondRover = grid.rovers[1]
        secondRover.executeInstructions(grid);
        expect(secondRover.x).toBe(0);
        expect(secondRover.y).toBe(0);
    });

});

describe("Grid", () => {
    it("should create a new Grid", () => {
        const grid = new Grid(4, 8);
        expect(grid).toBeDefined();
        expect(grid.x).toBe(4);
        expect(grid.y).toBe(8);
        expect(grid.rovers).toHaveLength(0);
    });

    it("should add a rover to the grid", () => {
        const grid = new Grid(4, 8);
        const rover = new Rover(2, 3, "N", "FLLFR");
        grid.addRover(rover);
        expect(grid.rovers).toHaveLength(1);
    });

    it("should not add a rover to the grid if the position is occupied", () => {
        const grid = new Grid(1, 1);
        const rover = new Rover(0, 0, "N", "F");
        grid.addRover(rover);
        grid.addRover(rover);
        expect(grid.rovers).toHaveLength(1);
    });

    it("should add rovers to the grid if the position is unoccupied", () => {
        const grid = new Grid(1, 1);
        const rover = new Rover(0, 0, "N", "F");
        const rover2 = new Rover(0, 1, "N", "F");
        grid.addRover(rover);
        grid.addRover(rover2);
        expect(grid.rovers).toHaveLength(2);
    });



});

describe("mars", () => {
    it("should correctly execute example 1", () => {
        const rovers = [new Rover(2, 3, "E", "LFRFF"), new Rover(0, 2, "N", "FFLFRFF")];
        const result = mars(4, 8, rovers);
        expect(result.rovers).toHaveLength(2);
        expect(result.rovers[0].toString()).toBe('(4, 4, E)');
        expect(result.rovers[1].toString()).toBe('(0, 4, W) LOST');
    });

    it("should correctly execute example 2", () => {
        const rovers = [new Rover(2, 3, "N", "FLLFR"), new Rover(1, 0, "S", "FFRLF")];
        const result = mars(4, 8, rovers);
        expect(result.rovers).toHaveLength(2);
        expect(result.rovers[0].toString()).toBe('(2, 3, W)');
        expect(result.rovers[1].toString()).toBe('(1, 0, S) LOST');
    });


});