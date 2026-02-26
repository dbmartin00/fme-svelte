<script lang="ts">
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import welcome from '$lib/images/svelte-welcome.webp';
  import harnessWelcome from '$lib/images/harness-welcome.jpg';
	import Counter from './Counter.svelte';

  import { attributes } from '$lib/stores/attributes';
  
  // Use the import let = require syntax on TS.
  import { SplitFactory } from '@splitsoftware/splitio';
   
  // Instantiate the SDK
  const factory: SplitIO.IBrowserSDK = SplitFactory({ 
    core: {
      authorizationKey: '28bddhnjht06lvi8e5aa9rkmv5glsc40ltaa',
      key: 'dmartin'
    },
    startup: {
      readyTimeout: 5 // 1.5 sec
    },
    debug: false
  });
   
  // And get the client instance you'll use
  const client: SplitIO.IBrowserClient = factory.client();

  /** 
    Works with experimental async turned on (svelte.config.js):

    // start sample svelte.config.js
    import adapter from '@sveltejs/adapter-auto';

    // @type {import('@sveltejs/kit').Config} 
    const config = {
      kit: {
        adapter: adapter()
      },
      compilerOptions: {
        experimental: {
          async: true
        }
      }
    };

    export default config;
    // end sample svelte.config.js

  // and here... 
  await client.ready();
  */ 

  let image = welcome; // default 
  client.on(client.Event.SDK_READY, function() {
    console.log('SDK_READY!');
    setImageFromFlag();
  });

  client.on(client.Event.SDK_UPDATE, function() {
    console.log('SDK_UPDATE!');
    setImageFromFlag();
  });

  function setImageFromFlag() {
    const attrs = { ...$attributes };
    console.log('Role is:', attrs.role);

    console.log('READY treatment', client.getTreatment('svelte_flag'), attrs);
    console.log('treatment', client.getTreatment('svelte_flag'));
    const toggle = client.getTreatment('svelte_flag'); 
    image = toggle === "on" ? harnessWelcome : welcome;

    const results = client.getTreatmentWithConfig('svelte_flag', attrs);
    const configImage = JSON.parse(results.config || "null")?.banner;
    console.log('configImage', configImage);
    image = configImage;
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
      <source srcset={image} type="image/webp"/>
      <img src={image} alt="Welcome"/>
    </picture>
  </span>
<!--
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcomeFallback} alt="Welcome" />
			</picture>
		</span>
-->
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
