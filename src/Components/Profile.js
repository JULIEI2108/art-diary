import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://rbm7x5e9gl.execute-api.us-east-1.amazonaws.com/dev', // Value in Identifier field for the API being called.
            scope: 'read:posts', // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
          }
        });
        const response = await fetch('https://rbm7x5e9gl.execute-api.us-east-1.amazonaws.com/dev/manageItems', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(token)
        const post =await response.json();
        console.log(post)
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {/* {posts.map((post, index) => {
        return <li key={index}>{post}</li>;
      })} */}
    </ul>
  );
};

export default Profile;