import{o as g,j as i,L as x,t as m,K as O,$ as D,a0 as R,S as V,Q as U,a1 as P,a2 as y,R as L,a3 as B,v as k,a4 as E,a5 as W,a6 as G}from"./mui_material-e1e597a8.js";import{r as h,c as f}from"./react-75fa6e8e.js";import{a as M,P as N,C as K}from"./client-46a16339.js";import{T as $,S as q,A as z,t as H,n as Q,s as J}from"./index-566644d1.js";import"./react_router-adcaf3b9.js";import"./mui_extras-ef4ab4e7.js";import"./chart_js-4074cdf3.js";import"./chart_js_extras-05c44e89.js";const X=({offset:n,setOffset:r,toggleReload:t})=>{const[e,s]=h.exports.useState(n),a=h.exports.useRef(null),l=h.exports.useRef(null);return g("div",{className:"flex justify-between",children:[i($,{ref:a}),i(q,{ref:l}),i(x,{label:"Offset",value:e,type:"number",onChange:({target:{value:p}})=>s(parseInt(p)),onKeyDown:({key:p})=>{p==="Enter"&&r(e)}}),i(m,{onClick:t,children:"Refuel"})]})};var _=(n=>(n[n.NewPhrase=0]="NewPhrase",n[n.ChangeStart=1]="ChangeStart",n[n.ChangeEnd=2]="ChangeEnd",n[n.ChangeAspect=3]="ChangeAspect",n[n.DeletePhrase=4]="DeletePhrase",n[n.Verify=5]="Verify",n[n.ChangeSentenceAnnotaion=6]="ChangeSentenceAnnotaion",n))(_||{});const C={start:0,startHelperText:"Start Offset (inclusive)",end:0,endHelperText:"End Offset (exclusive)",hasErrorOccurred:!1,aspect:0},w=(n,r,t)=>{const e=r>=t;let{startHelperText:s,endHelperText:a}=C;return e&&(s=a="start must be less than end"),{...n,start:r,end:t,hasErrorOccurred:e,startHelperText:s,endHelperText:a}},Y=(n,r)=>{switch(r.type){case 0:return{...n,aspects_anno:[...n.aspects_anno,C]};case 1:{const{index:t,start:e}=r.payload,s=[...n.aspects_anno],a=s[t],l=w(a,e,a.end);return s[t]=l,{...n,aspects_anno:s}}case 2:{const{index:t,end:e}=r.payload,s=[...n.aspects_anno],a=s[t],l=w(a,a.start,e);return s[t]=l,{...n,aspects_anno:s}}case 3:{const{index:t,aspect:e}=r.payload,s=[...n.aspects_anno],a=s[t];return s[t]={...a,aspect:e},{...n,aspects_anno:s}}case 4:{const{index:t}=r.payload,e=[...n.aspects_anno];return e.splice(t,1),{...n,aspects_anno:e}}case 5:return{...n,isVerified:!0};case 6:return{...n,[r.payload.column]:r.payload.value};default:return n}},Z=({tweetId:n,getChangedColumns:r,disabled:t})=>{const[e,s]=h.exports.useState({display:!1,message:"",intent:"success"}),a=()=>s(p=>({...p,display:!1})),l=async()=>{try{return await M.tweetsUpdateTweet(n,r()),s({display:!0,message:"Successfully Modified",intent:"success"})}catch{return s({display:!1,message:"Modification Failed",intent:"error"})}};return g(O,{children:[i(D,{open:e.display,autoHideDuration:3e3,onClose:a,children:i(R,{onClose:a,severity:e.intent,sx:{width:"100%"},children:e.message})}),i(m,{variant:"contained",onClick:l,disabled:t,children:"Modify"})]})},ee=({index:n,end:r,start:t,hasErrorOccurred:e,dispatch:s,startHelperText:a,textLength:l,endHelperText:p,aspect:c,isDisabled:u})=>g("div",{className:"flex items-start justify-between",children:[i(x,{inputProps:{min:0,max:r-1<0?0:r-1},type:"number",value:t,error:e,onChange:({target:{value:o}})=>s({type:_.ChangeStart,payload:{index:n,start:parseInt(o)||0}}),helperText:a}),i(x,{inputProps:{min:t+1,max:l},type:"number",value:r,error:e,onChange:({target:{value:o}})=>s({type:_.ChangeEnd,payload:{index:n,end:parseInt(o)||0}}),helperText:p}),i(V,{value:c,label:"Aspect",onChange:({target:{value:o}})=>s({type:_.ChangeAspect,payload:{index:n,aspect:o}}),children:z.map(H).map((o,d)=>i(U,{value:d,children:o},d))}),i(m,{variant:"contained",color:"warning",onClick:()=>s({type:_.DeletePhrase,payload:{index:n}}),disabled:u,sx:{marginTop:"0.5rem"},children:"Delete Annotation"})]}),te=n=>{const{aspects_anno:r,...t}=n,{dispatch:e,isDisabled:s}=t;return g("div",{className:"items-start mt-0.5",children:[i("div",{className:"flex flex-col",children:r.map((a,l)=>h.exports.createElement(ee,{...t,...a,index:l,key:l}))}),i(m,{variant:"contained",color:"secondary",onClick:()=>e({type:_.NewPhrase}),disabled:s,children:"Add New Phrase Annotation"})]})};var A={},S={},ne=f&&f.__extends||function(){var n=function(r,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,s){e.__proto__=s}||function(e,s){for(var a in s)s.hasOwnProperty(a)&&(e[a]=s[a])},n(r,t)};return function(r,t){n(r,t);function e(){this.constructor=r}r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}}(),se=f&&f.__createBinding||(Object.create?function(n,r,t,e){e===void 0&&(e=t),Object.defineProperty(n,e,{enumerable:!0,get:function(){return r[t]}})}:function(n,r,t,e){e===void 0&&(e=t),n[e]=r[t]}),re=f&&f.__setModuleDefault||(Object.create?function(n,r){Object.defineProperty(n,"default",{enumerable:!0,value:r})}:function(n,r){n.default=r}),ae=f&&f.__importStar||function(n){if(n&&n.__esModule)return n;var r={};if(n!=null)for(var t in n)t!=="default"&&Object.hasOwnProperty.call(n,t)&&se(r,n,t);return re(r,n),r};Object.defineProperty(S,"__esModule",{value:!0});S.InteractiveHighlighter=void 0;var b=ae(h.exports);function oe(n,r){if(n===r)return!0;if(n==null||r==null||n.length!==r.length)return!1;for(var t=0;t<n.length;++t)if(n[t]!==r[t])return!1;return!0}var ie=function(n){ne(r,n);function r(t){var e=n.call(this,t)||this;return e.props.getSelectionFn?e._getSelectionMarker=e.props.getSelectionFn:e._getSelectionMarker=e._getSelectionFromDOM,e.onMouseUpHandler=e.onMouseUpHandler.bind(e),e.props.customClassFn?e._customClassFn=e.props.customClassFn:e._customClassFn=function(s){return s.length>0?e.props.customClass||"default":""},e._segments=[],e}return r.prototype._getSelectionFromDOM=function(){var t=window.getSelection();if(!t)return console.error("getSelection() returned null"),null;var e=t.toString(),s=t.anchorNode,a=t.focusNode,l=t.anchorOffset,p=t.focusOffset,c,u=!1;if(s&&a)c=s.compareDocumentPosition(a);else return console.warn("Returning from onMouseUpHandler because anchorNode or focusNode are null"),null;c===s.DOCUMENT_POSITION_FOLLOWING?u=!0:c===0&&(u=p-l>0);var o=u?l:p,d;if(u)if(s.parentNode)d=s.parentNode;else return console.error("Ended up with null anchorNode.parentNode - should be impossible!"),null;else if(a.parentNode)d=a.parentNode;else return console.error("Ended up with null focusNode.parentNode - should be impossible!"),null;if(d.getAttribute("data-segment")){var v=Number(d.getAttribute("data-segment"));o+=this._segments[v].start}return t.removeAllRanges(),{selectionStart:o,selectionLength:e.length}},r.prototype._computeSegments=function(){for(var t=this.props.highlights,e=[],s=0,a=[],l=function(c){var u=t.map(function(o){return c>=Number(o.startIndex)&&c<Number(o.startIndex)+Number(o.numChars)});oe(a,u)||(c>0&&(e.push({start:s,end:c-1,highlights:a.map(function(o,d){return o?d:-1}).filter(function(o){return o!==-1})}),s=c),a=u.slice())},p=0;p<this.props.text.length;p++)l(p);return e.length===0?e.push({start:0,end:this.props.text.length,highlights:[]}):e.push({start:s,end:this.props.text.length,highlights:a.map(function(c,u){return c?u:-1}).filter(function(c){return c!==-1})}),e},r.prototype.onMouseUpHandler=function(t){t.preventDefault();var e=this._getSelectionMarker();if(e&&e.selectionLength){var s=this.props.text.substr(e.selectionStart,e.selectionLength);this.props.selectionHandler&&this.props.selectionHandler(s,e.selectionStart,e.selectionLength)}},r.prototype.render=function(){this._segments=this._computeSegments();for(var t=this.props.text,e=[],s=0;s<this._segments.length;s++){var a=this._segments[s].start,l=this._segments[s].end-this._segments[s].start+1;this._segments[s].highlights.length>0?e.push(b.default.createElement("span",{key:"d"+s,"data-segment":s,className:this._customClassFn(this._segments[s].highlights)},t.substr(a,l))):e.push(b.default.createElement("span",{key:"d"+s,"data-segment":s,className:this._customClassFn(this._segments[s].highlights)},t.substr(a,l)))}return b.default.createElement("span",{onMouseUp:this.onMouseUpHandler},e)},r}(b.Component);S.InteractiveHighlighter=ie;(function(n){var r=f&&f.__createBinding||(Object.create?function(e,s,a,l){l===void 0&&(l=a),Object.defineProperty(e,l,{enumerable:!0,get:function(){return s[a]}})}:function(e,s,a,l){l===void 0&&(l=a),e[l]=s[a]}),t=f&&f.__exportStar||function(e,s){for(var a in e)a!=="default"&&!s.hasOwnProperty(a)&&r(s,e,a)};Object.defineProperty(n,"__esModule",{value:!0}),t(S,n)})(A);const T=([n,r,t],[e,s,a])=>n-e||r-s||t-a,le=({row:n,action:r})=>{var u;const[t,e]=h.exports.useReducer(Y,{...n,isVerified:!1,aspects_anno:((u=n.aspects_anno)==null?void 0:u.map(([o,d,v])=>({...C,start:o,end:d,aspect:v})))||[]}),s=(o,d)=>e({type:_.ChangeSentenceAnnotaion,payload:{value:o,column:d}}),a=()=>{const o={};n.is_abuse!==t.is_abuse&&(o.is_abuse=t.is_abuse),n.sexual_score!==t.sexual_score&&(o.sexual_score=t.sexual_score);const d=t.aspects_anno.map(({start:I,end:j,aspect:F})=>[I,j,F]).sort(T),v=[...n.aspects_anno||[]].sort(T);return Q(d,v)||(o.aspects_anno=d),o},l=h.exports.useMemo(()=>t.aspects_anno.every(({hasErrorOccurred:o})=>!o),[t.aspects_anno]),p=h.exports.useMemo(()=>t.aspects_anno.map(({start:o,end:d})=>({startIndex:o,numChars:d-o})),[t.aspects_anno]),c=()=>{l?N.pseudoTweetsVerifyPseudoTweet(t.id,a()).then(()=>e({type:_.Verify})):console.error("Error in phrase annotaion")};return g(P,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[i(y,{sx:{fontSize:"1rem",paddingTop:"0px"},align:"left",children:g("div",{className:"flex flex-col",children:[i(A.InteractiveHighlighter,{text:t.text,highlights:p,customClass:"highlighted"}),i(te,{aspects_anno:t.aspects_anno,dispatch:e,isDisabled:r==="verify"&&t.isVerified,textLength:t.text.length})]})}),i(y,{align:"center",children:i(L,{checked:t.is_abuse,onChange:({target:{checked:o}})=>s(o,"is_abuse")})}),i(y,{align:"center",children:i(x,{inputProps:{min:1,max:10},type:"number",value:t.sexual_score,onChange:({target:{value:o}})=>s(parseInt(o)||1,"sexual_score"),helperText:"1-10"})}),i(y,{align:"right",children:r==="modify"?i(Z,{tweetId:t.id,getChangedColumns:a,disabled:!l}):i(O,{children:t.isVerified?i(m,{color:"success",disabled:r==="verify"||!l,onClick:c,children:"Verified"}):i(m,{variant:"contained",onClick:c,disabled:!l,children:"Verify"})})})]})},me=({action:n})=>{const[r,t]=h.exports.useState([]),[e,s]=h.exports.useState(0),[a,l]=h.exports.useState(!1);return h.exports.useEffect(()=>{const u=(n==="verify"?N.pseudoTweetsReadPseudoTweets:M.tweetsReadTweets)(e,10);return u.then(o=>t(o)).catch(o=>{o instanceof K&&console.log("TweetCollectionAdminPanel umounted")}),()=>{u==null||u.cancel()}},[e,a]),g("div",{className:"mt-10 w-11/12 mx-auto ",children:[i(X,{offset:e,setOffset:s,toggleReload:()=>l(!a)}),i(B,{component:k,sx:{height:500},children:g(E,{stickyHeader:!0,sx:{minWidth:650,borderSpacing:"0 20px"},"aria-label":"simple table",children:[g("colgroup",{children:[i("col",{width:"70%"}),i("col",{width:"10%"}),i("col",{width:"10%"}),i("col",{width:"10%"})]}),i(W,{children:i(P,{children:["Text",...J.map(({field:c})=>c)].map(H).map((c,u)=>i(y,{align:"center",sx:{width:50,fontWeight:"bold"},children:c},u))})}),i(G,{children:r.map(c=>i(le,{row:c,action:n},c.id))})]})})]})};export{me as default};