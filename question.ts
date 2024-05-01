import {createInterface} from "readline";

export const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

export const question = (questionText: string) =>
    new Promise<string>(resolve => rl.question(questionText, resolve))
