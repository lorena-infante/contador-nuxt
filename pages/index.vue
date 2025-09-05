<template>
    <div class="app-container">
        <div class="header">
            <span>
                <img class="img-logo" src="../assets/images/logo-los-heroes.png" alt="logo caja los héroes 70 años" />
            </span>
            <span class="app-title">
                App Contador - Lorena Infante
            </span>
        </div>
        <div class="body-container">
            <div class="filters-container">
                <div class="searchbar">
                    <SearchBar />
                </div>
                <div class="filter">
                    <FilterDropdown />
                </div>
                <div class="add-btn">
                    <button class="btn btn-primary" @click="openAddModal">
                        <span class="material-symbols-outlined">add</span>
                        Agregar contador
                    </button>
                    <AddCounterModal ref="addModalRef" />

                </div>
            </div>
            <div class="table-container">
                <CounterTable />

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AddCounterModal from '~/components/Counter/AddCounterModal.vue'
const addModalRef = ref<InstanceType<typeof AddCounterModal> | null>(null)

const openAddModal = async () => {
    try {
        if (addModalRef.value) {
            await addModalRef.value.showAddCounterModal()
        }
    } catch (error) {
        console.error('Error opening modal:', error)
    }
}
</script>