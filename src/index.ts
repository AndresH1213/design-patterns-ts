import prompt from 'prompt-sync';
const line = prompt();
import child_process from 'node:child_process';

const topic = line('Insert the path to the file to run. Example: solid/dependency-inversion: ');

if (topic) {
  child_process.execSync(`npm run dev:file --filename=${topic}`);
}
