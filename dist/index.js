"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const line = (0, prompt_sync_1.default)();
const node_child_process_1 = __importDefault(require("node:child_process"));
const topic = line('Insert the path to the file to run. Example: solid/dependency-inversion: ');
if (topic) {
    console.log('hey');
    node_child_process_1.default.execSync(`npm run dev:file --filename=${topic}`);
}
