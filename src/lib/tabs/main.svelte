<script>
    import Building from "$lib/building/building.svelte";
    import Resource from "$lib/resource/resource.svelte";
    import Upgrade from "$lib/upgrade/upgrade.svelte";
</script>
<div class="main">
    <div class="generators">
        <Building id="maker">
            {#snippet generation(effect)}
            (+<Resource id={effect[1]} amountOverride={effect[0]} />/s)
            {/snippet}
        </Building>
        <Building id="generator">
            {#snippet generation(effect)}
            (+<Resource id={effect[1]} amountOverride={effect[0]} />/s)
            {/snippet}
        </Building>
        <Building id="producer">
            {#snippet generation(effect)}
            (+<Resource id={effect[1]} amountOverride={effect[0]} />/s)
            {/snippet}
        </Building>
        <Building id="booster">
            {#snippet generation(effect)}
            (x<Resource id={effect[1]} amountOverride={effect[0]} />)
            {/snippet}
        </Building>
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
        <Upgrade id="p3">
            {#snippet desc(effect)}
            Unlock boosters.
            {/snippet}
        </Upgrade>
    </div>
</div>

<style>
    .main {
        gap: 16px;
    }

    .generators {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 16px;
    }

    .upgrades {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
    }
</style>