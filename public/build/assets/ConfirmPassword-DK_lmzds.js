import{I as n,c as m,a as d,w as t,b as e,u as o,Z as p,e as r,J as u,H as c,K as f}from"./app-BkwNIxsC.js";import{_ as w,a as _,b,P as x,c as g}from"./TextInput-DepFl50G.js";/* empty css            */import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./NavbarLayout-DnD_pdoA.js";const y={class:"flex justify-end mt-4"},N={__name:"ConfirmPassword",setup(P){const s=n({password:""}),i=()=>{s.post(route("password.confirm"),{onFinish:()=>s.reset()})};return(V,a)=>(d(),m(g,null,{default:t(()=>[e(o(p),{title:"Confirm Password"}),a[2]||(a[2]=r("div",{class:"mb-4 text-sm text-gray-600"}," This is a secure area of the application. Please confirm your password before continuing. ",-1)),r("form",{onSubmit:f(i,["prevent"])},[r("div",null,[e(w,{for:"password",value:"Password"}),e(_,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:o(s).password,"onUpdate:modelValue":a[0]||(a[0]=l=>o(s).password=l),required:"",autocomplete:"current-password",autofocus:""},null,8,["modelValue"]),e(b,{class:"mt-2",message:o(s).errors.password},null,8,["message"])]),r("div",y,[e(x,{class:c(["ms-4",{"opacity-25":o(s).processing}]),disabled:o(s).processing},{default:t(()=>a[1]||(a[1]=[u(" Confirm ")])),_:1},8,["class","disabled"])])],32)]),_:1}))}};export{N as default};