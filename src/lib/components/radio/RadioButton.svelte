<script lang="ts">
  export let value: string;
  export let group: any;
  export let disabled: boolean = false;
  export let title: string | undefined = undefined;
  export let label: string | undefined = undefined;
  export let name: string;
</script>

<!--
  @component
  Radio Button
-->
<label {title}>
  <slot name="left" />
  <input
    type="radio"
    bind:group
    {value}
    {disabled}
    {name}
    on:change
  />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <mask id="radio-mask">
        <rect x="0" y="0" width="100" height="100" fill="white" />
        <rect x="75" y="15" width="25" height="25" transform="rotate(-45 85 30)" fill="black" />
      </mask>
    </defs>
    <path
      mask="url(#radio-mask)"
      fill="none"
      d="M50 5
        a 45 45 0 0 1 0 90
        a 45 45 0 0 1 0 -90" />
    <polyline fill="none" points="25.61 43.14 47.11 64.64 95.39 16.36"/>
  </svg>  
  <span>{label}</span>
  <slot name="right" />
</label>

<style>
  label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    position: relative;
    user-select: none;
    cursor: pointer;
  }
  
  label:focus-within {
    color: red;
  }
  
  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  
  input:checked + svg polyline {
    stroke-dashoffset: 0;
  }
  
  input:not(:checked) + svg path {
    mask: none;
  }
  
  svg {
    width: 1em;
    height: 1em;
    stroke: yellow;
    stroke-width: 5px;
    stroke-linecap: round;
    
    margin-right: 0.5em;
  }
  
  svg path {
    fill: none;
  }
  
  svg polyline {
    stroke-miterlimit: 10;

    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    transition: stroke-dashoffset 0.15s ease-in-out;
  }
</style>