import { writable } from 'svelte/store';

export type Attributes = {
	role?: 'foreman' | 'worker';
};

export const attributes = writable<Attributes>({
  role: 'worker'
});