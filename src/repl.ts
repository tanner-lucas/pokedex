import type { State } from "./state.js";

export function startREPL(state: State) {
    const { rl, commands } = state;

    rl.prompt();

    rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }

        const commandName = words[0];
        const command = commands[commandName];
        if (command) {
            command.callback(state);
        } else {
            console.log("Unknown command");
        }
        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter((word) => word !== "");
}
