import type { State } from "./state.js";

export async function commandMap(state: State) {

    const page = pageFromURL(state.nextLocationsURL);

    const locations = await state.pokeapi.fetchLocations(
        state.nextLocationsURL ?? undefined,
    );

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    console.log(`page: ${page}`);
    for (const loc of locations.results) {
        console.log(loc.name);
    }

}

export function pageFromURL(url: string | null): number {
    if (!url) {
        return 1;
    }
    const offset = Number(new URL(url).searchParams.get("offset") ?? "0");
    return offset / 20 + 1;
}
