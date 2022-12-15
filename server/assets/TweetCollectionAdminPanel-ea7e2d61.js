import{o as g,j as i,N as b,t as m,M as O,$ as D,a0 as R,S as V,U,a1 as P,a2 as y,V as L,a3 as B,v as k,a4 as E,a5 as W,a6 as G}from"./mui_material-ae7af96c.js";import{r as h,c as f}from"./react-75fa6e8e.js";import{T as $,S as q,a as M,A as z,t as N,n as K,P as A,C as J,s as Q}from"./index-7d47f7ef.js";import"./react_router-41a0819f.js";import"./moment-a2dc6acb.js";import"./mui_extras-fda19811.js";import"./chart_js-4074cdf3.js";import"./chart_js_extras-05c44e89.js";import"./word_cloud-f907dc19.js";const X=({offset:n,setOffset:r,toggleReload:t})=>{const[e,s]=h.exports.useState(n),a=h.exports.useRef(null),l=h.exports.useRef(null);return g("div",{className:"flex justify-between",children:[i($,{ref:a,isAdmin:!0}),i(q,{ref:l,isAdmin:!0}),i(b,{label:"Offset",value:e,type:"number",onChange:({target:{value:d}})=>s(parseInt(d)),onKeyDown:({key:d})=>{d==="Enter"&&r(e)}}),i(m,{onClick:t,children:"Refuel"})]})};var _=(n=>(n[n.NewPhrase=0]="NewPhrase",n[n.ChangeStart=1]="ChangeStart",n[n.ChangeEnd=2]="ChangeEnd",n[n.ChangeAspect=3]="ChangeAspect",n[n.DeletePhrase=4]="DeletePhrase",n[n.Verify=5]="Verify",n[n.ChangeSentenceAnnotaion=6]="ChangeSentenceAnnotaion",n))(_||{});const C={start:0,startHelperText:"Start Offset (inclusive)",end:0,endHelperText:"End Offset (exclusive)",hasErrorOccurred:!1,aspect:0},w=(n,r,t)=>{const e=r>=t;let{startHelperText:s,endHelperText:a}=C;return e&&(s=a="start must be less than end"),{...n,start:r,end:t,hasErrorOccurred:e,startHelperText:s,endHelperText:a}},Y=(n,r)=>{switch(r.type){case 0:return{...n,aspects_anno:[...n.aspects_anno,C]};case 1:{const{index:t,start:e}=r.payload,s=[...n.aspects_anno],a=s[t],l=w(a,e,a.end);return s[t]=l,{...n,aspects_anno:s}}case 2:{const{index:t,end:e}=r.payload,s=[...n.aspects_anno],a=s[t],l=w(a,a.start,e);return s[t]=l,{...n,aspects_anno:s}}case 3:{const{index:t,aspect:e}=r.payload,s=[...n.aspects_anno],a=s[t];return s[t]={...a,aspect:e},{...n,aspects_anno:s}}case 4:{const{index:t}=r.payload,e=[...n.aspects_anno];return e.splice(t,1),{...n,aspects_anno:e}}case 5:return{...n,isVerified:!0};case 6:return{...n,[r.payload.column]:r.payload.value};default:return n}},Z=({tweetId:n,getChangedColumns:r,disabled:t})=>{const[e,s]=h.exports.useState({display:!1,message:"",intent:"success"}),a=()=>s(d=>({...d,display:!1})),l=async()=>{try{return await M.tweetsUpdateTweet(n,r()),s({display:!0,message:"Successfully Modified",intent:"success"})}catch{return s({display:!1,message:"Modification Failed",intent:"error"})}};return g(O,{children:[i(D,{open:e.display,autoHideDuration:3e3,onClose:a,children:i(R,{onClose:a,severity:e.intent,sx:{width:"100%"},children:e.message})}),i(m,{variant:"contained",onClick:l,disabled:t,children:"Modify"})]})},ee=({index:n,end:r,start:t,hasErrorOccurred:e,dispatch:s,startHelperText:a,textLength:l,endHelperText:d,aspect:u,isDisabled:p})=>g("div",{className:"flex items-start justify-between",children:[i(b,{inputProps:{min:0,max:r-1<0?0:r-1},type:"number",value:t,error:e,onChange:({target:{value:o}})=>s({type:_.ChangeStart,payload:{index:n,start:parseInt(o)||0}}),helperText:a}),i(b,{inputProps:{min:t+1,max:l},type:"number",value:r,error:e,onChange:({target:{value:o}})=>s({type:_.ChangeEnd,payload:{index:n,end:parseInt(o)||0}}),helperText:d}),i(V,{value:u,label:"Aspect",onChange:({target:{value:o}})=>s({type:_.ChangeAspect,payload:{index:n,aspect:o}}),children:z.map(N).map((o,c)=>i(U,{value:c,children:o},c))}),i(m,{variant:"contained",color:"warning",onClick:()=>s({type:_.DeletePhrase,payload:{index:n}}),disabled:p,sx:{marginTop:"0.5rem"},children:"Delete Annotation"})]}),te=n=>{const{aspects_anno:r,...t}=n,{dispatch:e,isDisabled:s}=t;return g("div",{className:"items-start mt-0.5",children:[i("div",{className:"flex flex-col",children:r.map((a,l)=>h.exports.createElement(ee,{...t,...a,index:l,key:l}))}),i(m,{variant:"contained",color:"secondary",onClick:()=>e({type:_.NewPhrase}),disabled:s,children:"Add New Phrase Annotation"})]})};var H={},S={},ne=f&&f.__extends||function(){var n=function(r,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,s){e.__proto__=s}||function(e,s){for(var a in s)s.hasOwnProperty(a)&&(e[a]=s[a])},n(r,t)};return function(r,t){n(r,t);function e(){this.constructor=r}r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}}(),se=f&&f.__createBinding||(Object.create?function(n,r,t,e){e===void 0&&(e=t),Object.defineProperty(n,e,{enumerable:!0,get:function(){return r[t]}})}:function(n,r,t,e){e===void 0&&(e=t),n[e]=r[t]}),re=f&&f.__setModuleDefault||(Object.create?function(n,r){Object.defineProperty(n,"default",{enumerable:!0,value:r})}:function(n,r){n.default=r}),ae=f&&f.__importStar||function(n){if(n&&n.__esModule)return n;var r={};if(n!=null)for(var t in n)t!=="default"&&Object.hasOwnProperty.call(n,t)&&se(r,n,t);return re(r,n),r};Object.defineProperty(S,"__esModule",{value:!0});S.InteractiveHighlighter=void 0;var x=ae(h.exports);function oe(n,r){if(n===r)return!0;if(n==null||r==null||n.length!==r.length)return!1;for(var t=0;t<n.length;++t)if(n[t]!==r[t])return!1;return!0}var ie=function(n){ne(r,n);function r(t){var e=n.call(this,t)||this;return e.props.getSelectionFn?e._getSelectionMarker=e.props.getSelectionFn:e._getSelectionMarker=e._getSelectionFromDOM,e.onMouseUpHandler=e.onMouseUpHandler.bind(e),e.props.customClassFn?e._customClassFn=e.props.customClassFn:e._customClassFn=function(s){return s.length>0?e.props.customClass||"default":""},e._segments=[],e}return r.prototype._getSelectionFromDOM=function(){var t=window.getSelection();if(!t)return console.error("getSelection() returned null"),null;var e=t.toString(),s=t.anchorNode,a=t.focusNode,l=t.anchorOffset,d=t.focusOffset,u,p=!1;if(s&&a)u=s.compareDocumentPosition(a);else return console.warn("Returning from onMouseUpHandler because anchorNode or focusNode are null"),null;u===s.DOCUMENT_POSITION_FOLLOWING?p=!0:u===0&&(p=d-l>0);var o=p?l:d,c;if(p)if(s.parentNode)c=s.parentNode;else return console.error("Ended up with null anchorNode.parentNode - should be impossible!"),null;else if(a.parentNode)c=a.parentNode;else return console.error("Ended up with null focusNode.parentNode - should be impossible!"),null;if(c.getAttribute("data-segment")){var v=Number(c.getAttribute("data-segment"));o+=this._segments[v].start}return t.removeAllRanges(),{selectionStart:o,selectionLength:e.length}},r.prototype._computeSegments=function(){for(var t=this.props.highlights,e=[],s=0,a=[],l=function(u){var p=t.map(function(o){return u>=Number(o.startIndex)&&u<Number(o.startIndex)+Number(o.numChars)});oe(a,p)||(u>0&&(e.push({start:s,end:u-1,highlights:a.map(function(o,c){return o?c:-1}).filter(function(o){return o!==-1})}),s=u),a=p.slice())},d=0;d<this.props.text.length;d++)l(d);return e.length===0?e.push({start:0,end:this.props.text.length,highlights:[]}):e.push({start:s,end:this.props.text.length,highlights:a.map(function(u,p){return u?p:-1}).filter(function(u){return u!==-1})}),e},r.prototype.onMouseUpHandler=function(t){t.preventDefault();var e=this._getSelectionMarker();if(e&&e.selectionLength){var s=this.props.text.substr(e.selectionStart,e.selectionLength);this.props.selectionHandler&&this.props.selectionHandler(s,e.selectionStart,e.selectionLength)}},r.prototype.render=function(){this._segments=this._computeSegments();for(var t=this.props.text,e=[],s=0;s<this._segments.length;s++){var a=this._segments[s].start,l=this._segments[s].end-this._segments[s].start+1;this._segments[s].highlights.length>0?e.push(x.default.createElement("span",{key:"d"+s,"data-segment":s,className:this._customClassFn(this._segments[s].highlights)},t.substr(a,l))):e.push(x.default.createElement("span",{key:"d"+s,"data-segment":s,className:this._customClassFn(this._segments[s].highlights)},t.substr(a,l)))}return x.default.createElement("span",{onMouseUp:this.onMouseUpHandler},e)},r}(x.Component);S.InteractiveHighlighter=ie;(function(n){var r=f&&f.__createBinding||(Object.create?function(e,s,a,l){l===void 0&&(l=a),Object.defineProperty(e,l,{enumerable:!0,get:function(){return s[a]}})}:function(e,s,a,l){l===void 0&&(l=a),e[l]=s[a]}),t=f&&f.__exportStar||function(e,s){for(var a in e)a!=="default"&&!s.hasOwnProperty(a)&&r(s,e,a)};Object.defineProperty(n,"__esModule",{value:!0}),t(S,n)})(H);const T=([n,r,t],[e,s,a])=>n-e||r-s||t-a,le=({row:n,action:r})=>{var p;const[t,e]=h.exports.useReducer(Y,{...n,isVerified:!1,aspects_anno:((p=n.aspects_anno)==null?void 0:p.map(([o,c,v])=>({...C,start:o,end:c,aspect:v})))||[]}),s=(o,c)=>e({type:_.ChangeSentenceAnnotaion,payload:{value:o,column:c}}),a=()=>{const o={};n.is_abuse!==t.is_abuse&&(o.is_abuse=t.is_abuse),n.sexual_score!==t.sexual_score&&(o.sexual_score=t.sexual_score);const c=t.aspects_anno.map(({start:I,end:j,aspect:F})=>[I,j,F]).sort(T),v=[...n.aspects_anno||[]].sort(T);return K(c,v)||(o.aspects_anno=c),o},l=h.exports.useMemo(()=>t.aspects_anno.every(({hasErrorOccurred:o})=>!o),[t.aspects_anno]),d=h.exports.useMemo(()=>t.aspects_anno.map(({start:o,end:c})=>({startIndex:o,numChars:c-o})),[t.aspects_anno]),u=()=>{l?A.pseudoTweetsVerifyPseudoTweet(t.id,a()).then(()=>e({type:_.Verify})):console.error("Error in phrase annotaion")};return g(P,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[i(y,{sx:{fontSize:"1rem",paddingTop:"0px"},align:"left",children:g("div",{className:"flex flex-col",children:[i(H.InteractiveHighlighter,{text:t.text,highlights:d,customClass:"highlighted"}),i(te,{aspects_anno:t.aspects_anno,dispatch:e,isDisabled:r==="verify"&&t.isVerified,textLength:t.text.length})]})}),i(y,{align:"center",children:i(L,{checked:t.is_abuse,onChange:({target:{checked:o}})=>s(o,"is_abuse")})}),i(y,{align:"center",children:i(b,{inputProps:{min:1,max:10},type:"number",value:t.sexual_score,onChange:({target:{value:o}})=>s(parseInt(o)||1,"sexual_score"),helperText:"1-10"})}),i(y,{align:"right",children:r==="modify"?i(Z,{tweetId:t.id,getChangedColumns:a,disabled:!l}):i(O,{children:t.isVerified?i(m,{color:"success",disabled:r==="verify"||!l,onClick:u,children:"Verified"}):i(m,{variant:"contained",onClick:u,disabled:!l,children:"Verify"})})})]})},ve=({action:n})=>{const[r,t]=h.exports.useState([]),[e,s]=h.exports.useState(0),[a,l]=h.exports.useState(!1),d=n==="verify",u=d?A.pseudoTweetsReadPseudoTweets:M.tweetsReadTweets;return h.exports.useEffect(()=>{const o=u(e,10);return o.then(c=>t(c)).catch(c=>{c instanceof J&&console.log("TweetCollectionAdminPanel umounted")}),()=>{o==null||o.cancel()}},[e,a]),g("div",{className:"w-11/12 mx-auto",children:[i("h1",{className:"my-5 text-xl font-bold text-cyan-700 text-center",children:d?"Verify Model's Predictions":"Modify Verifications"}),i(X,{offset:e,setOffset:s,toggleReload:()=>l(!a)}),i(B,{component:k,sx:{height:500},children:g(E,{stickyHeader:!0,sx:{minWidth:650,borderSpacing:"0 20px"},"aria-label":"simple table",children:[g("colgroup",{children:[i("col",{width:"70%"}),i("col",{width:"10%"}),i("col",{width:"10%"}),i("col",{width:"10%"})]}),i(W,{children:i(P,{children:["Text",...Q.map(({field:o})=>o)].map(N).map((o,c)=>i(y,{align:"center",sx:{width:50,fontWeight:"bold"},children:o},c))})}),i(G,{children:r.map(o=>i(le,{row:o,action:n},o.id))})]})})]})};export{ve as default};
