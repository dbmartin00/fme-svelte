<script lang="ts">
  import welcomeFallback from '$lib/images/svelte-welcome.png';
  import welcome from '$lib/images/svelte-welcome.webp';
  import harnessWelcome from '$lib/images/harness-welcome.jpg';

  import Counter from './Counter.svelte';

  import { attributes } from '$lib/stores/attributes';
  import { client, splitUpdate } from '$lib/harness/splitClient';

  let image = welcome;

  // React whenever Split updates OR attributes change
  $: if ($splitUpdate || $attributes) {
    setImageFromFlag();
  }

  function setImageFromFlag() {
    // Split client does not exist during SSR
    if (!client) return;

    const attrs = { ...$attributes };

    console.log('Role is:', attrs.role);

    const toggle = client.getTreatment('svelte_flag', attrs);
    console.log('setImageFromFlag treatment', toggle);

    image = toggle === 'on' ? harnessWelcome : welcome;

    const results = client.getTreatmentWithConfig('svelte_flag', attrs);

    const configImage =
      results.config ? JSON.parse(results.config)?.banner : null;

    if (configImage) {
      image = configImage;
    }

    console.log('image', image);
  }
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1>
    <span class="welcome">
      <picture>
        <source srcset={image} type="image/webp" />
        <img src={image} alt="Welcome" />
      </picture>
    </span>
    to your new<br />SvelteKit app
  </h1>

  <h2>
    try editing <strong>src/routes/+page.svelte</strong>
  </h2>

  <Counter />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
    background-color: black;
    color: gray;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>