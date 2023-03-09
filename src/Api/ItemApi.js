import Axios from 'axios'
const endpoint = process.env.APIGATEWAY_ENDPOINT


export async function publicItem(){
    const response = await Axios.get(`${endpoint}/manageItems`)
    const result = response.json
    return result.items
}

export async function deleteItem(token, itemId){
    await Axios.delete(`${endpoint}/manageItems/${itemId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    })}


export async function createItem(token, artist, itemname, description, type
      ){const newItem={
        toek: token,
        artist: artist,
        itemname: itemname,
        description: description,
        type: type,
        public: false
      }
        const response = await Axios.post(`${endpoint}/manageItems`,  JSON.stringify(newItem), {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const item= response.data.item
        console.log(item)
        const itemId = item[0].itemId
        const uploadUrl= await getUploadUrl(token, itemId)
        await uploadFile(uploadUrl, file)
      }

export async function updateItem(token, itemId, description, ifPublic, itemname){
        const updateRequest = {
            description:description,
            public: ifPublic,
            itemname: itemname
        }
    await Axios.patch(`${endpoint}/manageItems/${itemId}`, JSON.stringify(updateRequest), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
}


    async function getUploadUrl(
        token,
        itemId
      ){
        const response = await Axios.post(`${endpoint}/manageItems/${itemId}/attachment`, '', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        return response.data.uploadUrl
      }
      
      async function uploadFile(uploadUrl, file) {
        console.log(uploadUrl)
        await Axios.put(uploadUrl, file)
      }
      