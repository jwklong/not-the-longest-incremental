<script>
    let { active = false, disabled = false, color=["#fff", "inherit"], children } = $props()
</script>

<button class:active={active} disabled={disabled} style="background: {color[0] || "#fff"}; color: {color[1] || "inherit"};" on:click>
    {@render children()}
</button>

<style>
    button {
        box-sizing: border-box;
        margin-top: 0;
        border: none;
        border-bottom: 2px solid #0004;
        border-radius: 4px;
        display: block;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-weight: 500;
        transition: filter 0.2s;
    }

    button:is(.active, :active):not(:disabled) {
        filter: brightness(0.93);
        border-bottom-width: 0;
        margin-top: 2px;
    }

    button:disabled {
        filter: grayscale(0.5) opacity(0.7) brightness(0.7);
    }
</style>