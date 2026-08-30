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
        if (!command) {
            console.log("Unknown command");
            rl.prompt();
            return;
        }

        try {
            await command.callback(state);
        } catch (e) {
            console.log((e as Error).message);
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
