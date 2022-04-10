import React from "react";
import GoogleLogin from "react-google-login";
import { Button, Icon } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function GoogleButtonTEST(){
    const {userStore} = useStore();


    async function responseGoogleTest(response : any){
        await userStore.googleLoginTest(response.tokenId);
        window.location.reload();
    }
 

    return(
        <GoogleLogin 
        className="googleAuthButton"
        clientId={process.env.REACT_APP_GOOGLE_CLINET_ID as string}
        buttonText="Sign in"
        theme="dark"
        render={renderProps => (
            <Button color='google plus' onClick={renderProps.onClick}>
                        <Icon name='google plus official' />
                        Google
            </Button>
        )}
        onSuccess={(response) => responseGoogleTest(response)}
        onFailure={(response) => responseGoogleTest(response)}
        cookiePolicy="single_host_origin"
        />
    )
}
     


