<script>
    import Quarry from "$lib/quarry/quarry.svelte";
    import Building from "$lib/building/building.svelte";
    import Upgrade from "$lib/upgrade/upgrade.svelte";
</script>

<div class="main">
    <Quarry id="normal" />
    <div class="generators">
        <Building id="miner">
            {#snippet generation(effect)}
            (-{effect[0].toStringWhole(5, 3, 3)}/s)
            {/snippet}
        </Building>
    </div>
    <div class="upgrades">
        <Upgrade id="q1">
            {#snippet desc(effect)}
            Increase damage of the mine button based on amount of miners.<br>
            Effect: +{effect.toStringWhole(5, 3, 3)}
            {/snippet}
        </Upgrade>
        <Upgrade id="q2">
            {#snippet desc(effect)}
            Unlock the Geode quarry layer.
            {/snippet}
        </Upgrade>
        <Upgrade id="q3">
            {#snippet desc(effect)}
            Unlock more point upgrades.
            {/snippet}
        </Upgrade>
        <Upgrade id="q4">
            {#snippet desc(effect)}
            Double value of ores.
            {/snippet}
        </Upgrade>
    </div>
</div>

<style>
    .main {
        gap: 32px;
    }

    .generators {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .upgrades {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        width: 848px;
    }
</style>