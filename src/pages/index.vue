<template>
    <TheCurrencySelector @error="onError" />
    <TheAlert />

    <TheTable />
</template>

<script setup lang="ts">
function onError(error) {

}
</script>
