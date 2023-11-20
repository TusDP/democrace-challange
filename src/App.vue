<template>
    <RouterView />
</template>

<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
    title: 'Democrance',
    meta: [
        { name: 'description', content: 'Democrance - Assignment Alpha Vantage API' },
        {
            name: 'theme-color',
            content: () => isDark.value ? '#00aba9' : '#ffffff',
        },
    ],
    link: [
        {
            rel: 'icon',
            href: () => preferredDark.value ? '/democrance.svg' : '/democrance.svg',
        },
    ],
})
</script>
