/* SystemJS module definition */
/// <reference path="../typings/index.d.ts" />
declare var module: NodeModule;
declare module 'pdfmake/build/pdfmake.js';
declare module 'pdfmake/build/vfs_fonts.js';
interface NodeModule {
  id: string;
}
