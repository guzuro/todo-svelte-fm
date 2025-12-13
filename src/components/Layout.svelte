<script lang="ts">
    const { children } = $props();
</script>

<div class="layout">
    <div class="layout-content">
        {@render children()}
    </div>
</div>

<style>
    .layout {
        position: relative;
        background-color: var(--bg-layout);
        min-height: 100vh;
    }

    .layout::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;

        height: 33vh;

        background-image: var(--bg-hero);
        background-size: cover;
        z-index: 1;
    }

    .layout-content {
        position: relative;
        z-index: 2;
    }
</style>
