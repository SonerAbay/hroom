if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>i(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/1-black.png",revision:"88f8d8a26523e85df4e47cec7a78b086"},{url:"/_next/app-build-manifest.json",revision:"d0683da6e2e34879fffc7a5d6a79f158"},{url:"/_next/static/buZRFirBGx_6v8SNbkthE/_buildManifest.js",revision:"9262961651e0d7fa108aef74f09893fc"},{url:"/_next/static/buZRFirBGx_6v8SNbkthE/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/108-0f2244fb1aba841b.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/2443530c-572b24363cbae43f.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/488-bb8ec137247bd86f.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/758-2ac1f04688cc0699.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/9ecc3739-09dfb907da604f40.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/app/dream/page-e4eaacec5def4d6d.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/app/en/dream/page-a0f74dc00a90703e.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/app/en/page-54ba95100b4339bd.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/app/ko/dream/page-c3b20ecfb26e9b3a.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/app/ko/page-f35b12ee8b038a67.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/app/layout-d2bf15ea5b54db30.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/app/page-477538857718303e.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/main-2733194deeeccccf.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/main-app-77d2ff7e34791da3.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/pages/_app-b555d5e1eab47959.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/pages/_error-d79168f986538ac0.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-59f1e8d5f5d89c54.js",revision:"buZRFirBGx_6v8SNbkthE"},{url:"/_next/static/css/4cfab02dcb18185b.css",revision:"4cfab02dcb18185b"},{url:"/_next/static/css/86b5a40e9aee9e8f.css",revision:"86b5a40e9aee9e8f"},{url:"/bed.svg",revision:"36d4f9c7b081bc5b845be43c83fab2b4"},{url:"/english.svg",revision:"6dcadf6916764560c2f1fec586e2c1de"},{url:"/favicon.ico",revision:"924132dc02248331e777af15f5ad62c8"},{url:"/generated-pic-2.jpeg",revision:"1293594aa8340a37bbd7324434e912e3"},{url:"/generated-pic-2.jpg",revision:"c7e13aea3130fe9fc3ef20f9557fb444"},{url:"/generated-pic.png",revision:"56fb92e592d6946a0116341b1d88ec0c"},{url:"/generatedpic.png",revision:"8f7f4dfadc0e2bb4dfa388d538b41117"},{url:"/icon192.png",revision:"2a6a7de50a95711cab469b0a27aed5cd"},{url:"/icon512.png",revision:"fa457e68cfb2b63b03c06e4bebbf030d"},{url:"/korean.svg",revision:"2a183310b78d3d4fe57f88abcc491fcd"},{url:"/manifest.json",revision:"0bdb4fcf064a2041847c5c655e2cf954"},{url:"/number-1-white.svg",revision:"8b9448fd5e3acb9b65f12fb67775fa74"},{url:"/number-2-white.svg",revision:"0e562171cabd71092c5fa78106a8b570"},{url:"/number-3-white.svg",revision:"261edc6d72a4b24f5d8346297c83278f"},{url:"/number-4-white.svg",revision:"1db4bdee7dfe457b8001bb8f744d8d80"},{url:"/og-image.png",revision:"1fbeaea789472dca82a4bef61dd2604a"},{url:"/original-pic.jpeg",revision:"d63c54f945dca24def9bd89418d1416b"},{url:"/original-pic.jpg",revision:"7f5c1b9d99dabbfee782eeb5cd1ef2fc"},{url:"/screenshot.png",revision:"7cc0b4f80560880e61f4e74756bbb500"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"},{url:"/vercelLogo.png",revision:"4074c64e88f69e4b8c85e474c2f4ffe7"},{url:"/vercelLogo.svg",revision:"1be339412f6480167dc83d4c21993992"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
