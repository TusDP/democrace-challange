<template>
    <div>
        <FormKit v-slot="{ value }" flex justify-center gap-5 flex-items-end type="form" :actions="false">
            <FormKit
                :key="order[0].id"
                v-model="from_currency"
                type="autocomplete"
                name="from_currency"
                label="Select entity to convert FROM"
                placeholder="Select entity to convert FROM"
                selection-removable
                v-bind="order[0]"
                :classes="{
                    wrapper: 'flex-grow',
                }"
            >
                <template #option="{ option, classes }">
                    <div :class="classes.option">
                        <span>
                            {{ option.label }} ({{ option.value }})
                        </span>
                    </div>
                </template>
            </FormKit>
            <FormKit
                type="button"
                label=" 🔃 Switch"
                @click="onSwitch"
            />
            <FormKit
                :key="order[1].id"
                v-model="to_currency"
                type="autocomplete"
                name="to_currency"
                label="Select entity to convert TO"
                placeholder="Select entity to convert TO"
                selection-removable
                v-bind="order[1]"
                :classes="{
                    wrapper: 'flex-grow',
                }"
            >
                <template #option="{ option, classes }">
                    <div :class="classes.option">
                        <span>
                            {{ option.label }} ({{ option.value }})
                        </span>
                    </div>
                </template>
            </FormKit>
            <FormKit
                type="button"
                :label=" isFetching ? '🛑 Stop fetching' : '🚀 Start fetching'"
                @click="fetchRatesPeriodically(value)"
            />
        </FormKit>
    </div>
</template>

<script setup lang="ts">
import digital_currency_list from '~/assets/json/digital_currency_list.json'
import physical_currency_list from '~/assets/json/physical_currency_list.json'

defineOptions({
    name: 'IndexPage',
})
const digital_currency = computed(() => digital_currency_list.map((currency) => {
    return {
        label: currency[1],
        value: currency[0],
    }
}))
const physical_currency = computed(() => physical_currency_list.map((currency) => {
    return {
        label: currency[1],
        value: currency[0],
    }
}))

const rates = useRatesStore()

const from_currency = toRef(rates, 'from_currency')
const to_currency = toRef(rates, 'to_currency')

const order = ref([
    {
        id: 'digital_currency',
        options: digital_currency,
    },
    {
        id: 'physical_currency',
        options: physical_currency,
    },
])

function onSwitch() {
    order.value = order.value.reverse()
    rates.clearAll()

    // Swap models
    const temp = from_currency.value
    from_currency.value = to_currency.value
    to_currency.value = temp
}

const isFetching = ref(false)

let intervalId: ReturnType<typeof setInterval>
async function fetchRatesPeriodically() {
    if (isFetching.value) {
        if (intervalId !== null) {
            clearInterval(intervalId)
            intervalId = null
        }
        isFetching.value = false
        return
    }
    else {
        isFetching.value = true
    }

    const fetchRates = async () => {
        try {
            await rates.getLastExchangeRate()
        }
        catch (error) {
            if (intervalId !== null) {
                clearInterval(intervalId)
                intervalId = null
            }
            isFetching.value = false
        }
    }

    intervalId = setInterval(fetchRates, 2000)
}
</script>
