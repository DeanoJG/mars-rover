import { Rover } from "../src/rover";

describe("Rover", () => {
    it("should create a new Rover", () => {
        const rover = new Rover(1, 2, "N", "FLLFR");
        expect(rover).toBeDefined();
    });
});