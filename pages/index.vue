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
        <section class="body-container d-flex">
            <div class="filters-container d-flex flex-column">
                <span class="searchbar w-100">searchbar</span>
                <span class="filter">Filter dropdown</span>
            </div>
            <div class="add-btn d-flex w-100">
                <button class="btn btn-primary">Agregar contador</button>
            </div>
        </section>
        <div class="table-container d-flex">
            <h1>Contadores App</h1>
            <CounterTable />

        </div>

    </div>
</template>

<script setup lang="ts">


</script>