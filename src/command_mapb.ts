import type { State } from "./state.js";

export async function commandMapB(state: State) {

    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return
    }

    const locations = await state.pokeapi.fetchLocations(
        state.prevLocationsURL
    );

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    for (const loc of locations.results) {
        console.log(loc.name);
    }
}
