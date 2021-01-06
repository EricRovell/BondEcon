<script lang="ts" context="module">
  import {
    SVG,
    iconSocialHSE,
    iconSocialLinkedIn,
    iconSocialTelegram,
    iconSocialInstagram,
    iconSocialFacebook
  } from "@svg";
  
  export const socials = [
    {
      name: "HSE",
      href: "https://www.hse.ru/staff/bondarenko",
      icon: iconSocialHSE
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ksenia-bondarenko-034649104/",
      icon: iconSocialLinkedIn
    },
    {
      name: "Telegram",
      href: "https://t.me/BondEcon",
      icon: iconSocialTelegram
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/xena_bond",
      icon: iconSocialInstagram
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/Xenabondarenko/",
      icon: iconSocialFacebook
    }
  ];
</script>

<script lang="ts">
  import { FlexBox } from "@components/layout";
  
  export let iconSize = "1em";
  export let labels = false;
</script>

<!--
  @component
  Social Links View Component
  Renders a predefined list of owners social links.
  
  Usage:
    ```
      <Socials />
    ```
  
  Props:
  
    | Name     | type     | default | description                   |
    |:---------|:---------|:--------|:------------------------------|
    | iconSize | string?  | "1em"   | The size of social icons      |
    | labels   | boolean? | false   | should the labels be rendered |
-->
<FlexBox tag="ul" justify="space-between">
  {#each socials as { href, name, icon }}
    <li>
      <a {href} class:labels>
        <SVG data={icon} size={iconSize} />
        <span>{name}</span>
      </a>
    </li>
  {/each}
</FlexBox>

<style>
  li {
    list-style: none;
    height: 100%;
    
    flex-grow: 1;
    flex-basis: 0;
  }

  li:not(:first-child) {
    margin-left: 6px;
  }
  
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  a > span {
    display: none;
  }
  
  a.labels > span {
    display: block;
    font-size: var(--font-size-1);
    margin-top: 1em;
  }
</style>