import type { State } from "./state.js";
import { pageFromURL } from "./command_map.js";

export async function commandMapB(state: State) {

    const page = pageFromURL(state.prevLocationsURL);

    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return
    }

    const locations = await state.pokeapi.fetchLocations(
        state.prevLocationsURL
    );

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    console.log(`page: ${page}`)

    for (const loc of locations.results) {
        console.log(loc.name);
    }
}
