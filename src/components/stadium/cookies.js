import {parseCookies, setCookie as set, destroyCookie as destroy} from 'nookies'

const config={
    sameSite:'None',
    expires: new Date(new Date().getTime()+100*60*60*24*365),
    secure: true,
    path: '/'
};

export const getCookies = (context = null)=>parseCookies(context);

export const setCookie = (name,value, context= null)=>{
    set(context,name,value,config);
};

export const destroyCookie = (name,context=null)=>{
    destroy(context,name,{
        path:'/'
    });
};
