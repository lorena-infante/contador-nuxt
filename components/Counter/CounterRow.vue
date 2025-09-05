<template>
    <tr class="counter-row">
        <td class="counter-name">{{ counter.name }}</td>
        <td class="counter-controls">
            <div class="controls-container">
                <button @click="decrement">
                    <span class="material-symbols-outlined">remove</span>
                </button>
                <span class="counter-value">{{ counter.value }}</span>
                <button @click="increment">
                    <span class="material-symbols-outlined">add</span>
                </button>
                <button @click="confirmDelete">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </td>
    </tr>
</template>

<script setup lang="ts">
const props = defineProps<{
    counter: {
        id: number
        name: string
        value: number
        createdAt: number
    }
}>()

const store = useNuxtApp().$store as any

const increment = () => {
    store.dispatch('incrementCounter', props.counter.id)
}

const decrement = () => {
    store.dispatch('decrementCounter', props.counter.id)
}

const confirmDelete = async () => {

    const Swal = (await import('sweetalert2')).default

    const result = await Swal.fire({
        title: '¿Eliminar contador?',
        text: `¿Estás seguro de eliminar "${props.counter.name}"? Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#95a5a6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
        store.commit('REMOVE_COUNTER', props.counter.id)

        Swal.fire({
            title: '¡Eliminado!',
            text: 'El contador ha sido eliminado.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        })
    }
}
</script>