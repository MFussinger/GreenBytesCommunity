/// <reference types="vite/client" />

// Deklariere globale Typen für Assets
declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  
  declare module '*.png' {
    const content: string;
    export default content;
  }
  
  // Ergänze diese globalen Typen, falls du sie später brauchst
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    // mehr Umgebungsvariablen hier
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }