<template>
    <div class="filter-container">
        <div class="filter-group">
            <label for="filter-type">Mostrar contadores:</label>
            <select id="filter-type" v-model="filterType" @change="updateFilters" class="filter-select">
                <option value="all">Todos</option>
                <option value="greater">Mayores que</option>
                <option value="less">Menores que</option>
            </select>

            <input v-if="filterType !== 'all'" v-model.number="filterValue" type="number" min="0" max="20"
                placeholder="Número" class="filter-input" @input="updateFilters" />
        </div>

        <button @click="clearFilters" class="btn btn-secondary" :disabled="isFiltersEmpty">
            <span class="material-symbols-outlined">filter_list_off</span>
            Limpiar Filtros
        </button>
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