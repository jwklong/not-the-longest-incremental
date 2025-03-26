<script>
    import data from "$lib/data/data";
    import onum from "$lib/onum";
    import { onMount } from "svelte";
    import globalUpdater from "$lib/globalUpdater";

    let {
        id = "",
        amountOverride = onum(-1),
        showGain = false
    } = $props()

    let resource = $state(data.resources[id])
    let amount = $state(amountOverride.isNegative() ? resource.amount : amountOverride)
    let gain = $state(resource.gain())
    let spanConfig = $derived(resource.spanConfig)

    onMount(() => {
        globalUpdater.addUpdate(() => {
            amount = amountOverride.isNegative() ? resource.amount : amountOverride
            gain = resource.gain()
        })
    });
</script>

<span class={spanConfig.outerClass}>
    {#if spanConfig.onLeft}<span class={spanConfig.symbolClass}>{spanConfig.symbol}</span>{/if}<!--
 -->{amount.toStringWhole(5, 3, 3)}<!--
 -->{#if !spanConfig.onLeft}<span class={spanConfig.symbolClass}>{spanConfig.symbol}</span>{/if}<!--
 -->{#if showGain && gain.gt(0)}<!--
     --><sub><!--
     -->(+{gain.toStringWhole(5, 3, 3)}/s)<!--
     --></sub><!--
 -->{/if}
</span>

<style>
    .symbolPoints {
        color: var(--blue-900);
        font-weight: bold;
    }

    .symbolBP {
        color: var(--green-900);
        font-weight: bold;
    }

    .symbolEuros {
        color: var(--orange-900);
        font-weight: bold;
    }

    sub {
        font-size: 0.5em;
    }
</style>