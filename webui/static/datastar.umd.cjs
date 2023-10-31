(function(y,w){typeof exports=="object"&&typeof module<"u"?w(exports):typeof define=="function"&&define.amd?define(["exports"],w):(y=typeof globalThis<"u"?globalThis:y||self,w(y.Datastar={}))})(this,function(y){"use strict";function w(t){return t instanceof HTMLElement||t instanceof SVGElement?t:null}function $(){throw new Error("Cycle detected")}function Fe(){throw new Error("Computed cannot have side-effects")}const Ve=Symbol.for("preact-signals"),_=1,M=2,N=4,L=8,H=16,S=32;function x(){k++}function D(){if(k>1){k--;return}let t,e=!1;for(;R!==void 0;){let r=R;for(R=void 0,G++;r!==void 0;){const n=r._nextBatchedEffect;if(r._nextBatchedEffect=void 0,r._flags&=~M,!(r._flags&L)&&se(r))try{r._callback()}catch(o){e||(t=o,e=!0)}r=n}}if(G=0,k--,e)throw t}function Be(t){if(k>0)return t();x();try{return t()}finally{D()}}let u,R,k=0,G=0,I=0;function ne(t){if(u===void 0)return;let e=t._node;if(e===void 0||e._target!==u)return e={_version:0,_source:t,_prevSource:u._sources,_nextSource:void 0,_target:u,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},u._sources!==void 0&&(u._sources._nextSource=e),u._sources=e,t._node=e,u._flags&S&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=u._sources,e._nextSource=void 0,u._sources._nextSource=e,u._sources=e),e}function p(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}p.prototype.brand=Ve,p.prototype._refresh=function(){return!0},p.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)},p.prototype._unsubscribe=function(t){if(this._targets!==void 0){const e=t._prevTarget,r=t._nextTarget;e!==void 0&&(e._nextTarget=r,t._prevTarget=void 0),r!==void 0&&(r._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=r)}},p.prototype.subscribe=function(t){const e=this;return z(function(){const r=e.value,n=this._flags&S;this._flags&=~S;try{t(r)}finally{this._flags|=n}})},p.prototype.valueOf=function(){return this.value},p.prototype.toString=function(){return this.value+""},p.prototype.toJSON=function(){return this.value},p.prototype.peek=function(){return this._value},Object.defineProperty(p.prototype,"value",{get(){const t=ne(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(u instanceof b&&Fe(),t!==this._value){G>100&&$(),this._value=t,this._version++,I++,x();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{D()}}}});function oe(t){return new p(t)}function se(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function ie(t){for(let e=t._sources;e!==void 0;e=e._nextSource){const r=e._source._node;if(r!==void 0&&(e._rollbackNode=r),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function ae(t){let e=t._sources,r;for(;e!==void 0;){const n=e._prevSource;e._version===-1?(e._source._unsubscribe(e),n!==void 0&&(n._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=n)):r=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=n}t._sources=r}function b(t){p.call(this,void 0),this._compute=t,this._sources=void 0,this._globalVersion=I-1,this._flags=N}b.prototype=new p,b.prototype._refresh=function(){if(this._flags&=~M,this._flags&_)return!1;if((this._flags&(N|S))===S||(this._flags&=~N,this._globalVersion===I))return!0;if(this._globalVersion=I,this._flags|=_,this._version>0&&!se(this))return this._flags&=~_,!0;const t=u;try{ie(this),u=this;const e=this._compute();(this._flags&H||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~H,this._version++)}catch(e){this._value=e,this._flags|=H,this._version++}return u=t,ae(this),this._flags&=~_,!0},b.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=N|S;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}p.prototype._subscribe.call(this,t)},b.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(p.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~S;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}},b.prototype._notify=function(){if(!(this._flags&M)){this._flags|=N|M;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}},b.prototype.peek=function(){if(this._refresh()||$(),this._flags&H)throw this._value;return this._value},Object.defineProperty(b.prototype,"value",{get(){this._flags&_&&$();const t=ne(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&H)throw this._value;return this._value}});function je(t){return new b(t)}function le(t){const e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){x();const r=u;u=void 0;try{e()}catch(n){throw t._flags&=~_,t._flags|=L,J(t),n}finally{u=r,D()}}}function J(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._compute=void 0,t._sources=void 0,le(t)}function Ue(t){if(u!==this)throw new Error("Out-of-order effect");ae(this),u=t,this._flags&=~_,this._flags&L&&J(this),D()}function O(t){this._compute=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=S}O.prototype._callback=function(){const t=this._start();try{if(this._flags&L||this._compute===void 0)return;const e=this._compute();typeof e=="function"&&(this._cleanup=e)}finally{t()}},O.prototype._start=function(){this._flags&_&&$(),this._flags|=_,this._flags&=~L,le(this),ie(this),x();const t=u;return u=this,Ue.bind(this,t)},O.prototype._notify=function(){this._flags&M||(this._flags|=M,this._nextBatchedEffect=R,R=this)},O.prototype._dispose=function(){this._flags|=L,this._flags&_||J(this)};function z(t){const e=new O(t);try{e._callback()}catch(r){throw e._dispose(),r}return e._dispose.bind(e)}class ce{get value(){return X(this)}set value(e){Be(()=>We(this,e))}peek(){return X(this,{peek:!0})}}const Z=t=>Object.assign(new ce,Object.entries(t).reduce((e,[r,n])=>{if(["value","peek"].some(o=>o===r))throw new Error(`${r} is a reserved property name`);return typeof n!="object"||n===null||Array.isArray(n)?e[r]=oe(n):e[r]=Z(n),e},{})),We=(t,e)=>Object.keys(e).forEach(r=>t[r].value=e[r]),X=(t,{peek:e=!1}={})=>Object.entries(t).reduce((r,[n,o])=>(o instanceof p?r[n]=e?o.peek():o.value:o instanceof ce&&(r[n]=X(o,{peek:e})),r),{});function ue(t,e){if(typeof e!="object"||Array.isArray(e)||!e)return JSON.parse(JSON.stringify(e));if(typeof e=="object"&&e.toJSON!==void 0&&typeof e.toJSON=="function")return e.toJSON();let r=t;return typeof t!="object"&&(r={...e}),Object.keys(e).forEach(n=>{r.hasOwnProperty(n)||(r[n]=e[n]),e[n]===null?delete r[n]:r[n]=ue(r[n],e[n])}),r}const qe="[a-zA-Z_$][0-9a-zA-Z_$]*",Y=(t,e,r)=>new RegExp(`(?<whole>\\${t}(?<${e}>${qe}))${r}`,"g"),Ke={name:"SignalProcessor",description:"Replacing $signal with ctx.store.signal.value",regexp:Y("$","signal",""),replacer:t=>{const{signal:e}=t;return`ctx.store.${e}.value`}},Ge={name:"ActionProcessor",description:"Replacing @action(args) with ctx.actions.action(ctx, args)",regexp:Y("@","action","(?<call>\\((?<args>.*)\\))?"),replacer:({action:t,args:e})=>`ctx.actions.${t}(ctx, ${e||""})`},Je={name:"RefProcessor",description:"Replacing #foo with ctx.refs.foo",regexp:Y("~","ref",""),replacer({ref:t}){return`data.refs.${t}`}},ze=[Ke,Ge,Je],Ze=[{prefix:"mergeStore",description:"Setup the global store",onLoad:t=>{const e=t.expressionFn(t);t.mergeStore(e)}},{prefix:"ref",description:"Sets the value of the element",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,bypassExpressionFunctionCreation:!0,preprocessors:new Set([]),onLoad:t=>{const{el:e,expression:r}=t;return t.refs[r]=e,()=>delete t.refs[r]}}];class fe{plugins=[];store=Z({});actions={};refs={};reactivity={signal:oe,computed:je,effect:z};missingIDNext=0;removals=new Map;constructor(e={},...r){if(this.actions=Object.assign(this.actions,e),r=[...Ze,...r],!r.length)throw new Error("No plugins provided");const n=new Set;for(const o of r){if(o.requiredPluginPrefixes){for(const s of o.requiredPluginPrefixes)if(!n.has(s))throw new Error(`Plugin ${o.prefix} requires plugin ${s}`)}this.plugins.push(o),n.add(o.prefix)}}run(){this.plugins.forEach(e=>{e.onGlobalInit&&e.onGlobalInit({actions:this.actions,refs:this.refs,reactivity:this.reactivity,mergeStore:this.mergeStore.bind(this),store:this.store})}),this.applyPlugins(document.body)}cleanupElementRemovals(e){const r=this.removals.get(e);if(r){for(const n of r)n();this.removals.delete(e)}}mergeStore(e){const r=ue(this.store.value,e);this.store=Z(r)}signalByName(e){return this.store.value[e]}applyPlugins(e){const r=new Set;this.plugins.forEach((n,o)=>{de(e,s=>{o===0&&this.cleanupElementRemovals(s);const i=w(s);if(i){if(i.id){const a=i.style;a.viewTransitionName=i.id}if(!i.id&&i.tagName!=="BODY"){const a=(this.missingIDNext++).toString(16).padStart(8,"0");i.id=`ds${a}`}for(const a in i.dataset){let f=i.dataset[a]||"";if(!a.startsWith(n.prefix))continue;if(r.clear(),n.allowedTags&&!n.allowedTags.has(i.tagName.toLowerCase()))throw new Error(`Tag '${i.tagName}' is not allowed for plugin '${a}', allowed tags are: ${[[...n.allowedTags].map(h=>`'${h}'`)].join(", ")}`);let m=a.slice(n.prefix.length),[l,...c]=m.split(".");if(n.mustHaveEmptyKey&&l.length>0)throw new Error(`Attribute '${a}' must have empty key`);if(n.mustNotEmptyKey&&l.length===0)throw new Error(`Attribute '${a}' must have non-empty key`);l.length&&(l=l[0].toLowerCase()+l.slice(1));const g=c.map(h=>{const[P,...K]=h.split("_");return{label:P,args:K}});if(n.allowedModifiers){for(const h of g)if(!n.allowedModifiers.has(h.label))throw new Error(`Modifier '${h.label}' is not allowed`)}const d=new Map;for(const h of g)d.set(h.label,h.args);if(n.mustHaveEmptyExpression&&f.length)throw new Error(`Attribute '${a}' must have empty expression`);if(n.mustNotEmptyExpression&&!f.length)throw new Error(`Attribute '${a}' must have non-empty expression`);const v=[...ze,...n.preprocessors||[]];for(const h of v){if(r.has(h))continue;r.add(h);const P=[...f.matchAll(h.regexp)];if(P.length)for(const K of P){if(!K.groups)continue;const{groups:Ie}=K,{whole:kt}=Ie;f=f.replace(kt,h.replacer(Ie))}}const{store:E,reactivity:Nt,actions:Ht,refs:Rt}=this,xe={store:E,mergeStore:this.mergeStore.bind(this),applyPlugins:this.applyPlugins.bind(this),actions:Ht,refs:Rt,reactivity:Nt,el:i,key:l,expression:f,expressionFn:()=>{throw new Error("Expression function not created")},modifiers:d};if(!n.bypassExpressionFunctionCreation&&!n.mustHaveEmptyExpression&&f.length){const h=`return ${f}`;try{const P=new Function("ctx",h);xe.expressionFn=P}catch{console.error(`Error evaluating expression '${h}' on ${i.id?`#${i.id}`:i.tagName}`);return}}const De=n.onLoad(xe);De&&(this.removals.has(i)||this.removals.set(i,new Set),this.removals.get(i).add(De))}}})})}}function de(t,e){if(t)for(e(t),t=t.firstElementChild;t;)de(t,e),t=t.nextElementSibling}const Xe=t=>t.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(e,r)=>(r?"-":"")+e.toLowerCase()),Ye={prefix:"bind",description:"Sets the value of the element",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>t.reactivity.effect(()=>{const e=Xe(t.key),r=t.expressionFn(t);t.el.setAttribute(e,`${r}`)})},he=["change","input","keydown"],Qe={prefix:"model",description:"Sets the value of the element",mustHaveEmptyKey:!0,allowedTags:new Set(["input","textarea","select"]),bypassExpressionFunctionCreation:!0,onLoad:t=>{const{store:e,el:r,expression:n}=t,o=e[n];return t.reactivity.effect(()=>{if(!("value"in r))throw new Error("Element does not have value property");r.value=`${o.value}`;const s=()=>{const i=o.value;if(typeof i=="number")o.value=Number(r.value);else if(typeof i=="string")o.value=r.value;else if(typeof i=="boolean")o.value=!!r.value;else throw new Error("Unsupported type")};return s(),he.forEach(i=>{r.addEventListener(i,s)}),()=>{he.forEach(i=>{r.removeEventListener(i,s)})}})}},et={prefix:"text",description:"Sets the textContent of the element",mustHaveEmptyKey:!0,onLoad:t=>{const{el:e,expressionFn:r}=t;if(!(e instanceof HTMLElement))throw new Error("Element is not HTMLElement");return t.reactivity.effect(()=>{e.textContent=`${r(t)}`})}},pe="DOMContentLoaded",tt=[Ye,Qe,et,{prefix:"focus",description:"Sets the focus of the element",mustHaveEmptyKey:!0,mustHaveEmptyExpression:!0,onLoad:t=>(t.el.tabIndex||t.el.setAttribute("tabindex","0"),t.el.focus(),t.el.scrollIntoView({block:"center",inline:"center"}),()=>t.el.blur())},{prefix:"on",description:"Sets the event listener of the element",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,allowedModifiers:new Set(["once","passive","capture","debounce","throttle"]),onLoad:t=>{const{el:e,key:r,expressionFn:n}=t;let o=()=>{n(t)};const s=t.modifiers.get("debounce");if(s){const m=ge(s),l=F(s,"leading",!1),c=F(s,"noTrail",!0);o=rt(o,m,l,c)}const i=t.modifiers.get("throttle");if(i){const m=ge(i),l=F(i,"noLead",!0),c=F(i,"noTrail",!0);o=nt(o,m,l,c)}const a={capture:!0,passive:!1,once:!1};if(t.modifiers.has("capture")||(a.capture=!1),t.modifiers.has("passive")&&(a.passive=!0),t.modifiers.has("once")&&(a.once=!0),r==="load")return document.addEventListener(pe,o,a),()=>{document.removeEventListener(pe,o)};const f=r.toLowerCase();return e.addEventListener(f,o,a),()=>{e.removeEventListener(f,o)}}}];function ge(t){if(!t||t?.length===0)return 0;for(const e of t){if(e.endsWith("ms"))return Number(e.replace("ms",""));if(e.endsWith("s"))return Number(e.replace("s",""))*1e3;try{return parseFloat(e)}catch{}}return 0}function F(t,e,r=!1){return t?t.includes(e)||r:!1}function rt(t,e,r=!1,n=!0){let o;const s=()=>o&&clearTimeout(o);return function(...a){s(),r&&!o&&t(...a),o=setTimeout(()=>{n&&t(...a),s()},e)}}function nt(t,e,r=!0,n=!1){let o=!1,s=null;return function(...a){o?s=a:(o=!0,r?t(...a):s=a,setTimeout(()=>{n&&s&&(t(...s),s=null),o=!1},e))}}const V=new WeakSet;function ot(t,e,r={}){t instanceof Document&&(t=t.documentElement);let n;typeof e=="string"?n=ct(e):n=e;const o=ut(n),s=it(t,o,r);return me(t,o,s)}function me(t,e,r){if(r.head.block){const n=t.querySelector("head"),o=e.querySelector("head");if(n&&o){const s=_e(o,n,r);Promise.all(s).then(()=>{me(t,e,Object.assign(r,{head:{block:!1,ignore:!0}}))});return}}if(r.morphStyle==="innerHTML")return ve(e,t,r),t.children;if(r.morphStyle==="outerHTML"||r.morphStyle==null){const n=dt(e,t,r);if(!n)throw new Error("Could not find best match");const o=n?.previousSibling,s=n?.nextSibling,i=B(t,n,r);return n?ft(o,i,s):[]}else throw"Do not understand how to morph style "+r.morphStyle}function B(t,e,r){if(!(r.ignoreActive&&t===document.activeElement))if(e==null){if(r.callbacks.beforeNodeRemoved(t)===!1)return;t.remove(),r.callbacks.afterNodeRemoved(t);return}else{if(U(t,e))return r.callbacks.beforeNodeMorphed(t,e)===!1?void 0:(t instanceof HTMLHeadElement&&r.head.ignore||(e instanceof HTMLHeadElement&&t instanceof HTMLHeadElement&&r.head.style!=="morph"?_e(e,t,r):(st(e,t),ve(e,t,r))),r.callbacks.afterNodeMorphed(t,e),t);if(r.callbacks.beforeNodeRemoved(t)===!1||r.callbacks.beforeNodeAdded(e)===!1)return;if(!t.parentElement)throw new Error("oldNode has no parentElement");return t.parentElement.replaceChild(e,t),r.callbacks.afterNodeAdded(e),r.callbacks.afterNodeRemoved(t),e}}function ve(t,e,r){let n=t.firstChild,o=e.firstChild,s;for(;n;){if(s=n,n=s.nextSibling,o==null){if(r.callbacks.beforeNodeAdded(s)===!1)return;e.appendChild(s),r.callbacks.afterNodeAdded(s),A(r,s);continue}if(ye(s,o,r)){B(o,s,r),o=o.nextSibling,A(r,s);continue}let i=at(t,e,s,o,r);if(i){o=be(o,i,r),B(i,s,r),A(r,s);continue}let a=lt(t,s,o,r);if(a){o=be(o,a,r),B(a,s,r),A(r,s);continue}if(r.callbacks.beforeNodeAdded(s)===!1)return;e.insertBefore(s,o),r.callbacks.afterNodeAdded(s),A(r,s)}for(;o!==null;){let i=o;o=o.nextSibling,we(i,r)}}function st(t,e){let r=t.nodeType;if(r===1){for(const n of t.attributes)e.getAttribute(n.name)!==n.value&&e.setAttribute(n.name,n.value);for(const n of e.attributes)t.hasAttribute(n.name)||e.removeAttribute(n.name)}if((r===Node.COMMENT_NODE||r===Node.TEXT_NODE)&&e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue),t instanceof HTMLInputElement&&e instanceof HTMLInputElement&&t.type!=="file")e.value=t.value||"",j(t,e,"value"),j(t,e,"checked"),j(t,e,"disabled");else if(t instanceof HTMLOptionElement)j(t,e,"selected");else if(t instanceof HTMLTextAreaElement&&e instanceof HTMLTextAreaElement){const n=t.value,o=e.value;n!==o&&(e.value=n),e.firstChild&&e.firstChild.nodeValue!==n&&(e.firstChild.nodeValue=n)}}function j(t,e,r){const n=t.getAttribute(r),o=e.getAttribute(r);n!==o&&(n?e.setAttribute(r,n):e.removeAttribute(r))}function _e(t,e,r){const n=[],o=[],s=[],i=[],a=r.head.style,f=new Map;for(const l of t.children)f.set(l.outerHTML,l);for(const l of e.children){let c=f.has(l.outerHTML),g=r.head.shouldReAppend(l),d=r.head.shouldPreserve(l);c||d?g?o.push(l):(f.delete(l.outerHTML),s.push(l)):a==="append"?g&&(o.push(l),i.push(l)):r.head.shouldRemove(l)!==!1&&o.push(l)}i.push(...f.values()),console.log("to append: ",i);const m=[];for(const l of i){console.log("adding: ",l);const c=document.createRange().createContextualFragment(l.outerHTML).firstChild;if(!c)throw new Error("could not create new element from: "+l.outerHTML);if(console.log(c),r.callbacks.beforeNodeAdded(c)){if(c.hasAttribute("href")||c.hasAttribute("src")){let g;const d=new Promise(v=>{g=v});c.addEventListener("load",function(){g(void 0)}),m.push(d)}e.appendChild(c),r.callbacks.afterNodeAdded(c),n.push(c)}}for(const l of o)r.callbacks.beforeNodeRemoved(l)!==!1&&(e.removeChild(l),r.callbacks.afterNodeRemoved(l));return r.head.afterHeadMorphed(e,{added:n,kept:s,removed:o}),m}function T(){}function it(t,e,r){return{target:t,newContent:e,config:r,morphStyle:r.morphStyle,ignoreActive:r.ignoreActive,idMap:mt(t,e),deadIds:new Set,callbacks:Object.assign({beforeNodeAdded:T,afterNodeAdded:T,beforeNodeMorphed:T,afterNodeMorphed:T,beforeNodeRemoved:T,afterNodeRemoved:T},r.callbacks),head:Object.assign({style:"merge",shouldPreserve:n=>n.getAttribute("im-preserve")==="true",shouldReAppend:n=>n.getAttribute("im-re-append")==="true",shouldRemove:T,afterHeadMorphed:T},r.head)}}function ye(t,e,r){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName?t?.id?.length&&t.id===e.id?!0:C(r,t,e)>0:!1}function U(t,e){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName}function be(t,e,r){for(;t!==e;){const n=t;if(t=t?.nextSibling,!n)throw new Error("tempNode is null");we(n,r)}return A(r,e),e.nextSibling}function at(t,e,r,n,o){const s=C(o,r,e);let i=null;if(s>0){i=n;let a=0;for(;i!=null;){if(ye(r,i,o))return i;if(a+=C(o,i,t),a>s)return null;i=i.nextSibling}}return i}function lt(t,e,r,n){let o=r,s=e.nextSibling,i=0;for(;o&&s;){if(C(n,o,t)>0)return null;if(U(e,o))return o;if(U(s,o)&&(i++,s=s.nextSibling,i>=2))return null;o=o.nextSibling}return o}const Ee=new DOMParser;function ct(t){const e=t.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(e.match(/<\/html>/)||e.match(/<\/head>/)||e.match(/<\/body>/)){const r=Ee.parseFromString(t,"text/html");if(e.match(/<\/html>/))return V.add(r),r;{let n=r.firstChild;return n?(V.add(n),n):null}}else{const n=Ee.parseFromString(`<body><template>${t}</template></body>`,"text/html").body.querySelector("template")?.content;if(!n)throw new Error("content is null");return V.add(n),n}}function ut(t){if(t==null)return document.createElement("div");if(V.has(t))return t;if(t instanceof Node){const e=document.createElement("div");return e.append(t),e}else{const e=document.createElement("div");for(const r of[...t])e.append(r);return e}}function ft(t,e,r){const n=[],o=[];for(;t;)n.push(t),t=t.previousSibling;for(;n.length>0;){const s=n.pop();o.push(s),e?.parentElement?.insertBefore(s,e)}for(o.push(e);r;)n.push(r),o.push(r),r=r.nextSibling;for(;n.length;)e?.parentElement?.insertBefore(n.pop(),e.nextSibling);return o}function dt(t,e,r){let n=t.firstChild,o=n,s=0;for(;n;){let i=ht(n,e,r);i>s&&(o=n,s=i),n=n.nextSibling}return o}function ht(t,e,r){return U(t,e)?.5+C(r,t,e):0}function we(t,e){A(e,t),e.callbacks.beforeNodeRemoved(t)!==!1&&(t.remove(),e.callbacks.afterNodeRemoved(t))}function pt(t,e){return!t.deadIds.has(e)}function gt(t,e,r){return t.idMap.get(r)?.has(e)||!1}function A(t,e){const r=t.idMap.get(e);if(r)for(const n of r)t.deadIds.add(n)}function C(t,e,r){const n=t.idMap.get(e);if(!n)return 0;let o=0;for(const s of n)pt(t,s)&&gt(t,s,r)&&++o;return o}function Se(t,e){const r=t.parentElement,n=t.querySelectorAll("[id]");for(const o of n){let s=o;for(;s!==r&&s;){let i=e.get(s);i==null&&(i=new Set,e.set(s,i)),i.add(o.id),s=s.parentElement}}}function mt(t,e){const r=new Map;return Se(t,r),Se(e,r),r}const Te="get",vt=[Te,"post","put","patch","delete"].reduce((t,e)=>(t[e]=async r=>Et(e,r),t),{}),Ae="Accept",Q="Content-Type",Pe="application/json",Me="datastar",ee=`${Me}-indicator`,W=`${Me}-request`,q="text/html",_t="fragmentSelector",yt="fragmentSwap",bt=[{prefix:"header",description:"Sets the header of the fetch request",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>{const e=t.store.fetch.headers,r=t.key[0].toUpperCase()+t.key.slice(1);return e[r]=t.reactivity.computed(()=>t.expressionFn(t)),()=>{delete e[r]}}},{prefix:"fetchUrl",description:"Sets the fetch url",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onGlobalInit:({mergeStore:t})=>{const e=document.createElement("style");e.innerHTML=`
.${ee}{
 opacity:0;
}
.${W} .${ee}{
 opacity:1;
 transition: opacity 300ms ease-in;
}
.${W}.${ee}{
 opacity:1;
 transition: opacity 300s ease-in;
}
`,document.head.appendChild(e);const r=new Headers;r.append(Ae,q),r.append(Q,Pe),t({fetch:{headers:{},elementURLs:{}}})},onLoad:t=>t.reactivity.effect(()=>{const e=t.reactivity.computed(()=>`${t.expressionFn(t)}`);return t.store.fetch.elementURLs[t.el.id]=e,()=>{delete t.store.fetch.elementURLs[t.el.id]}})},{prefix:"sse",description:"Sets the value of the element",mustHaveEmptyKey:!0,onLoad:t=>{if(typeof t.expressionFn(t)!="string")throw new Error("SSE url must be a string");return()=>{}}}];async function Et(t,e){const{el:r,store:n}=e,o=n.fetch.elementURLs[r.id];if(!o)throw new Error(`No signal for ${t}`);r.classList.add(W);const s=new URL(o.value,window.location.origin),i=new Headers;i.append(Ae,q),i.append(Q,Pe);const a=n.fetch.headers.value;if(a)for(const v in a){const E=a[v];i.append(v,E)}const f={...n};delete f.fetch;const m=JSON.stringify(f),l={method:t,headers:i};if(t===Te){const v=new URLSearchParams(s.search);v.append("datastar",m),s.search=v.toString()}else l.body=m;const c=await fetch(s,l),g=await c.text();if(!c.ok){if(!(c.status>=300&&c.status<400))throw new Error("Response was not ok and wasn't a redirect, can't merge.");let E=g;E.startsWith("/")&&(E=window.location.origin+E),console.log(`Redirecting to ${E}`),window.location.replace(E);return}if(!(c.headers.get(Q)===q))throw new Error("Response is not HTML and wasn't a redirect, can't merge.");St(e,g),r.classList.remove(W)}const wt=new DOMParser;function St(t,e,r="morph"){const{el:n}=t,o=[...wt.parseFromString(e,q).body.children];for(let s=0;s<o.length;s++){const i=o[s];if(!(i instanceof Element))throw new Error("Not an element");const a=w(i),f=i.getAttribute("id"),m=s===0,l=!!f?.length,c=m&&!l;let g;if(c)g=[n];else{if(!l)throw new Error("No id");const d=a?.dataset?.[_t]||`#${f}`;g=document.querySelectorAll(d)||[]}if(!g)throw new Error("No target element");for(const d of g){const v=a?.dataset?.[yt];switch(v&&(r=v),r){case"morph":ot(d,i),t.applyPlugins(d);continue;case"inner":d.innerHTML=i.innerHTML;break;case"outer":d.outerHTML=i.outerHTML;break;case"prepend":d.prepend(i);break;case"append":d.append(i);break;case"before":d.before(i);break;case"after":d.after(i);break;case"delete":d.remove();break;default:throw new Error("Invalid merge mode")}t.applyPlugins(i)}}}const te="display",Le="none",re="important",Tt={prefix:"show",description:"Sets the display of the element",allowedModifiers:new Set([re]),onLoad:t=>{const{el:e,modifiers:r,expressionFn:n}=t;return z(()=>{const s=!!n(t),a=r.has(re)?re:void 0;s?e.style.length===1&&e.style.display===Le?e.style.removeProperty(te):e.style.setProperty(te,"",a):e.style.setProperty(te,Le,a)})}},At="intersects",Ne="once",He="half",Re="full",Pt={prefix:At,description:"Run expression when element intersects with viewport",allowedModifiers:new Set([Ne,He,Re]),mustHaveEmptyKey:!0,onLoad:t=>{const{modifiers:e}=t,r={threshold:0};e.has(Re)?r.threshold=1:e.has(He)&&(r.threshold=.5);const n=new IntersectionObserver(o=>{o.forEach(s=>{s.isIntersecting&&(t.expressionFn(t),e.has(Ne)&&n.disconnect())})},r);return n.observe(t.el),()=>n.disconnect()}},ke="prepend",Oe="append",Ce=new Error("Target element must have a parent if using prepend or append"),Mt=[Tt,Pt,{prefix:"teleport",description:"Teleports the element to another element",allowedModifiers:new Set([ke,Oe]),allowedTags:new Set(["template"]),bypassExpressionFunctionCreation:!0,onLoad:t=>{const{el:e,modifiers:r,expression:n}=t;if(!(e instanceof HTMLTemplateElement))throw new Error;const o=document.querySelector(n);if(!o)throw new Error(`Target element not found: ${n}`);if(!e.content)throw new Error("Template element must have content");const s=e.content.cloneNode(!0);if(w(s)?.firstElementChild)throw new Error("Empty template");if(r.has(ke)){if(!o.parentNode)throw Ce;o.parentNode.insertBefore(s,o)}else if(r.has(Oe)){if(!o.parentNode)throw Ce;o.parentNode.insertBefore(s,o.nextSibling)}else o.appendChild(s)}},{prefix:"scrollIntoView",description:"Scrolls the element into view",onLoad:t=>{const{el:e}=t;e.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})}}];function $e(t={},...e){const r=performance.now(),n=new fe(t,...e);n.run();const o=performance.now();return console.log(`Datastar loaded and attached to all DOM elements in ${o-r}ms`),n}function Lt(t={},...e){const r=Object.assign({},vt,t),n=[...bt,...Mt,...tt,...e];return $e(r,...n)}y.Datastar=fe,y.runDatastarWith=$e,y.runDatastarWithAllPlugins=Lt,y.toHTMLorSVGElement=w,Object.defineProperty(y,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=datastar.umd.cjs.map
