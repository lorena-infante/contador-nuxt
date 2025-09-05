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
                <span class="add-btn">
                    <button class="btn btn-primary">Agregar contador</button>
                </span>
            </div>
            <div class="table-container">
                <CounterTable />

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">


</script>