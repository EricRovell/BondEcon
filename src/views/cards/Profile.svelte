<script lang="ts">
  import { Avatar } from "@svg/complex";
  import { SVG, iconLocation, iconMobile, iconMail } from "@svg";
  import { Heading } from "@components/typography";
  
  export let name: string;
  export let location: string;
  export let mobile: string;
  export let mail: string;
</script>

<!--
  @component
  Profile Card View component
  Displays the user's avatar and contact information.
  
  Usage:
    ```
      <ProfileCard {...props} />
    ```
    
  Props:
  
    | Name     | type   | default  | description          |
    |:---------|:-------|:---------|:---------------------|
    | name     | string | required | User's name          |
    | location | string | required | User's location      |
    | mobile   | string | required | User's mobile number |
    | mail     | string | required | User's mail address  |
-->
<div id="profile">
  <Avatar glasses size="100%" />
  <Heading level={1} size={7} center>
    {name}
  </Heading>
  <ul>
    <li>
      <SVG data={iconLocation} icon accent mr />
      <span>{location}</span>
    </li>
    <li>
      <SVG data={iconMobile} icon accent mr />     
      <a href="tel:{mobile.replace(/\s|-/g, "")}">
        {mobile}
      </a>
    </li>
    <li>
      <SVG data={iconMail} icon accent mr />
      <a href="mailto:{mail}">
        {mail}
      </a>
    </li>
  </ul>
</div>

<style>  
  #profile {
    grid-column: 1;
    grid-row: 2;

    position: sticky;
    top: calc(25px);
    height: min-content;

    padding-top: var(--spacing-6);
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: var(--spacing-3);
  }
  
  #profile ul {
    display: flex;
    flex-direction: column;
    place-items: center;
    gap: var(--spacing-2);
    
    font-size: var(--font-size-2);
  }

  #profile li {
    display: flex;
    justify-items: center;
    align-items: center;
    width: fit-content;
  }

  @media screen and (max-width: 750px) {

    #profile {
      grid-column: 1;
      grid-row: 1;

      position: initial;
    }

    #profile ul {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 0;
    }
  }
</style>