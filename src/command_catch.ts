import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {

    const pokemonName = args[0];
    if (!pokemonName) {
        console.log("usage: catch <pokemon>");
        return;
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

    // Higher base experience => lower catch chance.
    // base_experience ranges from roughly 36 (weak) to ~600+ (legendaries),
    // so this yields a chance from ~90% down to ~10%.
    const catchChance = Math.max(0.1, 1 - pokemon.base_experience / 500);

    if (Math.random() < catchChance) {
        console.log(`${pokemon.name} was caught!`);
        state.pokedex[pokemon.name] = pokemon;
    } else {
        console.log(`${pokemon.name} escaped!`);
    }

}
