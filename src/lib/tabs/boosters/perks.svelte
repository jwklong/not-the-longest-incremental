<script>
    import Button from "$lib/button.svelte";
    import data from "$lib/data/data";
    import Resource from "$lib/resource/resource.svelte";
    import Upgrade from "$lib/upgrade/upgrade.svelte";

    function respec() {
        if (confirm("Are you sure you want to respec? This will perform a booster reset with no reward.")) {
            data.getLayer("booster").reset(true)
            data.getResource("boosterPoints").amount = data.getResource("boosterPoints").amount.add(data.getUpgrade("bp1").cost()[0].div(8).floor().mul(2))
            data.getUpgrade("bp1").bought = false
            data.getUpgrade("bp2").bought = false
            data.getUpgrade("bp3").bought = false
        }
    }
</script>

<div class="main">
    <Button color={["var(--red-300)"]} on:click={respec}>Respec</Button>
    <div class="upgrades">
        <Upgrade id="bp1">
            {#snippet desc(effect)}
            Gain more points based on time spent between each booster reset.<br>
            Effect: x<Resource id="points" amountOverride={effect} />
            {/snippet}
        </Upgrade>
        <Upgrade id="bp2">
            {#snippet desc(effect)}
            Higher level buildings boost lower level buildings.
            {/snippet}
        </Upgrade>
        <Upgrade id="bp3">
            {#snippet desc(effect)}
            Decrease building price based on your boosters.
            Effect: /{effect.toStringWhole(5, 3, 3)}
            {/snippet}
        </Upgrade>
    </div>
</div>

<style>
    .main {
        gap: 16px;
    }

    .upgrades {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        width: 632px;
    }
</style>