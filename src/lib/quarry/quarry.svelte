<script>
    import data from "$lib/data/data";
    import onum from "$lib/onum";
    import { onMount } from "svelte";
    import globalUpdater from "$lib/globalUpdater";
    import Resource from "$lib/resource/resource.svelte";
    import Button from "$lib/button.svelte";

    let {
        id = ""
    } = $props()

    let quarry = $state(data.quarrys[id])
    let currentOre = $state(quarry.currentOre)
    let health = $state(onum())
    let maxHealth = $state(onum())
    let value = $state(null)
    let clickDamage = $state(quarry.clickDamage())

    onMount(() => {
        globalUpdater.addUpdate(() => {
            currentOre = quarry.currentOre
            health = currentOre ? currentOre.health : onum()
            maxHealth = currentOre ? currentOre.maxHealth : onum()
            value = currentOre ? currentOre.value() : null
            clickDamage = quarry.clickDamage()
        })
    });

    function mine() {
        currentOre.damage(clickDamage)
    }
</script>

<div class="main">
    <div class="ore">
        {#if currentOre && !currentOre.isDestroyed()}
            <img src={currentOre.image} alt={currentOre.name} />
            <div class="info">
                <div class="name">
                    <span>{currentOre.name}</span>
                    <!--{#if value}
                        <Resource id={value[1]} amountOverride={value[0]} />
                    {/if}-->
                </div>
                <div class="health">
                    <div class="inner" style:width={health.div(maxHealth).toNumber() * 100 + "%"}></div>
                    <span>{health.toStringWhole(5, 3, 3)}/{maxHealth.toStringWhole(5, 3, 3)}</span>
                </div>
                <Button on:click={mine} disabled={clickDamage.lte(0)}>Mine</Button>
            </div>
        {:else}
            <h2>Waiting...</h2>
        {/if}
    </div>
    <div class="other"></div>
</div>

<style>
    .main {
        display: flex;
        width: 350px;
        height: 300px;
        background: #444;
        box-shadow: inset 0 0 15px #0008;
        border-radius: 8px;
        flex-direction: row;
        color: #ddd;
    }

    .ore {
        display: flex;
        width: 200px;
        height: 300px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .ore > img {
        width: 200px;
        height: 200px;
    }

    .info {
        display: flex;
        flex-direction: column;
        width: 200px;
        height: 150px;
        padding: 0px 8px 8px 8px;
        box-sizing: border-box;
        justify-content: space-around;
    }

    .info > .name {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .info > .health {
        position: relative;
        display: flex;
        justify-content: center;
        padding: 2px;
        width: 100%;
        box-sizing: border-box;
        background-color: var(--red-400);
        overflow: hidden;
        color: var(--blue-950);
        font-weight: 500;
        border-radius: 13px;
        font-size: 14px;
    }

    .info > .health > .inner {
        background-color: var(--green-400);
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .info > .health > span {
        z-index: 2;
    }

    .other {
        display: flex;
        width: 150px;
        height: 300px;
    }
</style>