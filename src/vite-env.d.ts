/// <reference types="vite/client" />

declare module '*.css';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

interface ImportMetaEnv {
  readonly VITE_AI_BASE_URL?: string;
  readonly VITE_AI_MODEL?: string;
  readonly VITE_AI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
