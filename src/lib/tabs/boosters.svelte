<script>
    import Building from "$lib/building/building.svelte";
    import Resource from "$lib/resource/resource.svelte";

    import TabsManager from "$lib/tabs/tabsManager.svelte";
    import Milestones from "./boosters/milestones.svelte";
    import Perks from "./boosters/perks.svelte";

    let tabs = [
        {
            label: "Milestones",
            id: "milestones",
            color: ["var(--green-300)"],
            tab: Milestones
        }, {
            label: "Perks",
            id: "perks",
            color: ["var(--orange-300)"],
            tab: Perks
        }
    ]
</script>
<div class="main">
    <div class="generators">
        <Building id="booster">
            {#snippet generation(effect)}
            (x<Resource id={effect[1]} amountOverride={effect[0]} />)
            {/snippet}
        </Building>
    </div>
    <h2>You have <Resource id="boosterPoints" showGain /></h2>
    <TabsManager items={tabs} />
</div>

<style>
    .main {
        gap: 16px;
    }

    .generators {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>