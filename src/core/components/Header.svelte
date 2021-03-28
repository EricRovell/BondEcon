<script lang="ts">
  import { navigation } from "../meta";
  import { locale, message } from "@stores/locale";
  import { Menu, MenuItem } from "@components/navigation";
  import { ThemeToggle, LangSelect } from "@components/input";
  import Title from "./Title.svelte";
  import { Masthead } from "@components/layout";
</script>

<!--
  @component
  BondEcon Masthead component.  
-->
<div>
  <Masthead>
    <Title slot="logo" />
    <Menu slot="navigation">
      {#each navigation as { href, label, pattern }}
        <MenuItem href={`/${$locale}${href}`} {pattern} decorationPosition="top" decorationSize="4px">
          {$message(label, { defaultMessage: label })}
        </MenuItem>
      {/each}
    </Menu>
    <svelte:fragment slot="controls">
      <LangSelect />
      <ThemeToggle size="35px" />
    </svelte:fragment>
  </Masthead>
</div>

<style>
  div {
    position: sticky;
    top: 0;
    z-index: var(--z-index-navigation);
    
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: hsl(var(--surface-h) var(--surface-s-400) var(--surface-l-400) / 0.8);
    backdrop-filter: saturate(180%) blur(5px);
    transition: background-color 0.2s linear;
  }
</style>