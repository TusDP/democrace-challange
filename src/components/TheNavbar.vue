<template>
    <header drop-shadow class="z-50 w-full flex flex-wrap bg-white py-4 text-sm sm:flex-nowrap sm:justify-start dark:bg-gray-800">
        <nav class="mx-auto max-w-[85rem] w-full px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
            <div class="flex items-start justify-between">
                <img src="/democrance-long.svg">
                <div class="sm:hidden">
                    <button type="button" class="hs-collapse-toggle inline-flex items-center justify-center gap-x-2 border border-gray-200 rounded-lg bg-white p-2 text-gray-800 shadow-sm disabled:pointer-events-none dark:border-gray-700 dark:bg-transparent hover:bg-gray-50 dark:text-white disabled:opacity-50 dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                        <svg class="hs-collapse-open:hidden h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                        <svg class="hs-collapse-open:block hidden h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>
            </div>
            <div id="navbar-collapse-with-animation" class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block">
                <div class="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5">
                    <a icon-btn rel="noreferrer" href="https://github.com/TusDP/democrace-challenge" target="_blank" title="GitHub">
                        <div i-carbon-logo-github />
                    </a>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
    // change to some real logic
    const locales = availableLocales
    const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
    await loadLanguageAsync(newLocale)
    locale.value = newLocale
}
</script>
