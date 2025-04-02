<script>
    import onum from "$lib/onum";
    import { onMount } from "svelte";
    import globalUpdater from "$lib/globalUpdater";

    let { requirement = () => false, children } = $props()

    let result = $state(requirement())

    onMount(() => {
        globalUpdater.addUpdate(() => {
            result = requirement()
        })
    })
</script>

<div class="milestone" class:active={result}>
    {@render children()}
</div>

<style lang="scss">
    .milestone {
        display: flex;
        flex-direction: column;
        padding: 8px;
        background-color: var(--red-800);
        color: var(--red-50);
        width: 100%;
        border-radius: 8px;
        box-shadow: inset 0 0 4px 1px #0008;
    }
    .milestone.active {
        background-color: var(--green-700);
        color: var(--green-50);
    }

    .milestone > :global(*) {
        display: block;
        min-width: 100px;

        &:last-child {
            font-weight: 600;
            font-size: 0.75em;
        }
    }

    :global(.milestone:not(.active) + .milestone:not(.active)) {
        display: none;
    }
</style>