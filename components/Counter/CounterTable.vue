<template>
    <div class="counter-table-container">
        <table class="counter-table">
            <thead>
                <tr>
                    <th class="sortable-header" @click="sortBy('name')">Nombre
                        <span class="material-symbols-outlined sort-icon">
                            {{ getSortIcon('name') }}
                        </span>
                    </th>
                    <th class="sortable-header" @click="sortBy('value')">Cantidad
                        <span class="material-symbols-outlined sort-icon">
                            {{ getSortIcon('value') }}
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody class="table-body">
                <!--<CounterRow v-for="counter in filteredCounters" :key="counter.id" :counter="counter" />-->
            </tbody>
            <tfoot>
                <tr class="footer-label">Total:</tr>
                <tr class="footer-total">{{ totalSum }}</tr>
            </tfoot>
        </table>
        <!--Empty state-->
        <div v-if="filteredCounters.length === 0" class="empty-state">
            <p v-if="counters.length === 0">No hay contadores agregados. Por favor agregue uno para continuar</p>
            <p v-else>No hay contadores que coincidan con el filtro aplicado</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from 'nuxt/app';
import { computed } from 'vue';

const store = useNuxtApp().$store as any;

const filteredCounters = computed(() => store.getters.filteredCounters);
const counters = computed(() => store.state.counters);
const totalSum = computed(() => store.getters.totalSum);
const currentSort = computed(() => store.state.filters.sortBy);
const currentOrder = computed(() => store.state.filters.sortOrder);

const sortBy = (field: string) => {
    let newOrder = 'asc';
    if (currentSort.value === field) {
        newOrder = currentOrder.value === 'asc' ? 'desc' : 'asc';
    }
    store.commit('SET_FILTERS', { sortBy: field, sortOrder: newOrder });
}
const getSortIcon = (field: string) => {
    if (currentSort.value !== field) return 'keyboard_arrow_down';
    return currentOrder.value === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
}
</script>