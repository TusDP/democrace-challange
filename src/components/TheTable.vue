<template>
    <AgGridVue
        :style="{ 'width': '100%', 'height': gridHeight, 'flex-grow': 1 }"
        class="ag-theme-alpine"
        :column-defs="columnDefs"
        :animate-rows="true"
        :modules="modules"
        :row-data="rowData"
        @grid-ready="onGridReady"
    />
    <button @click="addRow">
        + add test
    </button>
</template>

<script setup lang="ts">
import type { ColumnApi, GridApi, GridReadyEvent } from '@ag-grid-community/core'

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { ModuleRegistry } from '@ag-grid-community/core'
import { AgGridVue } from '@ag-grid-community/vue3/lib/AgGridVue'

const modules = [
    ClientSideRowModelModule,
// RowGroupingModule,
]
ModuleRegistry.registerModules(modules)

const gridApi = shallowRef<GridApi>()
const gridColumnApi = shallowRef<ColumnApi>()

const gridHeight = ref('100%')

const columnDefs = [
    { headerName: 'From Currency', field: 'from_currency' },
    { headerName: 'To Currency', field: 'to_currency' },
    { headerName: 'Bid Price', field: 'bid_price' },
    { headerName: 'Ask Price', field: 'ask_price' },
]
const rowData = ref([])
const rates = useRatesStore()
const lastResults = toRef(rates, 'lastResults')
watch(lastResults, (latest) => {
    if (!latest?.rate && latest?.rate)
        return

    addRow({
        bid_price: latest?.rate?.bid_price,
        ask_price: latest?.rate?.ask_price,
    })
})

function addRow(rowData: any = {}) {
    gridApi.value?.applyTransaction({ add: [
        {
            from_currency: rates.from_currency,
            to_currency: rates.to_currency,
            ...rowData,
        },
    ] })

    sizeToFitHeight()
}

function clearAllRows() {
    gridApi.value.setRowData([])
}

function onGridReady(params: GridReadyEvent) {
    gridApi.value = params.api
    gridColumnApi.value = params.columnApi

    nextTick(sizeToFit)
    nextTick(sizeToFitHeight)
}

function sizeToFit() {
    if (gridApi.value != null)
        gridApi.value.sizeColumnsToFit()
}

function sizeToFitHeight() {
    nextTick(() => {
        gridHeight.value = `calc(var(--ag-row-height, 30px) * ${(gridApi.value.getRenderedNodes()?.length || 1) + 1} + 10px)`
    })
}
</script>

<style lang="scss">
    @use "@ag-grid-community/styles" as ag;

    @include ag.grid-styles((
        theme: alpine,
        --ag-border-radius: 0.5rem,
        --ag-card-radius: 0.5rem,
    ));

    .subproduct-title {
        position: sticky;
        top: calc(var(--userbar-height) + 10px);
        z-index: calc(var(--userbar-z) - 1);
        height: var(--navbar-height);
    }

    .ag-root-wrapper {
        border-radius: 0.5rem
    }
</style>
