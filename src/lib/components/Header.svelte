<script lang="ts">
  import { homePagePath, blogPagePath, cvPagePath, aboutPagePath } from "@core/routes";
  
  import { _ } from "svelte-i18n";
  import { Menu, MenuItem } from "./menu";
  import { ThemeToggle, LangSelect } from "./utility";
  import Title from "./Title.svelte";
  import Masthead from "./Masthead.svelte";
  
  $: navigation = [
    {
      label: "home",
      href: $homePagePath,
      pattern: /home\/*/
    },
    {
      label: "blog",
      href: $blogPagePath,
      pattern: /blog\/*/
    },
    {
      label: "cv",
      href: $cvPagePath,
      pattern: /cv\/*/
    },
    {
      label: "about",
      href: $aboutPagePath,
      pattern: /about\/*/
    }
  ];
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
        <MenuItem {href} {pattern} decorationPosition="top" decorationSize="4px">
          {$_(`sections.${label}`)}
        </MenuItem>
      {/each}
    </Menu>
    <svelte:fragment slot="controls">
      <LangSelect title={$_("tooltip.change-locale")} />
      <ThemeToggle size="35px" title={$_("tooltip.change-theme")} />
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