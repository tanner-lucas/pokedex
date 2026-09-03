import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { createInterface, type Interface } from "readline";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
}

export function initState(cacheInterval: number): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const commands = getCommands();

    return {
        rl,
        commands,
        pokeapi: new PokeAPI(cacheInterval),
        nextLocationsURL: null,
        prevLocationsURL: null
    };
}

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "List available commands",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays the next 20 location areas",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 location areas",
            callback: commandMapB
        },
        explore: {
            name: "explore",
            description: "Displays the Pokemon found in a location area",
            callback: commandExplore,
        },
    };
}