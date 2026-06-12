/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the ZYVORA superchat backend, e.g. https://zyvora-superchat.onrender.com */
  readonly VITE_SUPERCHAT_API?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
