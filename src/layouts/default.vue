<template>
    <TheNavbar />
    <main
        mx-auto my-12 mb-12 min-h-screen flex flex-col p-10 container
    >
        <RouterView />
        <TheFooter />
        <div mx-auto mt-5 text-center text-sm opacity-50>
            Made with ❤️ for Democrance
        </div>
    </main>
</template>
