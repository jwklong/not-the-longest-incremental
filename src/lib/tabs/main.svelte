<script>
    import Building from "$lib/building/building.svelte";
    import Upgrade from "$lib/upgrade/upgrade.svelte";
</script>
<div class="main">
    <div class="generators">
        <Building id="maker" />
        <Building id="generator" />
        <Building id="producer" />
    </div>
    <div class="upgrades">
        <Upgrade id="p1">
            {#snippet desc(effect)}
            Gain more points based on total buildings bought.<br>
            Effect: x{effect.toStringWhole(5, 3, 3)}
            {/snippet}
        </Upgrade>
        <Upgrade id="p2">
            {#snippet desc(effect)}
            Gain more points based on your points.<br>
            Effect: x{effect.toStringWhole(5, 3, 3)}
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
    }
</style>