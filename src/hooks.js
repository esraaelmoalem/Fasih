import {useState,useEffect} from 'react';
export function useAsync(fn,deps=[]){const [d,setD]=useState(null);const [n,setN]=useState(0);
useEffect(()=>{let ok=true;fn().then(x=>ok&&setD(x));return()=>{ok=false}},[...deps,n]);return [d,()=>setN(n+1)]}
