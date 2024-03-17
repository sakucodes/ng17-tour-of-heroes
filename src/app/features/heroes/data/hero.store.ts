import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Hero } from "../models/hero";

import { computed, inject } from "@angular/core";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { HeroService } from "./hero.service";
import { filter, pipe, switchMap, tap } from "rxjs";
import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { POWERS } from "./mock-heroes";
import { withLogger } from "../../../shared/store/logger.feature";

type HeroesState = {
    heroes: Hero[];
    isLoading: boolean;
    selectedId: number;
    selectedHero: Hero | null;
    query: string;
}

const initialState: HeroesState = {
    heroes: [],
    isLoading: false,
    selectedId: 0,
    selectedHero: null,
    query: ''
}

const maxTopHeroes = 5;

export const HeroesStore = signalStore(
    { providedIn: 'root' },
    withDevtools('heroes'),
    withState(initialState),
    withComputed(({ heroes, query }) => ({
        powers: computed(() => POWERS),
        topHeroes: computed(() => heroes().slice(0, maxTopHeroes)),
        searchedHeroes: computed(() => {
            const q = query();
            const list = heroes();
            if (q.length === 0) {
                return [];
            }
            return list.filter(h => h.name.toLocaleLowerCase().startsWith(q.toLocaleLowerCase())) || [];
        }),
    })),
    withMethods((store, heroService = inject(HeroService)) => ({
        loadHeroes: rxMethod<void>(
            pipe(
                filter(() => store.heroes().length === 0),
                tap(() => patchState(store, { isLoading: true })),
                switchMap(() => {
                    return heroService.getHeroes().pipe(
                        tapResponse({
                            next: (heroes) => patchState(store, { heroes }),
                            error: console.error,
                            finalize: () => patchState(store, { isLoading: false })
                        })
                    )
                })
            )
        ),
        async loadHero(id: number): Promise<void> {
            patchState(store, { selectedId: id });
            patchState(store, { selectedHero: null });
            if (id > 0) {
                const hero = await heroService.getHero(store.selectedId());
                if (hero !== null) {
                    patchState(store, { selectedHero: hero })
                }
            }
        },
        searchHero(searchTerm: string): void {
            patchState(store, { query: searchTerm })
        },
        addHero: rxMethod<Hero>(
            pipe(
                filter((h) => h != null),
                switchMap((hero) => {
                    return heroService.addHero(hero).pipe(
                        tapResponse({
                            next: (h) => { patchState(store, { heroes: [...store.heroes(), h] }) },
                            error: console.error,
                        })
                    )
                })
            )
        ),
        updateHero: rxMethod<Hero>(
            pipe(
                filter((h) => h != null),
                switchMap((hero) => {
                    return heroService.updateHero(hero).pipe(
                        tapResponse({
                            next: () => {
                                patchState(store, ({ heroes }) => ({
                                    heroes: heroes.map(h => h.id === hero.id ? hero : h)
                                }))
                            },
                            error: console.error,
                        })
                    )
                })
            )
        ),
        async deleteHero(id: number): Promise<void> {
            const result = await heroService.deleteHero(id);
            if (result !== null) {
                const heroes = store.heroes().filter(h => h.id !== result);
                patchState(store, { heroes });
            }

        }
    })),
    withHooks({
        onInit(store) {
            store.loadHeroes();
        },
    }),
    withLogger('heroes')
);
