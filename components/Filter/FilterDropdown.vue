<template>
    <div class="filter-container">
        <div class="filter-group">
            <span class="label-container">
                <span class="material-symbols-outlined">
                    filter_alt
                </span>
                <label for="filter-type">Filtrar por cantidad:</label>
                <span class="filter-type">
                    <select id="filter-type" v-model="filterType" @change="updateFilters" class="filter-select">
                        <option value="all" class="filter-option">Todos</option>
                        <option value="greater" class="filter-option">Mayor a</option>
                        <option value="less" class="filter-option">Menor a</option>
                    </select>

                    <input v-if="filterType !== 'all'" v-model.number="filterValue" type="number" min="0" max="20"
                        placeholder="Num" class="filter-input" @input="updateFilters" />
                </span>
                <button @click="clearFilters" class="btn btn-clear-filter" :disabled="isFiltersEmpty">
                    <span class="material-symbols-outlined filter_list_off">filter_list_off</span>
                    Limpiar Filtros
                </button>
            </span>
        </div>

    </div>
</template>

<script setup lang="ts">
const store = useNuxtApp().$store as any


const filterType = ref(store.state.filters.type)
const filterValue = ref(store.state.filters.value)

const isFiltersEmpty = computed(() => {
    return filterType.value === 'all' && filterValue.value === 0
})


const updateFilters = () => {
    store.commit('SET_FILTERS', {
        type: filterType.value,
        value: filterValue.value
    })
}

const clearFilters = () => {
    filterType.value = 'all'
    filterValue.value = 0
    updateFilters()
}


watch(() => store.state.filters, (newFilters) => {
    filterType.value = newFilters.type
    filterValue.value = newFilters.value
}, { deep: true })
</script>