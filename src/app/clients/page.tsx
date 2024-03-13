import { getClients } from "../api/routeClients"
import { cookies } from "next/headers";
import WithOut from "@/components/WithOut";
import ButtonNewClient from "@/components/clients/ButtonNewClient";
import Navigation from "@/components/navigation/Navigation";
import { ClientBack, TableClient } from "@/interfaces/Clients";
import { UsrBack } from "@/interfaces/User";
import Header from "@/components/Header";
import TableClients from "@/components/clients/TableClients";
import { Config } from "@/interfaces/Common";

export default async function clients(){
  
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let config = cookieStore.get('config')?.value || '';
  let numRows = 3;
  let objectConfig: Config;
  if(config) {
    objectConfig = JSON.parse(config);
    numRows = parseInt(objectConfig.numRows);
  }

  let clients;
  try {
    clients = await getClients(token);
  } catch (error) {
    return <WithOut img="/img/clientes.svg" subtitle="Clientes" 
              text="Aqui puedes gestionar tus clientes con toda su informacion relevante" 
              title="Clientes"><ButtonNewClient token={token} id={user._id} /></WithOut>
  }

  if(!clients || clients.length<= 0){
    return <WithOut img="/img/clientes.svg" subtitle="Clientes" 
              text="Aqui puedes gestionar tus clientes con toda su informacion relevante" 
              title="Clientes"><ButtonNewClient token={token} id={user._id} /></WithOut>
  }
  
  let data:TableClient[] = [];
  clients.map((client:ClientBack) => {
    data.push({
      'id': client._id,
      'name': client.name,
      account: client.account,
      contacts: client.contact.length,
      currentbalance: 0,
      rfc: client.rfc,
      status: client.status,
    })
  })

  return (
    <>
      <Navigation user={user} />
            
      <div className="p-2 sm:p-3 md-p-5 lg:p-10">
        <Header title="Clientes"><ButtonNewClient id={user._id} token={token} /></Header>
        <div className="mt-10">
          <TableClients data={data} token={token} numRows={numRows} />
        </div>
      </div>
    </>
  )
}