<template>

</template>

<script setup lang="ts">
import { useNuxtApp } from '#app'

const store = useNuxtApp().$store as any

const showAddCounterModal = async () => {
    const Swal = (await import('sweetalert2')).default

    const { value: counterName } = await Swal.fire({
        title: 'Añadir Nuevo',
        html: `
      <div style="text-align: left;">
        <label for="counter-name" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
          Nombre del contador:
        </label>
        <input 
          id="counter-name" 
          class="swal2-input" 
          placeholder="Juan Pérez" 
          maxlength="20"
          style="width: 100%; margin: 0; padding: 1rem; border: 2px solid #d3d3d332; border-radius: 0.5rem;"
        />
        <div id="char-counter" style="text-align: right; font-size: 12px; color: #666; margin-top: 4px;">
          0/20 caracteres
        </div>
        <div id="error-message" style="color: #e74c3c; font-size: 14px; margin-top: 8px; display: none;">
        </div>
      </div>
    `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#0871b5',
        cancelButtonColor: '#414141',
        didOpen: () => {
            const input = document.getElementById('counter-name') as HTMLInputElement
            const charCounter = document.getElementById('char-counter')
            const errorMessage = document.getElementById('error-message')


            input.addEventListener('input', () => {
                const length = input.value.length
                charCounter!.textContent = `${length}/20 caracteres`


                if (errorMessage) {
                    errorMessage.style.display = 'none'
                }


                if (length > 15) {
                    charCounter!.style.color = '#f88a33'
                } else {
                    charCounter!.style.color = '#414141'
                }
            })


            input.focus()
        },
        preConfirm: () => {
            const input = document.getElementById('counter-name') as HTMLInputElement
            const errorMessage = document.getElementById('error-message')
            const name = input.value.trim()


            if (!name) {
                errorMessage!.textContent = 'El nombre es obligatorio'
                errorMessage!.style.display = 'block'
                return false
            }

            if (name.length > 20) {
                errorMessage!.textContent = 'El nombre no puede exceder 20 caracteres'
                errorMessage!.style.display = 'block'
                return false
            }


            const existingCounter = store.state.counters.find((c: any) =>
                c.name.toLowerCase() === name.toLowerCase()
            )

            if (existingCounter) {
                errorMessage!.textContent = 'Ya existe un contador con ese nombre'
                errorMessage!.style.display = 'block'
                return false
            }

            if (store.state.counters.length >= 20) {
                errorMessage!.textContent = 'Máximo 20 contadores permitidos'
                errorMessage!.style.display = 'block'
                return false
            }

            return name
        }
    })

    if (counterName) {
        try {
            await store.dispatch('createCounter', counterName)

            Swal.fire({
                title: '¡Contador creado!',
                text: `El contador "${counterName}" ha sido agregado exitosamente.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            })
        } catch (error: any) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#0871b5'
            })
        }
    }
}

defineExpose({
    showAddCounterModal
})
</script>