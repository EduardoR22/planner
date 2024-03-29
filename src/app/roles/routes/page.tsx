import WithOut from "@/components/WithOut";
import Navigation from "@/components/navigation/Navigation";
import { UsrBack } from "@/interfaces/User";
import { cookies } from "next/headers";
import ButtonNew from "@/components/roles/ButtonNew";
import RolesClient from "@/components/roles/RolesClient";
import { getResources } from "@/app/api/routeRoles";
import { Resource, ResourceTable } from "@/interfaces/Roles";
import TableResource from "@/components/roles/TableResource";
import Header from "@/components/Header";

export default async function Page(){
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';
  const user: UsrBack = JSON.parse(cookieStore.get('user')?.value ||'');

  let resources: Resource[];
  try {
    resources = await getResources(token);
    if(typeof(resources) === 'string'){
    return <h1 className="text-center text-red-500">{resources}</h1>
    }
  } catch (error) {
    return <h1 className="text-center text-red-500">Error al consultar recursos!!</h1>
  }
  
  if(!resources || resources.length <= 0){
    <RolesClient token={token}>
      <WithOut img="/img/clientes.svg" subtitle="Rutas" 
        text="Aqui puedes gestionar tus rutas para usuarios que usen el sistema"
        title="Rutas"><ButtonNew token={token} opt={2} /></WithOut>
    </RolesClient>
  }
  
  const data: ResourceTable[] = [];
  resources.map((resource) => {
    data.push({
      description: resource.description,
      id: resource._id,
      name: resource.name,
      status: true
    })
  })

  return(
    <>
      <Navigation user={user} />
      <RolesClient token={token}>
        <div>
          <Header title="Rutas"><ButtonNew token={token} opt={2} /></Header>
          <div className="mt-10">
            <TableResource data={data} token={token} />
          </div>
        </div>
      </RolesClient>
    </>
  )
}