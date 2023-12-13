var Datastar=function(O){"use strict";function se(t){return t instanceof HTMLElement||t instanceof SVGElement?t:null}function q(){throw new Error("Cycle detected")}function Ye(){throw new Error("Computed cannot have side-effects")}const Qe=Symbol.for("preact-signals"),S=1,C=2,x=4,I=8,F=16,N=32;function K(){V++}function z(){if(V>1){V--;return}let t,e=!1;for(;U!==void 0;){let n=U;for(U=void 0,oe++;n!==void 0;){const r=n._nextBatchedEffect;if(n._nextBatchedEffect=void 0,n._flags&=~C,!(n._flags&I)&&ye(n))try{n._callback()}catch(s){e||(t=s,e=!0)}n=r}}if(oe=0,V--,e)throw t}function et(t){if(V>0)return t();K();try{return t()}finally{z()}}let p,U,V=0,oe=0,Z=0;function ge(t){if(p===void 0)return;let e=t._node;if(e===void 0||e._target!==p)return e={_version:0,_source:t,_prevSource:p._sources,_nextSource:void 0,_target:p,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},p._sources!==void 0&&(p._sources._nextSource=e),p._sources=e,t._node=e,p._flags&N&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=p._sources,e._nextSource=void 0,p._sources._nextSource=e,p._sources=e),e}function m(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}m.prototype.brand=Qe,m.prototype._refresh=function(){return!0},m.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)},m.prototype._unsubscribe=function(t){if(this._targets!==void 0){const e=t._prevTarget,n=t._nextTarget;e!==void 0&&(e._nextTarget=n,t._prevTarget=void 0),n!==void 0&&(n._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=n)}},m.prototype.subscribe=function(t){const e=this;return ae(function(){const n=e.value,r=this._flags&N;this._flags&=~N;try{t(n)}finally{this._flags|=r}})},m.prototype.valueOf=function(){return this.value},m.prototype.toString=function(){return this.value+""},m.prototype.toJSON=function(){return this.value},m.prototype.peek=function(){return this._value},Object.defineProperty(m.prototype,"value",{get(){const t=ge(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(p instanceof A&&Ye(),t!==this._value){oe>100&&q(),this._value=t,this._version++,Z++,K();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{z()}}}});function ve(t){return new m(t)}function ye(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function _e(t){for(let e=t._sources;e!==void 0;e=e._nextSource){const n=e._source._node;if(n!==void 0&&(e._rollbackNode=n),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function we(t){let e=t._sources,n;for(;e!==void 0;){const r=e._prevSource;e._version===-1?(e._source._unsubscribe(e),r!==void 0&&(r._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=r)):n=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=r}t._sources=n}function A(t){m.call(this,void 0),this._compute=t,this._sources=void 0,this._globalVersion=Z-1,this._flags=x}A.prototype=new m,A.prototype._refresh=function(){if(this._flags&=~C,this._flags&S)return!1;if((this._flags&(x|N))===N||(this._flags&=~x,this._globalVersion===Z))return!0;if(this._globalVersion=Z,this._flags|=S,this._version>0&&!ye(this))return this._flags&=~S,!0;const t=p;try{_e(this),p=this;const e=this._compute();(this._flags&F||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~F,this._version++)}catch(e){this._value=e,this._flags|=F,this._version++}return p=t,we(this),this._flags&=~S,!0},A.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=x|N;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}m.prototype._subscribe.call(this,t)},A.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(m.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~N;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}},A.prototype._notify=function(){if(!(this._flags&C)){this._flags|=x|C;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}},A.prototype.peek=function(){if(this._refresh()||q(),this._flags&F)throw this._value;return this._value},Object.defineProperty(A.prototype,"value",{get(){this._flags&S&&q();const t=ge(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&F)throw this._value;return this._value}});function tt(t){return new A(t)}function Ee(t){const e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){K();const n=p;p=void 0;try{e()}catch(r){throw t._flags&=~S,t._flags|=I,ie(t),r}finally{p=n,z()}}}function ie(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._compute=void 0,t._sources=void 0,Ee(t)}function nt(t){if(p!==this)throw new Error("Out-of-order effect");we(this),p=t,this._flags&=~S,this._flags&I&&ie(this),z()}function B(t){this._compute=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=N}B.prototype._callback=function(){const t=this._start();try{if(this._flags&I||this._compute===void 0)return;const e=this._compute();typeof e=="function"&&(this._cleanup=e)}finally{t()}},B.prototype._start=function(){this._flags&S&&q(),this._flags|=S,this._flags&=~I,Ee(this),_e(this),K();const t=p;return p=this,nt.bind(this,t)},B.prototype._notify=function(){this._flags&C||(this._flags|=C,this._nextBatchedEffect=U,U=this)},B.prototype._dispose=function(){this._flags|=I,this._flags&S||ie(this)};function ae(t){const e=new B(t);try{e._callback()}catch(n){throw e._dispose(),n}return e._dispose.bind(e)}class be{get value(){return ce(this)}set value(e){et(()=>rt(this,e))}peek(){return ce(this,{peek:!0})}}const le=t=>Object.assign(new be,Object.entries(t).reduce((e,[n,r])=>{if(["value","peek"].some(s=>s===n))throw new Error(`${n} is a reserved property name`);return typeof r!="object"||r===null||Array.isArray(r)?e[n]=ve(r):e[n]=le(r),e},{})),rt=(t,e)=>Object.keys(e).forEach(n=>t[n].value=e[n]),ce=(t,{peek:e=!1}={})=>Object.entries(t).reduce((n,[r,s])=>(s instanceof m?n[r]=e?s.peek():s.value:s instanceof be&&(n[r]=ce(s,{peek:e})),n),{}),st=/([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;function Se(t,e=2){return JSON.stringify(t,(r,s)=>typeof s=="bigint"?s.toString()+"n":s,e).replace(/"(-?\d+)n"/g,(r,s)=>s)}function ot(t){const e=t.replace(st,'$1"$2n"$3');return JSON.parse(e,(n,r)=>{switch(typeof r){case"number":return Number.isSafeInteger(r)?r:BigInt(r);case"string":return r.match(/(-?\d+)n/g)?.length?BigInt(r.slice(0,-1)):r;default:return r}})}function Te(t,e){if(typeof e!="object"||Array.isArray(e)||!e)return e;if(typeof e=="object"&&e.toJSON!==void 0&&typeof e.toJSON=="function")return e.toJSON();let n=t;return typeof t!="object"&&(n={...e}),Object.keys(e).forEach(r=>{n.hasOwnProperty(r)||(n[r]=e[r]),e[r]===null?delete n[r]:n[r]=Te(n[r],e[r])}),n}const it="[a-zA-Z_$][0-9a-zA-Z_$.]*";function ue(t,e,n){return new RegExp(`(?<whole>\\${t}(?<${e}>${it})${n})`,"g")}const at={regexp:ue("$","signal",""),replacer:t=>{const{signal:e}=t;return`ctx.store.${e}.value`}},lt={regexp:ue("$\\$","action","(?<call>\\((?<args>.*)\\))?"),replacer:({action:t,args:e})=>{const n=["ctx"];e&&n.push(...e.split(",").map(s=>s.trim()));const r=n.join(",");return`ctx.actions.${t}(${r})`}},ct={regexp:ue("~","ref",""),replacer({ref:t}){return`data.refs.${t}`}},ut=[lt,at,ct],ft=[{prefix:"mergeStore",preprocessors:{pre:[{regexp:/(?<whole>.+)/g,replacer:t=>{const{whole:e}=t;return`ctx.JSONParse('${e.replace(/'/g,"\\'")}')`}}]},onLoad:t=>{const e=t.expressionFn(t);t.mergeStore(e)}},{prefix:"ref",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,bypassExpressionFunctionCreation:()=>!0,onLoad:t=>{const{el:e,expression:n}=t;return t.refs[n]=e,()=>delete t.refs[n]}}];class Ae{plugins=[];store=le({});actions={};refs={};reactivity={signal:ve,computed:tt,effect:ae};parentID="";missingIDNext=0;removals=new Map;constructor(e={},...n){if(this.actions=Object.assign(this.actions,e),n=[...ft,...n],!n.length)throw new Error("no plugins");const r=new Set;for(const s of n){if(s.requiredPluginPrefixes){for(const o of s.requiredPluginPrefixes)if(!r.has(o))throw new Error(`${s.prefix} requires ${o}`)}this.plugins.push(s),r.add(s.prefix)}}run(){this.plugins.forEach(e=>{e.onGlobalInit&&e.onGlobalInit({actions:this.actions,refs:this.refs,reactivity:this.reactivity,mergeStore:this.mergeStore.bind(this),store:this.store})}),this.applyPlugins(document.body)}JSONStringify(e){return Se(e)}JSONParse(e){return ot(e)}cleanupElementRemovals(e){const n=this.removals.get(e);if(n){for(const r of n)r();this.removals.delete(e)}}mergeStore(e){const n=Te(this.store.value,e);this.store=le(n)}signalByName(e){return this.store[e]}applyPlugins(e){const n=new Set;this.plugins.forEach((r,s)=>{this.walkDownDOM(e,o=>{s===0&&this.cleanupElementRemovals(o);for(const i in o.dataset){let a=o.dataset[i]||"";if(!i.startsWith(r.prefix))continue;if(o.id.length===0&&(o.id=`ds-${this.parentID}-${this.missingIDNext++}`),n.clear(),r.allowedTagRegexps){const h=o.tagName.toLowerCase();if(![...r.allowedTagRegexps].some(y=>h.match(y)))throw new Error(`'${o.tagName}' not allowed for '${i}', allowed ${[[...r.allowedTagRegexps].map(y=>`'${y}'`)].join(", ")}`)}let f=i.slice(r.prefix.length),[d,...c]=f.split(".");if(r.mustHaveEmptyKey&&d.length>0)throw new Error(`'${i}' must have empty key`);if(r.mustNotEmptyKey&&d.length===0)throw new Error(`'${i}' must have non-empty key`);d.length&&(d=d[0].toLowerCase()+d.slice(1));const l=c.map(h=>{const[_,...y]=h.split("_");return{label:_,args:y}});if(r.allowedModifiers){for(const h of l)if(!r.allowedModifiers.has(h.label))throw new Error(`'${h.label}' is not allowed`)}const g=new Map;for(const h of l)g.set(h.label,h.args);if(r.mustHaveEmptyExpression&&a.length)throw new Error(`'${i}' must have empty expression`);if(r.mustNotEmptyExpression&&!a.length)throw new Error(`'${i}' must have non-empty expression`);const E=[...r.preprocessors?.pre||[],...ut,...r.preprocessors?.post||[]];for(const h of E){if(n.has(h))continue;n.add(h);const _=[...a.matchAll(h.regexp)];if(_.length)for(const y of _){if(!y.groups)continue;const{groups:R}=y,{whole:$}=R;a=a.replace($,h.replacer(R))}}const{store:b,reactivity:L,actions:v,refs:H}=this,u={store:b,mergeStore:this.mergeStore.bind(this),applyPlugins:this.applyPlugins.bind(this),cleanupElementRemovals:this.cleanupElementRemovals.bind(this),walkSignals:this.walkSignals.bind(this),actions:v,refs:H,reactivity:L,el:o,key:d,expression:a,expressionFn:()=>{throw new Error("Expression function not created")},JSONParse:this.JSONParse,JSONStringify:this.JSONStringify,modifiers:g};if(!r.bypassExpressionFunctionCreation?.(u)&&!r.mustHaveEmptyExpression&&a.length){const h=a.split(";");h[h.length-1]=`return ${h[h.length-1]}`;const _=`
try {
  ${h.join(";")}
} catch (e) {
  throw new Error(\`Eval '${a}' on ${o.id?`#${o.id}`:o.tagName}\`)
}
            `;try{const y=new Function("ctx",_);u.expressionFn=y}catch(y){console.error(y);return}}const w=r.onLoad(u);w&&(this.removals.has(o)||this.removals.set(o,new Set),this.removals.get(o).add(w))}})})}walkSignalsStore(e,n){const r=Object.keys(e);for(let s=0;s<r.length;s++){const o=r[s],i=e[o],a=i instanceof m,f=typeof i=="object"&&Object.keys(i).length>0;if(a){n(o,i);continue}f&&this.walkSignalsStore(i,n)}}walkSignals(e){this.walkSignalsStore(this.store,e)}walkDownDOM(e,n,r=0){if(!e)return;const s=se(e);if(s)for(n(s),r=0,e=e.firstElementChild;e;)this.walkDownDOM(e,n,r++),e=e.nextElementSibling}}const dt=t=>t.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(e,n)=>(n?"-":"")+e.toLowerCase()),ht={prefix:"bind",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>t.reactivity.effect(()=>{const e=dt(t.key),r=`${t.expressionFn(t)}`;!r||r==="false"||r==="null"||r==="undefined"?t.el.removeAttribute(e):t.el.setAttribute(e,r)})},pt=/^data:(?<mime>[^;]+);base64,(?<contents>.*)$/,X=["change","input","keydown"],mt=[ht,{prefix:"model",mustHaveEmptyKey:!0,preprocessors:{post:[{regexp:/(?<whole>.+)/g,replacer:t=>{const{whole:e}=t;return`ctx.store.${e}`}}]},allowedTagRegexps:new Set(["input","textarea","select","checkbox","radio"]),onLoad:t=>{const{store:e,el:n,expression:r}=t,s=t.expressionFn(t),o=n.tagName.toLowerCase(),i=o.includes("input"),a=o.includes("select"),f=o.includes("textarea"),d=o.includes("radio"),c=n.getAttribute("type"),l=o.includes("checkbox")||i&&c==="checkbox",g=i&&c==="file";if(!i&&!a&&!f&&!l&&!d)throw new Error("Element must be input, select, textarea, checkbox or radio");const E=()=>{if(!s)throw new Error(`Signal ${r} not found`);const u=s.value;l?n.checked=u:i?g||(n.value=`${u}`):"value"in n?n.value=`${u}`:n.setAttribute("value",`${u}`)},b=t.reactivity.effect(E),L=()=>{if(g){const[u]=n?.files||[];if(!u){s.value="";return}const w=new FileReader;w.onload=()=>{if(typeof w.result!="string")throw new Error("Unsupported type");const _=w.result.match(pt);if(!_?.groups)throw new Error("Invalid data URI");const{mime:y,contents:R}=_.groups;s.value=R;const $=`${r}Mime`;if($ in e){const W=e[`${$}`];W.value=y}},w.readAsDataURL(u);const h=`${r}Name`;if(h in e){const _=e[`${h}`];_.value=u.name}return}else{const u=s.value;if(typeof u=="number")s.value=Number(u);else if(typeof u=="string")s.value=u;else if(typeof u=="boolean")if(l){const{checked:w}=n;s.value=w}else s.value=!!u;else if(!(typeof u>"u"))if(typeof u=="bigint")s.value=BigInt(u);else throw console.log(typeof u),new Error("Unsupported type")}},v=n.tagName.split("-");if(v.length>1){const u=v[0].toLowerCase();X.forEach(w=>{X.push(`${u}-${w}`)})}return X.forEach(u=>n.addEventListener(u,L)),()=>{b(),X.forEach(u=>n.removeEventListener(u,L))}}},{prefix:"text",mustHaveEmptyKey:!0,onLoad:t=>{const{el:e,expressionFn:n}=t;if(!(e instanceof HTMLElement))throw new Error("Element is not HTMLElement");return t.reactivity.effect(()=>{const r=n(t);e.textContent=`${r}`})}},{prefix:"focus",mustHaveEmptyKey:!0,mustHaveEmptyExpression:!0,onLoad:t=>(t.el.tabIndex||t.el.setAttribute("tabindex","0"),t.el.focus(),t.el.scrollIntoView({block:"center",inline:"center"}),()=>t.el.blur())},{prefix:"on",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,allowedModifiers:new Set(["once","passive","capture","debounce","throttle"]),onLoad:t=>{const{el:e,key:n,expressionFn:r}=t;let s=()=>{r(t)};const o=t.modifiers.get("debounce");if(o){const d=Le(o),c=Y(o,"leading",!1),l=Y(o,"noTrail",!0);s=gt(s,d,c,l)}const i=t.modifiers.get("throttle");if(i){const d=Le(i),c=Y(i,"noLead",!0),l=Y(i,"noTrail",!0);s=vt(s,d,c,l)}const a={capture:!0,passive:!1,once:!1};if(t.modifiers.has("capture")||(a.capture=!1),t.modifiers.has("passive")&&(a.passive=!0),t.modifiers.has("once")&&(a.once=!0),n==="load")return s(),()=>{};const f=n.toLowerCase();return e.addEventListener(f,s,a),()=>{e.removeEventListener(f,s)}}}];function Le(t){if(!t||t?.length===0)return 0;for(const e of t){if(e.endsWith("ms"))return Number(e.replace("ms",""));if(e.endsWith("s"))return Number(e.replace("s",""))*1e3;try{return parseFloat(e)}catch{}}return 0}function Y(t,e,n=!1){return t?t.includes(e)||n:!1}function gt(t,e,n=!1,r=!0){let s;const o=()=>s&&clearTimeout(s);return function(...a){o(),n&&!s&&t(...a),s=setTimeout(()=>{r&&t(...a),o()},e)}}function vt(t,e,n=!0,r=!1){let s=!1,o=null;return function(...a){s?o=a:(s=!0,n?t(...a):o=a,setTimeout(()=>{r&&o&&(t(...o),o=null),s=!1},e))}}const Q=new WeakSet;function yt(t,e,n={}){t instanceof Document&&(t=t.documentElement);let r;typeof e=="string"?r=St(e):r=e;const s=Tt(r),o=wt(t,s,n);return Ne(t,s,o)}function Ne(t,e,n){if(n.head.block){const r=t.querySelector("head"),s=e.querySelector("head");if(r&&s){const o=ke(s,r,n);Promise.all(o).then(()=>{Ne(t,e,Object.assign(n,{head:{block:!1,ignore:!0}}))});return}}if(n.morphStyle==="innerHTML")return Pe(e,t,n),t.children;if(n.morphStyle==="outerHTML"||n.morphStyle==null){const r=Lt(e,t,n);if(!r)throw new Error("Could not find best match");const s=r?.previousSibling,o=r?.nextSibling,i=ee(t,r,n);return r?At(s,i,o):[]}else throw"Do not understand how to morph style "+n.morphStyle}function ee(t,e,n){if(!(n.ignoreActive&&t===document.activeElement))if(e==null){if(n.callbacks.beforeNodeRemoved(t)===!1)return;t.remove(),n.callbacks.afterNodeRemoved(t);return}else{if(ne(t,e))return n.callbacks.beforeNodeMorphed(t,e)===!1?void 0:(t instanceof HTMLHeadElement&&n.head.ignore||(e instanceof HTMLHeadElement&&t instanceof HTMLHeadElement&&n.head.style!=="morph"?ke(e,t,n):(_t(e,t),Pe(e,t,n))),n.callbacks.afterNodeMorphed(t,e),t);if(n.callbacks.beforeNodeRemoved(t)===!1||n.callbacks.beforeNodeAdded(e)===!1)return;if(!t.parentElement)throw new Error("oldNode has no parentElement");return t.parentElement.replaceChild(e,t),n.callbacks.afterNodeAdded(e),n.callbacks.afterNodeRemoved(t),e}}function Pe(t,e,n){let r=t.firstChild,s=e.firstChild,o;for(;r;){if(o=r,r=o.nextSibling,s==null){if(n.callbacks.beforeNodeAdded(o)===!1)return;e.appendChild(o),n.callbacks.afterNodeAdded(o),M(n,o);continue}if(Me(o,s,n)){ee(s,o,n),s=s.nextSibling,M(n,o);continue}let i=Et(t,e,o,s,n);if(i){s=Re(s,i,n),ee(i,o,n),M(n,o);continue}let a=bt(t,o,s,n);if(a){s=Re(s,a,n),ee(a,o,n),M(n,o);continue}if(n.callbacks.beforeNodeAdded(o)===!1)return;e.insertBefore(o,s),n.callbacks.afterNodeAdded(o),M(n,o)}for(;s!==null;){let i=s;s=s.nextSibling,Oe(i,n)}}function _t(t,e){let n=t.nodeType;if(n===1){for(const r of t.attributes)e.getAttribute(r.name)!==r.value&&e.setAttribute(r.name,r.value);for(const r of e.attributes)t.hasAttribute(r.name)||e.removeAttribute(r.name)}if((n===Node.COMMENT_NODE||n===Node.TEXT_NODE)&&e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue),t instanceof HTMLInputElement&&e instanceof HTMLInputElement&&t.type!=="file")e.value=t.value||"",te(t,e,"value"),te(t,e,"checked"),te(t,e,"disabled");else if(t instanceof HTMLOptionElement)te(t,e,"selected");else if(t instanceof HTMLTextAreaElement&&e instanceof HTMLTextAreaElement){const r=t.value,s=e.value;r!==s&&(e.value=r),e.firstChild&&e.firstChild.nodeValue!==r&&(e.firstChild.nodeValue=r)}}function te(t,e,n){const r=t.getAttribute(n),s=e.getAttribute(n);r!==s&&(r?e.setAttribute(n,r):e.removeAttribute(n))}function ke(t,e,n){const r=[],s=[],o=[],i=[],a=n.head.style,f=new Map;for(const c of t.children)f.set(c.outerHTML,c);for(const c of e.children){let l=f.has(c.outerHTML),g=n.head.shouldReAppend(c),E=n.head.shouldPreserve(c);l||E?g?s.push(c):(f.delete(c.outerHTML),o.push(c)):a==="append"?g&&(s.push(c),i.push(c)):n.head.shouldRemove(c)!==!1&&s.push(c)}i.push(...f.values()),console.log("to append: ",i);const d=[];for(const c of i){console.log("adding: ",c);const l=document.createRange().createContextualFragment(c.outerHTML).firstChild;if(!l)throw new Error("could not create new element from: "+c.outerHTML);if(console.log(l),n.callbacks.beforeNodeAdded(l)){if(l.hasAttribute("href")||l.hasAttribute("src")){let g;const E=new Promise(b=>{g=b});l.addEventListener("load",function(){g(void 0)}),d.push(E)}e.appendChild(l),n.callbacks.afterNodeAdded(l),r.push(l)}}for(const c of s)n.callbacks.beforeNodeRemoved(c)!==!1&&(e.removeChild(c),n.callbacks.afterNodeRemoved(c));return n.head.afterHeadMorphed(e,{added:r,kept:o,removed:s}),d}function P(){}function wt(t,e,n){return{target:t,newContent:e,config:n,morphStyle:n.morphStyle,ignoreActive:n.ignoreActive,idMap:Mt(t,e),deadIds:new Set,callbacks:Object.assign({beforeNodeAdded:P,afterNodeAdded:P,beforeNodeMorphed:P,afterNodeMorphed:P,beforeNodeRemoved:P,afterNodeRemoved:P},n.callbacks),head:Object.assign({style:"merge",shouldPreserve:r=>r.getAttribute("im-preserve")==="true",shouldReAppend:r=>r.getAttribute("im-re-append")==="true",shouldRemove:P,afterHeadMorphed:P},n.head)}}function Me(t,e,n){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName?t?.id?.length&&t.id===e.id?!0:j(n,t,e)>0:!1}function ne(t,e){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName}function Re(t,e,n){for(;t!==e;){const r=t;if(t=t?.nextSibling,!r)throw new Error("tempNode is null");Oe(r,n)}return M(n,e),e.nextSibling}function Et(t,e,n,r,s){const o=j(s,n,e);let i=null;if(o>0){i=r;let a=0;for(;i!=null;){if(Me(n,i,s))return i;if(a+=j(s,i,t),a>o)return null;i=i.nextSibling}}return i}function bt(t,e,n,r){let s=n,o=e.nextSibling,i=0;for(;s&&o;){if(j(r,s,t)>0)return null;if(ne(e,s))return s;if(ne(o,s)&&(i++,o=o.nextSibling,i>=2))return null;s=s.nextSibling}return s}const $e=new DOMParser;function St(t){const e=t.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(e.match(/<\/html>/)||e.match(/<\/head>/)||e.match(/<\/body>/)){const n=$e.parseFromString(t,"text/html");if(e.match(/<\/html>/))return Q.add(n),n;{let r=n.firstChild;return r?(Q.add(r),r):null}}else{const r=$e.parseFromString(`<body><template>${t}</template></body>`,"text/html").body.querySelector("template")?.content;if(!r)throw new Error("content is null");return Q.add(r),r}}function Tt(t){if(t==null)return document.createElement("div");if(Q.has(t))return t;if(t instanceof Node){const e=document.createElement("div");return e.append(t),e}else{const e=document.createElement("div");for(const n of[...t])e.append(n);return e}}function At(t,e,n){const r=[],s=[];for(;t;)r.push(t),t=t.previousSibling;for(;r.length>0;){const o=r.pop();s.push(o),e?.parentElement?.insertBefore(o,e)}for(s.push(e);n;)r.push(n),s.push(n),n=n.nextSibling;for(;r.length;)e?.parentElement?.insertBefore(r.pop(),e.nextSibling);return s}function Lt(t,e,n){let r=t.firstChild,s=r,o=0;for(;r;){let i=Nt(r,e,n);i>o&&(s=r,o=i),r=r.nextSibling}return s}function Nt(t,e,n){return ne(t,e)?.5+j(n,t,e):0}function Oe(t,e){M(e,t),e.callbacks.beforeNodeRemoved(t)!==!1&&(t.remove(),e.callbacks.afterNodeRemoved(t))}function Pt(t,e){return!t.deadIds.has(e)}function kt(t,e,n){return t.idMap.get(n)?.has(e)||!1}function M(t,e){const n=t.idMap.get(e);if(n)for(const r of n)t.deadIds.add(r)}function j(t,e,n){const r=t.idMap.get(e);if(!r)return 0;let s=0;for(const o of r)Pt(t,o)&&kt(t,o,n)&&++s;return s}function Ce(t,e){const n=t.parentElement,r=t.querySelectorAll("[id]");for(const s of r){let o=s;for(;o!==n&&o;){let i=e.get(o);i==null&&(i=new Set,e.set(o,i)),i.add(s.id),o=o.parentElement}}}function Mt(t,e){const n=new Map;return Ce(t,n),Ce(e,n),n}const Rt=["get","post","put","patch","delete"].reduce((t,e)=>(t[e]=async n=>{const r=Document;if(!r.startViewTransition){await He(e,n);return}return new Promise(s=>{r.startViewTransition(async()=>{await He(e,n),s()})})},t),{}),$t="Accept",Ot="Content-Type",Ct="datastar-request",It="application/json",Ht="text/event-stream",Dt="true",J="datastar-",G=`${J}indicator`,fe=`${G}-loading`,Ie=`${J}settling`,re=`${J}swapping`,xt="self",T={MorphElement:"morph_element",InnerElement:"inner_element",OuterElement:"outer_element",PrependElement:"prepend_element",AppendElement:"append_element",BeforeElement:"before_element",AfterElement:"after_element",DeleteElement:"delete_element",UpsertAttributes:"upsert_attributes"},Ft=[{prefix:"header",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>{const e=t.store.fetch.headers,n=t.key[0].toUpperCase()+t.key.slice(1);return e[n]=t.reactivity.computed(()=>t.expressionFn(t)),()=>{delete e[n]}}},{prefix:"fetchUrl",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onGlobalInit:({mergeStore:t})=>{t({fetch:{headers:{},elementURLs:{},indicatorSelectors:{}}})},onLoad:t=>t.reactivity.effect(()=>{const e=t.reactivity.computed(()=>`${t.expressionFn(t)}`);return t.store.fetch.elementURLs[t.el.id]=e,()=>{delete t.store.fetch.elementURLs[t.el.id]}})},{prefix:"fetchIndicator",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onGlobalInit:()=>{const t=document.createElement("style");t.innerHTML=`
.${G}{
 opacity:0;
 transition: opacity 300ms ease-out;
}
.${fe} {
 opacity:1;
 transition: opacity 300ms ease-in;
}
`,document.head.appendChild(t)},onLoad:t=>t.reactivity.effect(()=>{const e=t.reactivity.computed(()=>`${t.expressionFn(t)}`);t.store.fetch.indicatorSelectors[t.el.id]=e;const n=document.querySelector(e.value);if(!n)throw new Error(`No indicator found for ${e.value}`);return n.classList.add(G),()=>{delete t.store.fetch.indicatorSelectors[t.el.id]}})}],Ut=/(?<key>\w*): (?<value>.*)/gm;async function He(t,e){const{el:n,store:r}=e,s=r.fetch.elementURLs[n.id];if(!s)return;const o={...r};delete o.fetch;const i=Se(o);let a=n,f=!1;const d=r.fetch.indicatorSelectors[n.id];if(d){const v=document.querySelector(d);v&&(a=v,a.classList.remove(G),a.classList.add(fe),f=!0)}const c=new URL(s.value,window.location.origin),l=new Headers;l.append($t,Ht),l.append(Ot,It),l.append(Ct,Dt);const g=r.fetch.headers.value;if(g)for(const v in g){const H=g[v];l.append(v,H)}t=t.toUpperCase();const E={method:t,headers:l};if(t==="GET"){const v=new URLSearchParams(c.search);v.append("datastar",i),c.search=v.toString()}else E.body=i;const b=await fetch(c,E);if(!b.ok)throw new Error(`Response was not ok, url: ${c}, status: ${b.status}`);if(!b.body)throw new Error("No response body");const L=b.body.pipeThrough(new TextDecoderStream).getReader();for(;;){const{done:v,value:H}=await L.read();if(v)break;H.split(`

`).forEach(u=>{const w=[...u.matchAll(Ut)];if(w.length){let h="",_="morph_element",y="",R=0,$=!1,W="",pe,qe=!1,Ke=!1;for(const ze of w){if(!ze.groups)continue;const{key:Zt,value:k}=ze.groups;switch(Zt){case"event":if(!k.startsWith(J))throw new Error(`Unknown event: ${k}`);switch(k.slice(J.length)){case"redirect":$=!0;break;case"fragment":Ke=!0;break;case"error":qe=!0;break;default:throw new Error(`Unknown event: ${k}`)}break;case"data":const me=k.indexOf(" ");if(me===-1)throw new Error("Missing space in data");const Ze=k.slice(0,me),D=k.slice(me+1);switch(Ze){case"selector":y=D;break;case"merge":const Xe=D;if(!Object.values(T).includes(Xe))throw new Error(`Unknown merge option: ${k}`);_=Xe;break;case"settle":R=parseInt(D);break;case"fragment":case"html":h=D;break;case"redirect":W=D;break;case"error":pe=new Error(D);break;default:throw new Error(`Unknown data type: ${Ze}`)}}}if(qe&&pe)throw pe;if($&&W)window.location.href=W;else if(Ke&&h)Vt(e,y,_,h,R);else throw new Error(`Unknown event block: ${u}`)}})}f&&(a.classList.remove(fe),a.classList.add(G))}const De=document.createElement("template");function Vt(t,e,n,r,s){const{el:o}=t;De.innerHTML=r;const i=De.content.firstChild;if(!(i instanceof Element))throw new Error(`Fragment is not an element, source '${r}'`);const a=e===xt;let f;if(a)f=[o];else{const d=e||`#${i.getAttribute("id")}`;if(f=document.querySelectorAll(d)||[],!f)throw new Error(`No target elements, selector: ${e}`)}for(const d of f){d.classList.add(re);const c=d.outerHTML;let l=d;switch(n){case T.MorphElement:const E=yt(l,i);if(!E?.length)throw new Error("Failed to morph element");l=E[0];break;case T.InnerElement:l.innerHTML=i.innerHTML;break;case T.OuterElement:l.replaceWith(i);break;case T.PrependElement:l.prepend(i);break;case T.AppendElement:l.append(i);break;case T.BeforeElement:l.before(i);break;case T.AfterElement:l.after(i);break;case T.DeleteElement:setTimeout(()=>l.remove(),s);break;case T.UpsertAttributes:i.getAttributeNames().forEach(L=>{const v=i.getAttribute(L);l.setAttribute(L,v)});break;default:throw new Error(`Unknown merge type: ${n}`)}l.classList.add(re),t.cleanupElementRemovals(d),t.applyPlugins(l),d.classList.remove(re),l.classList.remove(re);const g=l.outerHTML;c!==g&&(l.classList.add(Ie),setTimeout(()=>{l.classList.remove(Ie)},s))}}const Bt={setAll:async(t,e,n)=>{const r=new RegExp(e);t.walkSignals((s,o)=>r.test(s)&&(o.value=n))},toggleAll:async(t,e)=>{const n=new RegExp(e);t.walkSignals((r,s)=>n.test(r)&&(s.value=!s.value))}},de="display",xe="none",he="important",jt={prefix:"show",allowedModifiers:new Set([he]),onLoad:t=>{const{el:e,modifiers:n,expressionFn:r}=t;return ae(()=>{const o=!!r(t),a=n.has(he)?he:void 0;o?e.style.length===1&&e.style.display===xe?e.style.removeProperty(de):e.style.setProperty(de,"",a):e.style.setProperty(de,xe,a)})}},Jt="intersects",Fe="once",Ue="half",Ve="full",Gt={prefix:Jt,allowedModifiers:new Set([Fe,Ue,Ve]),mustHaveEmptyKey:!0,onLoad:t=>{const{modifiers:e}=t,n={threshold:0};e.has(Ve)?n.threshold=1:e.has(Ue)&&(n.threshold=.5);const r=new IntersectionObserver(s=>{s.forEach(o=>{o.isIntersecting&&(t.expressionFn(t),e.has(Fe)&&r.disconnect())})},n);return r.observe(t.el),()=>r.disconnect()}},Be="prepend",je="append",Je=new Error("Target element must have a parent if using prepend or append"),Wt={prefix:"teleport",allowedModifiers:new Set([Be,je]),allowedTagRegexps:new Set(["template"]),bypassExpressionFunctionCreation:()=>!0,onLoad:t=>{const{el:e,modifiers:n,expression:r}=t;if(!(e instanceof HTMLTemplateElement))throw new Error;const s=document.querySelector(r);if(!s)throw new Error(`Target element not found: ${r}`);if(!e.content)throw new Error("Template element must have content");const o=e.content.cloneNode(!0);if(se(o)?.firstElementChild)throw new Error("Empty template");if(n.has(Be)){if(!s.parentNode)throw Je;s.parentNode.insertBefore(o,s)}else if(n.has(je)){if(!s.parentNode)throw Je;s.parentNode.insertBefore(o,s.nextSibling)}else s.appendChild(o)}},qt={prefix:"scrollIntoView",onLoad:t=>{const{el:e}=t;e.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})}},Ge="ds-view-transition-stylesheet",Kt=[jt,Gt,Wt,qt,{prefix:"viewTransition",onGlobalInit(t){const e=document.createElement("style");e.id=Ge,document.head.appendChild(e);let n=!1;if(document.head.childNodes.forEach(r=>{r instanceof HTMLMetaElement&&r.name==="view-transition"&&(n=!0)}),!n){const r=document.createElement("meta");r.name="view-transition",r.content="same-origin",document.head.appendChild(r)}t.mergeStore({viewTransitionRefCounts:{}})},onLoad:t=>{const{el:e,expressionFn:n,store:r}=t;let s=n(t);if(!s){if(!e.id)throw new Error("Element must have an id if no name is provided");s=e.id}const o=document.getElementById(Ge);if(!o)throw new Error("View transition stylesheet not found");const i=`ds-vt-${s}`,a=`
.${i} {
  view-transition: ${s};
}

`;o.innerHTML+=a;let f=r.viewTransitionRefCounts[s];return f||(f=t.reactivity.signal(0),r.viewTransitionRefCounts[s]=f),f.value++,e.classList.add(i),()=>{f.value--,f.value===0&&(delete r.viewTransitionRefCounts[s],o.innerHTML=o.innerHTML.replace(a,""))}}}];function We(t={},...e){const n=performance.now(),r=new Ae(t,...e);r.run();const s=performance.now();return console.log(`Datastar loaded and attached to all DOM elements in ${s-n}ms`),r}function zt(t={},...e){const n=Object.assign({},Bt,Rt,t),r=[...Ft,...Kt,...mt,...e];return We(n,...r)}return O.Datastar=Ae,O.runDatastarWith=We,O.runDatastarWithAllPlugins=zt,O.toHTMLorSVGElement=se,Object.defineProperty(O,Symbol.toStringTag,{value:"Module"}),O}({});
//# sourceMappingURL=datastar.iife.js.map
