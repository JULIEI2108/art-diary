import Axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
const endpoint = process.env.REACT_APP_APIGATEWAY_ENDPOINT
const { getAccessTokenSilently } = useAuth0();


export async function publicItem(){
    const response = await Axios.get(`${endpoint}/manageItems`)
    const result = response.json
    return result.items
}

export async function deleteItem(itemId){
    var token = accessToken()
    await Axios.delete(`${endpoint}/manageItems/${itemId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    })}


export async function createItem( artist, itemname, description, type
      ){const newItem={
        toek: token,
        artist: artist,
        itemname: itemname,
        description: description,
        type: type,
        public: false
      }
      var token = accessToken()
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

export async function updateItem(itemId, description, ifPublic, itemname){
        const updateRequest = {
            description:description,
            public: ifPublic,
            itemname: itemname
        }
        var token = accessToken()
    await Axios.patch(`${endpoint}/manageItems/${itemId}`, JSON.stringify(updateRequest), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
}

    async function getUploadUrl(
        itemId
      ){const token = accessToken()
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
      

    async function accessToken(){
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://rbm7x5e9gl.execute-api.us-east-1.amazonaws.com/dev', // Value in Identifier field for the API being called.
            scope: 'read:posts', // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
            }
          }
        )      
        } catch (e) {
        console.error(e);
      }}