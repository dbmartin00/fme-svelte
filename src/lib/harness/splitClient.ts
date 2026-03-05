import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { SplitFactory } from '@splitsoftware/splitio';

export const splitReady = writable(false);
export const splitUpdate = writable(0);

let client: SplitIO.IBrowserClient | null = null;

if (browser) {
  const factory: SplitIO.IBrowserSDK = SplitFactory({
    core: {
      authorizationKey: '28bddhnjht06lvi8e5aa9rkmv5glsc40ltaa',
      key: 'dmartin'
    },
    startup: {
      readyTimeout: 5
    },
    debug: false
  });

  client = factory.client();

  client.on(client.Event.SDK_READY, () => {
    console.log('Split SDK_READY');
    splitReady.set(true);
    splitUpdate.update(n => n + 1);
  });

  client.on(client.Event.SDK_UPDATE, () => {
    console.log('Split SDK_UPDATE');
    splitUpdate.update(n => n + 1);
  });
}

export { client };