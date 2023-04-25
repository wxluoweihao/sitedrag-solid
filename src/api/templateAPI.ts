interface AllTemplates {

}

interface CreateTemplate {

}



export async function getAllTemplates():Promise<string> {
    const response = await fetch('localhost/web/736e3fab-8cb8-4997-87b0-faa102d3903a');
    const data = await response.json();
    return data;
};



export const post: CreateTemplate = ({ request }) => {
 
  fetch("localhost/web/736e3fab-8cb8-4997-87b0-faa102d3903a", {
        method: "POST",
        body: `{
            
        }`,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

}


