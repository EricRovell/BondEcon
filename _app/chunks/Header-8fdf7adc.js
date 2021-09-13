import{S as t,i as e,s,e as l,c as o,a as n,d as a,b as r,f as c,R as i,v as $,r as f,k as h,n as p,H as m,B as u,u as g,Q as d,a4 as v,j as b,m as x,o as E,w as j,K as y,X as T,U as w,l as S,J as I,t as N,g as C,h as O}from"./vendor-3f2a1874.js";import{o as _,p as q,q as z,r as A}from"./timeline.module-55415b74.js";import{M as B,T as D,a as H}from"./ThemeToggle-7517f975.js";import"./Avatar.svelte_svelte&type=style&lang-596541f2.js";import{T as R}from"./__layout-619c157c.js";import"./stores-6827800f.js";import"./preload-helper-9f12a5fd.js";import"./socials-79493fd5.js";const k=t=>({}),J=t=>({}),K=t=>({}),M=t=>({}),P=t=>({}),Q=t=>({});function U(t){let e,s;const h=t[2].logo,p=d(h,t,t[1],Q);return{c(){e=l("section"),p&&p.c(),this.h()},l(t){e=o(t,"SECTION",{label:!0,class:!0});var s=n(e);p&&p.l(s),s.forEach(a),this.h()},h(){r(e,"label","logo"),r(e,"class","svelte-1x4chhi")},m(t,l){c(t,e,l),p&&p.m(e,null),s=!0},p(t,e){p&&p.p&&(!s||2&e)&&i(p,h,t,t[1],e,P,Q)},i(t){s||($(p,t),s=!0)},o(t){f(p,t),s=!1},d(t){t&&a(e),p&&p.d(t)}}}function V(t){let e,s;const h=t[2].navigation,p=d(h,t,t[1],M);return{c(){e=l("section"),p&&p.c(),this.h()},l(t){e=o(t,"SECTION",{label:!0,class:!0});var s=n(e);p&&p.l(s),s.forEach(a),this.h()},h(){r(e,"label","navigation"),r(e,"class","svelte-1x4chhi")},m(t,l){c(t,e,l),p&&p.m(e,null),s=!0},p(t,e){p&&p.p&&(!s||2&e)&&i(p,h,t,t[1],e,K,M)},i(t){s||($(p,t),s=!0)},o(t){f(p,t),s=!1},d(t){t&&a(e),p&&p.d(t)}}}function F(t){let e,s;const h=t[2].controls,p=d(h,t,t[1],J);return{c(){e=l("section"),p&&p.c(),this.h()},l(t){e=o(t,"SECTION",{label:!0,class:!0});var s=n(e);p&&p.l(s),s.forEach(a),this.h()},h(){r(e,"label","controls"),r(e,"class","svelte-1x4chhi")},m(t,l){c(t,e,l),p&&p.m(e,null),s=!0},p(t,e){p&&p.p&&(!s||2&e)&&i(p,h,t,t[1],e,k,J)},i(t){s||($(p,t),s=!0)},o(t){f(p,t),s=!1},d(t){t&&a(e),p&&p.d(t)}}}function G(t){let e,s,i,d,v=t[0].logo&&U(t),b=t[0].navigation&&V(t),x=t[0].controls&&F(t);return{c(){e=l("header"),v&&v.c(),s=h(),b&&b.c(),i=h(),x&&x.c(),this.h()},l(t){e=o(t,"HEADER",{class:!0});var l=n(e);v&&v.l(l),s=p(l),b&&b.l(l),i=p(l),x&&x.l(l),l.forEach(a),this.h()},h(){r(e,"class","svelte-1x4chhi")},m(t,l){c(t,e,l),v&&v.m(e,null),m(e,s),b&&b.m(e,null),m(e,i),x&&x.m(e,null),d=!0},p(t,[l]){t[0].logo?v?(v.p(t,l),1&l&&$(v,1)):(v=U(t),v.c(),$(v,1),v.m(e,s)):v&&(u(),f(v,1,1,(()=>{v=null})),g()),t[0].navigation?b?(b.p(t,l),1&l&&$(b,1)):(b=V(t),b.c(),$(b,1),b.m(e,i)):b&&(u(),f(b,1,1,(()=>{b=null})),g()),t[0].controls?x?(x.p(t,l),1&l&&$(x,1)):(x=F(t),x.c(),$(x,1),x.m(e,null)):x&&(u(),f(x,1,1,(()=>{x=null})),g())},i(t){d||($(v),$(b),$(x),d=!0)},o(t){f(v),f(b),f(x),d=!1},d(t){t&&a(e),v&&v.d(),b&&b.d(),x&&x.d()}}}function L(t,e,s){let{$$slots:l={},$$scope:o}=e;const n=v(l);return t.$$set=t=>{"$$scope"in t&&s(1,o=t.$$scope)},[n,o,l]}class W extends t{constructor(t){super(),e(this,t,L,G,s,{})}}function X(t,e,s){const l=t.slice();return l[6]=e[s].href,l[7]=e[s].label,l[8]=e[s].pattern,l}function Y(t){let e,s;return e=new R({props:{slot:"logo"}}),{c(){b(e.$$.fragment)},l(t){x(e.$$.fragment,t)},m(t,l){E(e,t,l),s=!0},p:w,i(t){s||($(e.$$.fragment,t),s=!0)},o(t){f(e.$$.fragment,t),s=!1},d(t){j(e,t)}}}function Z(t){let e,s,l=t[1](`sections.${t[7]}`)+"";return{c(){e=N(l),s=h()},l(t){e=C(t,l),s=p(t)},m(t,l){c(t,e,l),c(t,s,l)},p(t,s){3&s&&l!==(l=t[1](`sections.${t[7]}`)+"")&&O(e,l)},d(t){t&&a(e),t&&a(s)}}}function tt(t){let e,s;return e=new H({props:{href:t[6],pattern:t[8],decorationPosition:"top",decorationSize:"4px",$$slots:{default:[Z]},$$scope:{ctx:t}}}),{c(){b(e.$$.fragment)},l(t){x(e.$$.fragment,t)},m(t,l){E(e,t,l),s=!0},p(t,s){const l={};1&s&&(l.href=t[6]),1&s&&(l.pattern=t[8]),2051&s&&(l.$$scope={dirty:s,ctx:t}),e.$set(l)},i(t){s||($(e.$$.fragment,t),s=!0)},o(t){f(e.$$.fragment,t),s=!1},d(t){j(e,t)}}}function et(t){let e,s,l=t[0],o=[];for(let a=0;a<l.length;a+=1)o[a]=tt(X(t,l,a));const n=t=>f(o[t],1,1,(()=>{o[t]=null}));return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=S()},l(t){for(let e=0;e<o.length;e+=1)o[e].l(t);e=S()},m(t,l){for(let e=0;e<o.length;e+=1)o[e].m(t,l);c(t,e,l),s=!0},p(t,s){if(3&s){let a;for(l=t[0],a=0;a<l.length;a+=1){const n=X(t,l,a);o[a]?(o[a].p(n,s),$(o[a],1)):(o[a]=tt(n),o[a].c(),$(o[a],1),o[a].m(e.parentNode,e))}for(u(),a=l.length;a<o.length;a+=1)n(a);g()}},i(t){if(!s){for(let t=0;t<l.length;t+=1)$(o[t]);s=!0}},o(t){o=o.filter(Boolean);for(let e=0;e<o.length;e+=1)f(o[e]);s=!1},d(t){I(o,t),t&&a(e)}}}function st(t){let e,s;return e=new B({props:{slot:"navigation",$$slots:{default:[et]},$$scope:{ctx:t}}}),{c(){b(e.$$.fragment)},l(t){x(e.$$.fragment,t)},m(t,l){E(e,t,l),s=!0},p(t,s){const l={};2051&s&&(l.$$scope={dirty:s,ctx:t}),e.$set(l)},i(t){s||($(e.$$.fragment,t),s=!0)},o(t){f(e.$$.fragment,t),s=!1},d(t){j(e,t)}}}function lt(t){let e,s;return e=new D({props:{size:"35px",title:t[1]("tooltip.change-theme")}}),{c(){b(e.$$.fragment)},l(t){x(e.$$.fragment,t)},m(t,l){E(e,t,l),s=!0},p(t,s){const l={};2&s&&(l.title=t[1]("tooltip.change-theme")),e.$set(l)},i(t){s||($(e.$$.fragment,t),s=!0)},o(t){f(e.$$.fragment,t),s=!1},d(t){j(e,t)}}}function ot(t){let e,s,i;return s=new W({props:{$$slots:{controls:[lt],navigation:[st],logo:[Y]},$$scope:{ctx:t}}}),{c(){e=l("div"),b(s.$$.fragment),this.h()},l(t){e=o(t,"DIV",{class:!0});var l=n(e);x(s.$$.fragment,l),l.forEach(a),this.h()},h(){r(e,"class","svelte-sxqod5")},m(t,l){c(t,e,l),E(s,e,null),i=!0},p(t,[e]){const l={};2051&e&&(l.$$scope={dirty:e,ctx:t}),s.$set(l)},i(t){i||($(s.$$.fragment,t),i=!0)},o(t){f(s.$$.fragment,t),i=!1},d(t){t&&a(e),j(s)}}}function nt(t,e,s){let l,o,n,a,r,c;return y(t,_,(t=>s(2,o=t))),y(t,q,(t=>s(3,n=t))),y(t,z,(t=>s(4,a=t))),y(t,A,(t=>s(5,r=t))),y(t,T,(t=>s(1,c=t))),t.$$.update=()=>{60&t.$$.dirty&&s(0,l=[{label:"home",href:o,pattern:/home\/*/},{label:"blog",href:n,pattern:/blog\/*/},{label:"cv",href:a,pattern:/cv\/*/},{label:"about",href:r,pattern:/about\/*/}])},[l,c,o,n,a,r]}export default class extends t{constructor(t){super(),e(this,t,nt,ot,s,{})}}
