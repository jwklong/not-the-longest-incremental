<script>
    import Building from "$lib/building/building.svelte";
    import Button from "$lib/button.svelte";
    import data from "$lib/data/data";
    import Resource from "$lib/resource/resource.svelte";
    import Upgrade from "$lib/upgrade/upgrade.svelte";
    import { onMount } from "svelte";

    let maxBtn = $state(false)

    onMount(() => {
        function main() {
            maxBtn = data.getLayer("booster").hasReset
            requestAnimationFrame(main)
        }
        requestAnimationFrame(main)
    })

    function buyMax() {
        if (data.getBuilding("booster").amount.gte(9)) {
            data.getUpgrade("p1").buy()
            data.getUpgrade("p2").buy()
            data.getUpgrade("p3").buy()
            data.getUpgrade("p4").buy()
            data.getUpgrade("p5").buy()
            data.getUpgrade("p6").buy()
        }

        data.getBuilding("provider").maxBuy()
        data.getBuilding("fabricator").maxBuy()
        data.getBuilding("producer").maxBuy()
        data.getBuilding("generator").maxBuy()
        data.getBuilding("maker").maxBuy()
    }
</script>
<div class="main">
    {#if maxBtn}
        <Button on:click={buyMax}>Buy max</Button>
    {/if}
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
        <Building id="fabricator">
            {#snippet generation(effect)}
            (+<Resource id={effect[1]} amountOverride={effect[0]} />/s)
            {/snippet}
        </Building>
        <Building id="provider">
            {#snippet generation(effect)}
            (x<Resource id={effect[1]} amountOverride={effect[0]} />)
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
            Effect: x<Resource id="points" amountOverride={effect} />
            {/snippet}
        </Upgrade>
        <Upgrade id="p2">
            {#snippet desc(effect)}
            Gain more points based on your points.<br>
            Effect: x<Resource id="points" amountOverride={effect} />
            {/snippet}
        </Upgrade>
        <Upgrade id="p3">
            {#snippet desc(effect)}
            Unlock boosters.
            {/snippet}
        </Upgrade>
        <Upgrade id="p4">
            {#snippet desc(effect)}
            Upgrade 2 has a better formula.
            {/snippet}
        </Upgrade>
        <Upgrade id="p5">
            {#snippet desc(effect)}
            Makers produce points 5x faster.
            {/snippet}
        </Upgrade>
        <Upgrade id="p6">
            {#snippet desc(effect)}
            Fabricator production is multiplied by Boosters.
            Effect: x{effect.toStringWhole(5, 3, 3)}
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
        width: 848px;
    }
</style>