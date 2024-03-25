import { writable, type Writable } from 'svelte/store';
import type { Result } from './routes/dashboard/result.dto';

export const user: Writable<string> = writable('');
export const results: Writable<Result[]> = writable([]);
