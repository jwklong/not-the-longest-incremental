<script>
    import onum from "$lib/onum";
    import { onMount } from "svelte";

    let { requirement = () => false, children } = $props()

    let result = $state(requirement())

    onMount(() => {
        function main() {
            result = requirement()

            requestAnimationFrame(main)
        }
        requestAnimationFrame(main)
    })
</script>

<div class="milestone" class:active={result}>
    {@render children()}
</div>

<style lang="scss">
    .milestone {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        background-color: var(--red-300);
        width: 100%;
        border-radius: 8px;
    }
    .milestone.active {
        background-color: var(--green-300);
    }

    .milestone > :global(*) {
        display: block;
        min-width: 100px;

        &:last-child {
            text-align: right;
            font-weight: bold;
        }
    }
</style>