<script>
    import news from "$lib/news/news.json"
    import { onMount } from "svelte";
    import globalUpdater from "$lib/globalUpdater";

    /** @type {HTMLDivElement} */
    let rootEl
    /** @type {HTMLSpanElement} */
    let textEl

    let distanceMultiplier = 48

    onMount(() => {
        let startTime = 0
        function change() {
            startTime = Date.now()
            textEl.innerText = news[Math.floor(Math.random() * news.length)]
        }

        globalUpdater.addUpdate((_, remove) => {
            let t = (Date.now() - startTime) / 1000

            if (!rootEl) {
                remove()
                return
            }

            let rootWidth = rootEl.getBoundingClientRect().width
            let textWidth = textEl.getBoundingClientRect().width
            let distanceTravel = rootWidth + textWidth

            textEl.style.right = `${t * distanceMultiplier - textWidth}px`

            if (distanceTravel <= t * distanceMultiplier) {
                change()
            }
        })
    })
</script>

<div bind:this={rootEl}>
    <span class="text" bind:this={textEl}></span>
</div>

<style>
    div {
        background: #fff;
        border: 4px solid #000;
        border-radius: 8px;
        height: 22px;
        padding: 4px 0px;
        max-width: 640px;
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .text {
        position: absolute;
        top: 4px;
        white-space: nowrap;
    }
</style>