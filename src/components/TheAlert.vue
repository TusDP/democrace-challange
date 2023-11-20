<template>
    <div v-if="rates.hint" class="relative mb-5 border border-red-400 rounded-[0.5rem] bg-red-100 px-4 py-3 text-center text-red-700" role="alert">
        <strong class="font-bold">{{ text }}</strong>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'TheAlert',
})
const rates = useRatesStore()
const text = toRef(rates, 'hint', '')

watch(text, (value) => {
    if (value) {
        setTimeout(() => {
            text.value = ''
        }, 5000)
    }
})
</script>
