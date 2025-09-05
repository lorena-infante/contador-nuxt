interface Counter {
  id: number;
  name: string;
  value: number;
  createdAt: number;
}
interface State {
  counters: Counter[];
  showModal: boolean;
  filters: {
    type: "all" | "greater" | "less";
    value: number;
    sortBy: "name" | "value";
    sortOrder: "asc" | "desc";
  };
  searchTerm: string;
}

const state: State = {
  counters: [
    //TODO: borrar estos datos de prueba
    { id: 1, name: "Manzanas", value: 5, createdAt: Date.now() - 1000 },
    { id: 2, name: "Naranjas", value: 3, createdAt: Date.now() - 2000 },
    { id: 3, name: "Plátanos", value: 8, createdAt: Date.now() - 3000 },
  ],
  showModal: false,
  filters: {
    type: "all",
    value: 0,
    sortBy: "name",
    sortOrder: "asc",
  },
  searchTerm: "",
};

//Mutations
const mutations = {
  ADD_COUNTER(state: State, counter: Counter) {
    state.counters.push(counter);
    saveToLocalStorage(state.counters);
  },
  REMOVE_COUNTER(state: State, id: number) {
    state.counters = state.counters.filter((counter) => counter.id !== id);
    saveToLocalStorage(state.counters);
  },
  UPDATE_COUNTER_VALUE(
    state: State,
    { id, value }: { id: number; value: number }
  ) {
    const counter = state.counters.find(
      (counterIndividual) => counterIndividual.id === id
    );
    if (counter) {
      counter.value = value;
      saveToLocalStorage(state.counters);
    }
  },
  SET_FILTERS(state: State, filters: Partial<State["filters"]>) {
    state.filters = { ...state.filters, ...filters };
    saveFiltersToSessionStorage(state.filters);
  },
  SET_SEARCH_TERM(state: State, term: string) {
    state.searchTerm = term;
  },

  TOGGLE_MODAL(state: State) {
    state.showModal = !state.showModal;
  },

  LOAD_COUNTERS(state: State, counters: Counter[]) {
    state.counters = counters;
  },
  LOAD_FILTERS(state: State, filters: State["filters"]) {
    state.filters = filters;
  },
};

//Actions
const actions = {
  createCounter({ commit, state }: any, name: string) {
    //validations
    if (state.counters.length >= 20) {
      throw new Error("Máximo 20 contadores permitidos.");
    }
    if (!name.trim() || name.length > 20) {
      throw new Error("El nombre debe tener entre 1 y 20 caracteres.");
    }
    if (
      state.counters.some((counter: Counter) => counter.name === name.trim())
    ) {
      throw new Error("El nombre del contador ya existe");
    }
    const newCounter: Counter = {
      id: Date.now(),
      name: name.trim(),
      value: 0,
      createdAt: Date.now(),
    };
    commit("ADD_COUNTER", newCounter);
  },
  incrementCounter({ commit, state }: any, id: number) {
    const counter = state.counters.find(
      (counterInternal: Counter) => counterInternal.id === id
    );
    if (counter && counter.value < 20) {
      commit("UPDATE_COUNTER_VALUE", { id, value: counter.value + 1 });
    }
  },
  decrementCounter({ commit, state }: any, id: number) {
    const counter = state.counters.find(
      (counterInternal: Counter) => counterInternal.id === id
    );
    if (counter && counter.value > 0) {
      commit("UPDATE_COUNTER_VALUE", { id, value: counter.value - 1 });
    }
  },

  loadFromLocalStorage({ commit }: any) {
    if (import.meta.client) {
      const saved = localStorage.getItem("counters");
      if (saved) {
        try {
          const counters = JSON.parse(saved);
          commit("LOAD_COUNTERS", counters);
        } catch (error) {
          console.error(
            "Error al cargar los contadores desde localStorage",
            error
          );
        }
      }
    }
  },
  loadFiltersFromSessionStorage({ commit }: any) {
    if (import.meta.client) {
      const saved = sessionStorage.getItem("counterFilters");
      if (saved) {
        try {
          const filters = JSON.parse(saved);
          commit("LOAD_FILTERS", filters);
        } catch (error) {
          console.error(
            "Error al cargar los filtros desde sessionStorage",
            error
          );
        }
      }
    }
  },
};

//Getters
const getters = {
  filteredCounters: (state: State) => {
    let result = [...state.counters];
    // filter by search
    if (state.searchTerm.trim()) {
      const searchLower = state.searchTerm.toLowerCase();
      result = result.filter((counter) =>
        counter.name.toLowerCase().includes(searchLower)
      );
    }
    // filter by value
    if (state.filters.type !== "all" && state.filters.value > 0) {
      result = result.filter((counter) => {
        return state.filters.type === "greater"
          ? counter.value > state.filters.value
          : counter.value < state.filters.value;
      });
    }
    // sort
    result.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (state.filters.sortBy === "name") {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else {
        aValue = a.value;
        bValue = b.value;
      }
      if (state.filters.sortOrder === "desc") {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });
    return result;
  },

  totalSum: (state: State) => {
    return state.counters.reduce((sum, counter) => sum + counter.value, 0);
  },
  canAddCounter: (state: State) => {
    return state.counters.length < 20;
  },
};

//Helpers
function saveToLocalStorage(counters: Counter[]) {
  if (import.meta.client) {
    localStorage.setItem("counters", JSON.stringify(counters));
  }
}

function saveFiltersToSessionStorage(filters: State["filters"]) {
  if (import.meta.client) {
    sessionStorage.setItem("counterFilters", JSON.stringify(filters));
  }
}

export const store = {
  state,
  mutations,
  actions,
  getters,
};
