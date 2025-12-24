<script lang="ts">
  import { themeState, toggleTheme } from "../utils/theme";
</script>

<button class="theme-toggle-button" title="toggle theme" onclick={toggleTheme}>
  {#if $themeState === "dark"}
    <img src="../assets/icons/icon-sun.svg" />
  {:else}
    <img src="../assets/icons/icon-moon.svg" />
  {/if}
</button>

<style>
  .theme-toggle-button {
    cursor: pointer;
    background: none;
    border: none;

    &:hover {
      opacity: 0.75;
    }
  }
</style>
