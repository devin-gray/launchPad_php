import{r as d,I as f,f as c,e,K as b,i as y,v as w,u as r,t as v,g as _,a as i}from"./app-BkwNIxsC.js";/* empty css            */const x={class:"space-y-6"},k=["open"],g={class:"modal-box"},D={class:"form-control"},h={key:0,class:"text-error text-sm mt-1"},C={class:"modal-action"},U=["disabled"],I={__name:"DeleteUserForm",setup(A){const l=d(!1),a=d(null),o=f({password:""}),u=()=>{l.value=!0,setTimeout(()=>{var t;return(t=a.value)==null?void 0:t.focus()},250)},p=()=>{o.delete(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>n(),onError:()=>{var t;return(t=a.value)==null?void 0:t.focus()},onFinish:()=>o.reset()})},n=()=>{l.value=!1,o.reset()};return(t,s)=>(i(),c("section",x,[s[4]||(s[4]=e("header",null,[e("h2",{class:"text-lg font-medium"},"Delete Account"),e("p",{class:"mt-1 text-sm text-base-content/70"}," Once your account is deleted, all of its resources and data will be permanently deleted. ")],-1)),e("button",{class:"btn btn-error",onClick:u},"Delete Account"),e("dialog",{open:l.value,class:"modal"},[e("div",g,[s[2]||(s[2]=e("h3",{class:"font-bold text-lg"},"Are you sure you want to delete your account?",-1)),s[3]||(s[3]=e("p",{class:"py-4"}," Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. ",-1)),e("form",{onSubmit:b(p,["prevent"])},[e("div",D,[s[1]||(s[1]=e("label",{class:"label",for:"password"},[e("span",{class:"label-text"},"Password")],-1)),y(e("input",{id:"password",ref_key:"passwordInput",ref:a,"onUpdate:modelValue":s[0]||(s[0]=m=>r(o).password=m),type:"password",class:"input input-bordered",placeholder:"Password"},null,512),[[w,r(o).password]]),r(o).errors.password?(i(),c("div",h,v(r(o).errors.password),1)):_("",!0)]),e("div",C,[e("button",{type:"button",class:"btn",onClick:n},"Cancel"),e("button",{type:"submit",class:"btn btn-error",disabled:r(o).processing}," Delete Account ",8,U)])],32)]),e("form",{method:"dialog",class:"modal-backdrop"},[e("button",{onClick:n},"close")])],8,k)]))}};export{I as default};