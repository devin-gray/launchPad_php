import{r as c,I as f,f as a,e as r,i as d,v as l,u as t,t as w,g as p,K as _,a as n}from"./app-BkwNIxsC.js";/* empty css            */const b={class:"form-control"},x={key:0,class:"text-error text-sm mt-1"},v={class:"form-control"},y={key:0,class:"text-error text-sm mt-1"},P={class:"form-control"},g={class:"flex items-center gap-4"},k=["disabled"],S={key:0,class:"text-sm text-success"},C={__name:"UpdatePasswordForm",setup(I){const u=c(null),i=c(null),s=f({current_password:"",password:"",password_confirmation:""}),m=()=>{s.put(route("password.update"),{preserveScroll:!0,onSuccess:()=>s.reset(),onError:()=>{s.errors.password&&(s.reset("password","password_confirmation"),u.value.focus()),s.errors.current_password&&(s.reset("current_password"),i.value.focus())}})};return(U,e)=>(n(),a("section",null,[e[6]||(e[6]=r("header",null,[r("h2",{class:"text-lg font-medium"},"Update Password"),r("p",{class:"mt-1 text-sm text-base-content/70"}," Ensure your account is using a long, random password to stay secure. ")],-1)),r("form",{onSubmit:_(m,["prevent"]),class:"mt-6 space-y-6"},[r("div",b,[e[3]||(e[3]=r("label",{class:"label",for:"current_password"},[r("span",{class:"label-text"},"Current Password")],-1)),d(r("input",{id:"current_password",ref_key:"currentPasswordInput",ref:i,"onUpdate:modelValue":e[0]||(e[0]=o=>t(s).current_password=o),type:"password",class:"input input-bordered",autocomplete:"current-password"},null,512),[[l,t(s).current_password]]),t(s).errors.current_password?(n(),a("div",x,w(t(s).errors.current_password),1)):p("",!0)]),r("div",v,[e[4]||(e[4]=r("label",{class:"label",for:"password"},[r("span",{class:"label-text"},"New Password")],-1)),d(r("input",{id:"password",ref_key:"passwordInput",ref:u,"onUpdate:modelValue":e[1]||(e[1]=o=>t(s).password=o),type:"password",class:"input input-bordered",autocomplete:"new-password"},null,512),[[l,t(s).password]]),t(s).errors.password?(n(),a("div",y,w(t(s).errors.password),1)):p("",!0)]),r("div",P,[e[5]||(e[5]=r("label",{class:"label",for:"password_confirmation"},[r("span",{class:"label-text"},"Confirm Password")],-1)),d(r("input",{id:"password_confirmation","onUpdate:modelValue":e[2]||(e[2]=o=>t(s).password_confirmation=o),type:"password",class:"input input-bordered",autocomplete:"new-password"},null,512),[[l,t(s).password_confirmation]])]),r("div",g,[r("button",{type:"submit",class:"btn btn-primary",disabled:t(s).processing},"Save",8,k),t(s).recentlySuccessful?(n(),a("p",S,"Saved.")):p("",!0)])],32)]))}};export{C as default};
