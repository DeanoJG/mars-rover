import { Rover } from "../src/Rover";

describe("Rover", () => {
    it("should create a new Rover", () => {
        const rover = new Rover(1, "N", "FLLFR");
        expect(rover).toBeDefined();
        expect(rover.id).toBe(1);
        expect(rover.orientation).toBe("N");
        expect(rover.instructions).toBe("FLLFR");
    });

    it("getOrientation should return the orientation", () => {
        const rover = new Rover(1, "N", "FLLFR");
        expect(rover.getOrientation()).toBe("N");
    });

    it("setOrientation should modify the orientation", () => {
        const rover = new Rover(1, "N", "FLLFR");
        rover.setOrientation("S");
        expect(rover.getOrientation()).toBe("S");
    });

    it("isRoverLost should return false if the rover is not lost", () => {
        const rover = new Rover(1, "N", "FLLFR");
        expect(rover.isRoverLost()).toBe(false);
    });

    it("loseRover should set isLost to true", () => {
        const rover = new Rover(1, "N", "FLLFR");
        expect(rover.isLost).toBe(false);
        rover.loseRover();
        expect(rover.isRoverLost()).toBe(true);
    })

    it("isRoverLost should return true if the rover is lost", () => {
        const rover = new Rover(1, "N", "FLLFR");
        rover.loseRover();
        expect(rover.isRoverLost()).toBe(true);
    });
        
    it("getInstructions should return the instructions", () => {
        const rover = new Rover(1, "N", "FLLFR");
        expect(rover.getInstructions()).toBe("FLLFR");
    });

    it("setInstructions should modify the instructions", () => {
        const rover = new Rover(1, "N", "FLLFR");
        rover.setInstructions("F");
        expect(rover.getInstructions()).toBe("F");
    })

    it("toString returns a string representation of the rover", () => {
        const rover = new Rover(1, "N", "FLLFR");
        expect(rover.toString(1, 2)).toBe("(1, 2, N)");
    })

    it("toString should return a string representation with 'LOST' when it is lost", () => {
        const rover = new Rover(1, "S", "F");
        rover.loseRover();
        expect(rover.toString(0, 0)).toBe("(0, 0, S) LOST");
    });

});
