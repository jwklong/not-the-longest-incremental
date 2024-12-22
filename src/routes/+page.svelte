<script>
    import data from "$lib/data/data";
    import onum from "$lib/onum";
    import Resource from "$lib/resource/resource.svelte";
    import Achievements from "$lib/tabs/achievements.svelte";
    import Boosters from "$lib/tabs/boosters.svelte";
    import Main from "$lib/tabs/main.svelte";
    import Settings from "$lib/tabs/settings.svelte";
    import TabsManager from "$lib/tabs/tabsManager.svelte";
    import { onMount } from "svelte";

    let tabs = [
        {
            label: "Main",
            id: "main",
            color: ["#fff"],
            tab: Main
        },
        {
            label: "Boosters",
            id: "boosters",
            color: ["var(--green-300)"],
            visible: () => data.getLayer('booster').hasReset,
            tab: Boosters
        },
        {
            label: "Achievements",
            id: "ach",
            color: ["var(--cobalt-500)"],
            tab: Achievements
        },
        {
            label: "Settings",
            id: "settings",
            color: ["var(--blue-950)", "#fff"],
            tab: Settings
        }
    ]

    onMount(() => {
        // @ts-ignore
        window.onum = onum; window.data = data

        if (localStorage.getItem("data")) {
            data.deserialize(localStorage.getItem("data"))
        }

        let oldtime = 0
        function tick(newtime) {
            data.tick((newtime - oldtime) / 1000)
            oldtime = newtime

            requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)

        window.onbeforeunload = () => {
            localStorage.setItem("data", data.serialize())
        }
    })
</script>

<div class="root">
    <h1>You have <Resource id="points" showGain /></h1>

    <TabsManager items={tabs} />
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

    :global(body), :root {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    :global(*) {
        font-family: "Noto Sans", sans-serif;
    }

    .root {
        --blue-50: #f3f7fb;
        --blue-100: #e3edf6;
        --blue-200: #cee0ef;
        --blue-300: #adcce3;
        --blue-400: #85b1d5;
        --blue-500: #719dcc;
        --blue-600: #5580bb;
        --blue-700: #4a6dab;
        --blue-800: #415b8c;
        --blue-900: #384d70;
        --blue-950: #263045;

        --cobalt-50: #edf9ff;
        --cobalt-100: #d6f0ff;
        --cobalt-200: #b5e7ff;
        --cobalt-300: #83d9ff;
        --cobalt-400: #48c2ff;
        --cobalt-500: #1ea1ff;
        --cobalt-600: #0682ff;
        --cobalt-700: #006eff;
        --cobalt-800: #0854c5;
        --cobalt-900: #0d4a9b;
        --cobalt-950: #0e2d5d;
        
        --green-50: #effef4;
        --green-100: #d9ffe9;
        --green-200: #b5fdd3;
        --green-300: #7bfab2;
        --green-400: #5cf09c;
        --green-500: #12d567;
        --green-600: #08b151;
        --green-700: #0a8b43;
        --green-800: #0e6d38;
        --green-900: #0e5931;
        --green-950: #013218;
        
        --red-50: #fff1f2;
        --red-100: #ffdfe1;
        --red-200: #ffc5c8;
        --red-300: #ff9da2;
        --red-400: #ff646c;
        --red-500: #ff2934;
        --red-600: #ed1520;
        --red-700: #c80d17;
        --red-800: #a50f17;
        --red-900: #88141a;
        --red-950: #4b0408;

        --orange-50: #fef8ee;
        --orange-100: #fdf0d7;
        --orange-200: #faddae;
        --orange-300: #f6c47b;
        --orange-400: #f2a650;
        --orange-500: #ed8522;
        --orange-600: #df6c17;
        --orange-700: #b95215;
        --orange-800: #934119;
        --orange-900: #773817;
        --orange-950: #401a0a;

        --purple-50: #f5f3ff;
        --purple-100: #ede9fe;
        --purple-200: #ddd6fe;
        --purple-300: #c4b5fd;
        --purple-400: #a78bfa;
        --purple-500: #9b73f7;
        --purple-600: #7c3aed;
        --purple-700: #6d28d9;
        --purple-800: #5b21b6;
        --purple-900: #4c1d95;
        --purple-950: #2e1065;

        --gold-50: #fcfbea;
        --gold-100: #f9f6c8;
        --gold-200: #f5eb93;
        --gold-300: #eed84f;
        --gold-400: #e8c527;
        --gold-500: #d8ae1a;
        --gold-600: #ba8714;
        --gold-700: #956313;
        --gold-800: #7c4e17;
        --gold-900: #69411a;
        --gold-950: #3d220b;


        width: 100%;
        height: 100%;
        padding: 8px;
        background-color: var(--blue-400);
        color: var(--blue-950);
        box-sizing: border-box;
        overflow-y: scroll;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    :global(h1, h2, h3, h4, h5, h6) {
        margin: 0;
    }
</style>