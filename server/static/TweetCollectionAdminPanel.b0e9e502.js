import{u as b,r as o,j as c,T,a as e,b as r,C as S,c as y,F as x,S as v,A as k,B as m,d as w,P as C,e as P,f as R,g as F,h as A,i as V,k as _,p as j,t as B,l as H}from"./index.9da24581.js";const M=({row:a,action:d})=>{const{getChangedColumns:p,currentRow:i,handleChange:h,snackOpen:n,handleClose:u,modifySubmit:g}=b({row:a,serviceFunc:w.tweetsUpdateTweet}),[t,s]=o.exports.useState(!1),l=()=>{C.pseudoTweetsVerifyPseudoTweet(a.id,p()).then(()=>s(!0))};return c(T,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[e(r,{sx:{fontSize:"1rem"},align:"left",children:a.text}),e(r,{align:"center",children:e(S,{checked:i.is_abuse,onChange:({target:{checked:f}})=>{h(f,"is_abuse")}})}),e(r,{align:"center",children:e(y,{inputProps:{inputMode:"numeric",pattern:"[1-9]|10"},value:i.sexual_score,onChange:({target:{value:f}})=>{h(parseInt(f),"sexual_score")},helperText:"1-10"})}),e(r,{align:"right",children:d==="modify"?c(x,{children:[e(v,{open:n.display,autoHideDuration:3e3,onClose:u,children:e(k,{onClose:u,severity:n.intent,sx:{width:"100%"},children:n.message})}),e(m,{variant:"contained",onClick:g,children:"Modify"})]}):e(x,{children:t?e(m,{color:"success",disabled:d==="verify",onClick:l,children:"Verified"}):e(m,{variant:"contained",onClick:l,children:"Verify"})})})]},a.id)},E=({action:a})=>{const[d,p]=o.exports.useState([]),[i,h]=o.exports.useState(0),[n,u]=o.exports.useState(!1);return o.exports.useEffect(()=>{const s=(a==="verify"?C.pseudoTweetsReadPseudoTweets:w.tweetsReadTweets)(i,10);return s.then(l=>p(l)).catch(l=>{l instanceof P&&console.log("TweetCollectionAdminPanel umounted")}),()=>{s==null||s.cancel()}},[i,n]),c("div",{className:"mt-10 w-11/12 mx-auto ",children:[e(R,{offset:i,setOffset:h,toggleReload:()=>u(!n)}),e(F,{component:A,sx:{height:500},children:c(V,{stickyHeader:!0,sx:{minWidth:650,borderSpacing:"0 20px"},"aria-label":"simple table",children:[c("colgroup",{children:[e("col",{width:"70%"}),e("col",{width:"10%"}),e("col",{width:"10%"}),e("col",{width:"10%"})]}),e(_,{children:e(T,{children:["Text",...j.map(({field:t})=>t)].map(B).map((t,s)=>e(r,{align:"center",sx:{width:50,fontWeight:"bold"},children:t},s))})}),e(H,{children:d.map(t=>e(M,{row:t,action:a},t.id))})]})})]})};export{E as default};
