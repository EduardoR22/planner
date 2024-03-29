import WithOutProvider from "@/components/providers/WithoutProvider"
import Navigation from "@/components/navigation/Navigation"
import { cookies } from "next/headers"
import TableProviders from "@/components/providers/TableProviders";
import HeaderProvider from "@/components/providers/HeaderProvider";
import {getProviders} from "../api/routeProviders";
import { Provider, TableProvider } from "@/interfaces/Providers";
import { UsrBack } from "@/interfaces/User";

export default async function Providers(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  let id = cookieStore.get('id')?.value || '';
  
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let providers:Provider[]=[];
  try {
    providers = await getProviders(token);
  } catch (error) {
    console.log(typeof(error));
    console.log(error);
    return <h1 className="text-5xl text-center text-red-500 font-semibold">Error al consultar proveedores!!</h1>
  }  

  if(providers.length === 0 || !providers){
    return <WithOutProvider id={id} token={token} />
  }

  let data:TableProvider[] = [];
  providers.map((prov:Provider) => {
    
    let nc = 0;
    if(prov.contact) nc = prov.contact.length;
    
    data.push({
      'id': prov._id,
      'name': prov.tradename || prov.name,
      rfc: prov.rfc,
      currentbalance: prov.tradeline.currentbalance,
      account: prov.account,
      suppliercredit: prov.suppliercredit,
      'contacts': nc
    })
  })
  
  return(
    <>
      <Navigation user={user} />
      
      <div className="p-2 sm:p-3 md-p-5 lg:p-10" style={{backgroundColor:'#F8FAFC'}}>
        <HeaderProvider id={id} token={token} />
        {/* <WithOutProvider /> */}
        <div className="mt-10">
          <TableProviders data={data} token={token} />
        </div>
      </div>
    </>
  )
}