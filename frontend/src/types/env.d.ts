/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_Server_Url: string
    // more env variables...
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }