(()=>{var i=Object.create,r=Object.defineProperty,m=Object.getPrototypeOf,l=Object.prototype.hasOwnProperty,h=Object.getOwnPropertyNames,d=Object.getOwnPropertyDescriptor;var S=e=>r(e,"__esModule",{value:!0});var f=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var k=(e,t,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of h(t))!l.call(e,a)&&a!=="default"&&r(e,a,{get:()=>t[a],enumerable:!(o=d(t,a))||o.enumerable});return e},w=e=>k(S(r(e!=null?i(m(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var c=f(s=>{s.generateRandomString=()=>{let e=20;for(var t=[],o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._",a=o.length,n=0;n<e;n++)t.push(o.charAt(Math.floor(Math.random()*a)));return t.join("")}});var g=w(c());window.onload=()=>{u()};function u(){let e=new URLSearchParams(window.location.hash.slice(1));if(e.has("access_token")){let t=e.get("state");if(localStorage.getItem("stateParameter")!==t)return console.log("You may have been clickjacked!");let a=e.get("access_token"),n=e.get("token_type");sessionStorage.setItem("d_tokenType",n),sessionStorage.setItem("d_access_token",a),sessionStorage.setItem("d_state",t),window.location.href="/"}else{let t=(0,g.generateRandomString)();localStorage.setItem("stateParameter",t),window.location.href="/#state="+encodeURIComponent(btoa(t))}}})();