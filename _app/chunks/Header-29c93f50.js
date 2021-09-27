import{S as t,i as e,s,e as l,c as n,a as o,d as a,b as r,f as c,R as $,v as i,r as f,k as m,n as p,H as h,B as g,u,Q as d,a4 as v,j as x,m as b,o as E,w as j,K as w,X as y,U as T,l as k,J as S,t as I,g as N,h as C}from"./vendor-3f2a1874.js";import{o as O,p as _,q,r as z}from"./timeline.module-e2861cc1.js";import{M as A,T as B,a as D}from"./ThemeToggle-6b40f46f.js";import{T as H,L as R}from"./__layout-3f6b43ed.js";import"./Avatar.svelte_svelte&type=style&lang-596541f2.js";import"./stores-6827800f.js";import"./preload-helper-9f12a5fd.js";import"./socials-2127ff00.js";const J=t=>({}),K=t=>({}),L=t=>({}),M=t=>({}),P=t=>({}),Q=t=>({});function U(t){let e,s;const m=t[2].logo,p=d(m,t,t[1],Q);return{c(){e=l("section"),p&&p.c(),this.h()},l(t){e=n(t,"SECTION",{label:!0,class:!0});var s=o(e);p&&p.l(s),s.forEach(a),this.h()},h(){r(e,"label","logo"),r(e,"class","svelte-1kx2l7x")},m(t,l){c(t,e,l),p&&p.m(e,null),s=!0},p(t,e){p&&p.p&&(!s||2&e)&&$(p,m,t,t[1],e,P,Q)},i(t){s||(i(p,t),s=!0)},o(t){f(p,t),s=!1},d(t){t&&a(e),p&&p.d(t)}}}function V(t){let e,s;const m=t[2].navigation,p=d(m,t,t[1],M);return{c(){e=l("section"),p&&p.c(),this.h()},l(t){e=n(t,"SECTION",{label:!0,class:!0});var s=o(e);p&&p.l(s),s.forEach(a),this.h()},h(){r(e,"label","navigation"),r(e,"class","svelte-1kx2l7x")},m(t,l){c(t,e,l),p&&p.m(e,null),s=!0},p(t,e){p&&p.p&&(!s||2&e)&&$(p,m,t,t[1],e,L,M)},i(t){s||(i(p,t),s=!0)},o(t){f(p,t),s=!1},d(t){t&&a(e),p&&p.d(t)}}}function F(t){let e,s;const m=t[2].controls,p=d(m,t,t[1],K);return{c(){e=l("section"),p&&p.c(),this.h()},l(t){e=n(t,"SECTION",{label:!0,class:!0});var s=o(e);p&&p.l(s),s.forEach(a),this.h()},h(){r(e,"label","controls"),r(e,"class","svelte-1kx2l7x")},m(t,l){c(t,e,l),p&&p.m(e,null),s=!0},p(t,e){p&&p.p&&(!s||2&e)&&$(p,m,t,t[1],e,J,K)},i(t){s||(i(p,t),s=!0)},o(t){f(p,t),s=!1},d(t){t&&a(e),p&&p.d(t)}}}function G(t){let e,s,$,d,v=t[0].logo&&U(t),x=t[0].navigation&&V(t),b=t[0].controls&&F(t);return{c(){e=l("header"),v&&v.c(),s=m(),x&&x.c(),$=m(),b&&b.c(),this.h()},l(t){e=n(t,"HEADER",{class:!0});var l=o(e);v&&v.l(l),s=p(l),x&&x.l(l),$=p(l),b&&b.l(l),l.forEach(a),this.h()},h(){r(e,"class","svelte-1kx2l7x")},m(t,l){c(t,e,l),v&&v.m(e,null),h(e,s),x&&x.m(e,null),h(e,$),b&&b.m(e,null),d=!0},p(t,[l]){t[0].logo?v?(v.p(t,l),1&l&&i(v,1)):(v=U(t),v.c(),i(v,1),v.m(e,s)):v&&(g(),f(v,1,1,(()=>{v=null})),u()),t[0].navigation?x?(x.p(t,l),1&l&&i(x,1)):(x=V(t),x.c(),i(x,1),x.m(e,$)):x&&(g(),f(x,1,1,(()=>{x=null})),u()),t[0].controls?b?(b.p(t,l),1&l&&i(b,1)):(b=F(t),b.c(),i(b,1),b.m(e,null)):b&&(g(),f(b,1,1,(()=>{b=null})),u())},i(t){d||(i(v),i(x),i(b),d=!0)},o(t){f(v),f(x),f(b),d=!1},d(t){t&&a(e),v&&v.d(),x&&x.d(),b&&b.d()}}}function W(t,e,s){let{$$slots:l={},$$scope:n}=e;const o=v(l);return t.$$set=t=>{"$$scope"in t&&s(1,n=t.$$scope)},[o,n,l]}class X extends t{constructor(t){super(),e(this,t,W,G,s,{})}}function Y(t,e,s){const l=t.slice();return l[6]=e[s].href,l[7]=e[s].label,l[8]=e[s].pattern,l}function Z(t){let e,s;return e=new H({props:{slot:"logo"}}),{c(){x(e.$$.fragment)},l(t){b(e.$$.fragment,t)},m(t,l){E(e,t,l),s=!0},p:T,i(t){s||(i(e.$$.fragment,t),s=!0)},o(t){f(e.$$.fragment,t),s=!1},d(t){j(e,t)}}}function tt(t){let e,s,l=t[1](`sections.${t[7]}`)+"";return{c(){e=I(l),s=m()},l(t){e=N(t,l),s=p(t)},m(t,l){c(t,e,l),c(t,s,l)},p(t,s){3&s&&l!==(l=t[1](`sections.${t[7]}`)+"")&&C(e,l)},d(t){t&&a(e),t&&a(s)}}}function et(t){let e,s;return e=new D({props:{href:t[6],pattern:t[8],decorationPosition:"top",decorationSize:"4px",$$slots:{default:[tt]},$$scope:{ctx:t}}}),{c(){x(e.$$.fragment)},l(t){b(e.$$.fragment,t)},m(t,l){E(e,t,l),s=!0},p(t,s){const l={};1&s&&(l.href=t[6]),1&s&&(l.pattern=t[8]),2051&s&&(l.$$scope={dirty:s,ctx:t}),e.$set(l)},i(t){s||(i(e.$$.fragment,t),s=!0)},o(t){f(e.$$.fragment,t),s=!1},d(t){j(e,t)}}}function st(t){let e,s,l=t[0],n=[];for(let a=0;a<l.length;a+=1)n[a]=et(Y(t,l,a));const o=t=>f(n[t],1,1,(()=>{n[t]=null}));return{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=k()},l(t){for(let e=0;e<n.length;e+=1)n[e].l(t);e=k()},m(t,l){for(let e=0;e<n.length;e+=1)n[e].m(t,l);c(t,e,l),s=!0},p(t,s){if(3&s){let a;for(l=t[0],a=0;a<l.length;a+=1){const o=Y(t,l,a);n[a]?(n[a].p(o,s),i(n[a],1)):(n[a]=et(o),n[a].c(),i(n[a],1),n[a].m(e.parentNode,e))}for(g(),a=l.length;a<n.length;a+=1)o(a);u()}},i(t){if(!s){for(let t=0;t<l.length;t+=1)i(n[t]);s=!0}},o(t){n=n.filter(Boolean);for(let e=0;e<n.length;e+=1)f(n[e]);s=!1},d(t){S(n,t),t&&a(e)}}}function lt(t){let e,s;return e=new A({props:{slot:"navigation",$$slots:{default:[st]},$$scope:{ctx:t}}}),{c(){x(e.$$.fragment)},l(t){b(e.$$.fragment,t)},m(t,l){E(e,t,l),s=!0},p(t,s){const l={};2051&s&&(l.$$scope={dirty:s,ctx:t}),e.$set(l)},i(t){s||(i(e.$$.fragment,t),s=!0)},o(t){f(e.$$.fragment,t),s=!1},d(t){j(e,t)}}}function nt(t){let e,s,l,n;return e=new B({props:{size:"35px",title:t[1]("tooltip.change-theme")}}),l=new R({}),{c(){x(e.$$.fragment),s=m(),x(l.$$.fragment)},l(t){b(e.$$.fragment,t),s=p(t),b(l.$$.fragment,t)},m(t,o){E(e,t,o),c(t,s,o),E(l,t,o),n=!0},p(t,s){const l={};2&s&&(l.title=t[1]("tooltip.change-theme")),e.$set(l)},i(t){n||(i(e.$$.fragment,t),i(l.$$.fragment,t),n=!0)},o(t){f(e.$$.fragment,t),f(l.$$.fragment,t),n=!1},d(t){j(e,t),t&&a(s),j(l,t)}}}function ot(t){let e,s,$;return s=new X({props:{$$slots:{controls:[nt],navigation:[lt],logo:[Z]},$$scope:{ctx:t}}}),{c(){e=l("div"),x(s.$$.fragment),this.h()},l(t){e=n(t,"DIV",{class:!0});var l=o(e);b(s.$$.fragment,l),l.forEach(a),this.h()},h(){r(e,"class","svelte-sxqod5")},m(t,l){c(t,e,l),E(s,e,null),$=!0},p(t,[e]){const l={};2051&e&&(l.$$scope={dirty:e,ctx:t}),s.$set(l)},i(t){$||(i(s.$$.fragment,t),$=!0)},o(t){f(s.$$.fragment,t),$=!1},d(t){t&&a(e),j(s)}}}function at(t,e,s){let l,n,o,a,r,c;return w(t,O,(t=>s(2,n=t))),w(t,_,(t=>s(3,o=t))),w(t,q,(t=>s(4,a=t))),w(t,z,(t=>s(5,r=t))),w(t,y,(t=>s(1,c=t))),t.$$.update=()=>{60&t.$$.dirty&&s(0,l=[{label:"home",href:n,pattern:/home\/*/},{label:"blog",href:o,pattern:/blog\/*/},{label:"cv",href:a,pattern:/cv\/*/},{label:"about",href:r,pattern:/about\/*/}])},[l,c,n,o,a,r]}export default class extends t{constructor(t){super(),e(this,t,at,ot,s,{})}}
