<script lang="ts">
  import { SVG } from "@svg";
  
  export let title = "Love";
  export let size: string | undefined = "1em";
  export let frozen = false;
</script>

<!--
  @component
  Beating heart SVG component.
  
  Usage:
    ```
      <Heartbeat title="What is love?" size="36px" />
    ```
  
  Props:
  
    | Name   | type     | default | description         |
    |:-------|:---------|:--------|:--------------------|
    | title  | string?  | "Love"  | Custom title        |
    | size   | string?  | "1em"   | Component's size    |
    | frozen | boolean? | false   | Stops the animation |
-->
<SVG viewBox="0 0 100 100" {size}>
  <title>{title}</title>
  <g class:frozen>
    <path d="M74.17,10A28.61,28.61,0,0,0,51.4,21.76a1.68,1.68,0,0,1-2.8,0A28.75,28.75,0,0,0,25.83,10C13,10,3.33,20.57,3.33,34.56c0,17.21,16.5,30.89,41.46,51.6l4.14,3.43a1.66,1.66,0,0,0,2.14,0l4.14-3.43h0c25-20.71,41.46-34.39,41.46-51.6C96.67,20.57,87,10,74.17,10Z" />
    <path d="M74.17,6.69h0A31.49,31.49,0,0,0,50,18.11,31.49,31.49,0,0,0,25.83,6.69C11.11,6.69,0,18.67,0,34.56,0,53.33,17,67.41,42.67,88.72l4.13,3.43a5,5,0,0,0,6.41,0l4.12-3.43C83,67.41,100,53.33,100,34.56,100,18.67,88.89,6.69,74.17,6.69Zm-19,79.47h0l-4.14,3.43a1.66,1.66,0,0,1-2.14,0l-4.14-3.43c-25-20.71-41.46-34.39-41.46-51.6C3.33,20.57,13,10,25.83,10A28.75,28.75,0,0,1,48.6,21.77a1.68,1.68,0,0,0,2.8,0A28.61,28.61,0,0,1,74.17,10C87,10,96.67,20.57,96.67,34.56,96.67,51.77,80.17,65.45,55.21,86.16Z" />
  </g>
</SVG>

<style>
  g:not(.frozen) {
    animation: heartbeat 0.5s ease-in infinite alternate;
    transform-origin: 50% 50%;
  }
  
  .frozen {
    fill:#d7443e;
  }

  @keyframes heartbeat {
    0% {
      transform: scale(0.7);
      fill: #d7443e;
    }

    5% {
      transform: scale(0.8);
      fill: #d7443e;
    }

    10% {
      transform: scale(0.7);
    }

    15% {
      transform: scale(1);
      fill: #d7443e;
    }

    50% {
      transform: scale(0.7);
      fill: red;
    }

    100% {
      transform: scale(0.7);
      fill: red;
    }
  }
</style>