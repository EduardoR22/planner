'use client'
import Link from "next/link"
import { UserCircleIcon, CurrencyDollarIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"

export default function NavTab({tab, idUser}: {tab:string, idUser:string}){
  
  const [tabUser, setTabUser] = useState<JSX.Element>(<></>);
  const [width, setWidth] = useState<number>(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    setWidth(window.innerWidth);
  }, [])
  
  useEffect(() => {
    if(width < 710){
      const icon = <div className="flex mt-3 gap-x-5 justify-between">
                      <Link href={`/users/${idUser}?tab=1`}>
                        <UserCircleIcon data-tooltip-target="tooltip-dark"
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='1'? 'bg-green-500 rounded-lg': ''}`} />
                      </Link>  
                      <Link href={`/users/${idUser}?tab=2`}>
                        <CurrencyDollarIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='2'? 'bg-yellow-950 rounded-lg': ''}`} />
                      </Link>
                      <Link href={`/users/${idUser}?tab=3`}>
                        <QuestionMarkCircleIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='3'? 'bg-green-500 rounded-lg': ''}`} />
                      </Link>
                      <Link href={`/users/${idUser}?tab=4`}>
                        <QuestionMarkCircleIcon
                          className={`w-6 h-6 text-slate-600 cursor-pointer 
                          ${tab==='4'? 'bg-green-500 rounded-lg': ''}`} />
                      </Link>
                    </div>                             
      setTabUser(icon)
    }else{
      setTabUser(
        <div className="flex mt-5 bg-white py-1">
          <Link href={`/users/${idUser}?tab=1`}>
            <div className={`flex justify-around w-40 items-center border border-slate-400 ${tab==='1'? 'bg-green-500 text-white':''}`}>
              <p>Perfil</p>
              <UserCircleIcon className="w-8 h-8" />
            </div>
          </Link>
          <Link href={`/users/${idUser}?tab=2`}>
            <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='2'? 'bg-green-500 text-white':''}`}>
              <p>Costos</p>
              <CurrencyDollarIcon className="w-8 h-8" />
            </div>
          </Link>
          <Link href={`/users/${idUser}?tab=3`}>
            <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='3'? 'bg-green-500 text-white':''}`}>
              <p>Estadisticas</p>
              <QuestionMarkCircleIcon className="w-8 h-8" />
            </div>
          </Link>
          <Link href={`/users/${idUser}?tab=4`}>
            <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='4'? 'bg-green-500 text-white':''}`}>
              <p>Logs</p>
              <QuestionMarkCircleIcon className="w-8 h-8" />
            </div>
          </Link>
        </div>
      )
    }
  }, [width, tab])

  return(
    <>
      {tabUser}
      {/* <div className="flex mt-5 bg-white py-1">
        <Link href={`/users/${idUser}?tab=1`}>
          <div className={`flex justify-around w-40 items-center border border-slate-400 ${tab==='1'? 'bg-green-500 text-white':''}`}>
            <p>Perfil</p>
            <UserCircleIcon className="w-8 h-8" />
          </div>
        </Link>
        <Link href={`/users/${idUser}?tab=2`}>
          <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='2'? 'bg-green-500 text-white':''}`}>
            <p>Costos</p>
            <CurrencyDollarIcon className="w-8 h-8" />
          </div>
        </Link>
        <Link href={`/users/${idUser}?tab=3`}>
          <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='3'? 'bg-green-500 text-white':''}`}>
            <p>Estadisticas</p>
            <QuestionMarkCircleIcon className="w-8 h-8" />
          </div>
        </Link>
        <Link href={`/users/${idUser}?tab=4`}>
          <div className={`flex justify-around border border-slate-400 w-40 items-center ${tab==='4'? 'bg-green-500 text-white':''}`}>
            <p>Logs</p>
            <QuestionMarkCircleIcon className="w-8 h-8" />
          </div>
        </Link>
      </div> */}
    </>
  )
}