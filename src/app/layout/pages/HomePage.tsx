import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import LoginPage from "./LoginPage";

function HomePage(){
    const {userStore} = useStore();
    const {userStore: {logout}} = useStore();

    return(
        <Container style={{marginTop: '7em' }}>
            {userStore.isLoggedIn ? (
                <Container >
                    <Header content={'Welcome ' + userStore.user!.userName + ' !'}/>
                    <Button.Group >
                        <Button as={Link} to='/Products' color="blue" size='huge' inverted>
                            Buy some products    
                        </Button>
                        <Button 
                        inverted
                            animated='fade' 
                            color="blue"
                            onClick={logout}
                        >
                            <Button.Content visible>
                                <Icon name="log out" size="large"/>
                            </Button.Content>
                            <Button.Content hidden>Logout</Button.Content>
                        </Button>    
                    </Button.Group>
                </Container>
            ) : (
                <Container>
                    <Header content='Home page' size="huge"/>
                    <Button.Group>
                        <LoginPage trigger={
                            <Button color="blue" size='huge' inverted content= "Login" />
                        }/>
                        <Button as={Link} to='/Register' color="blue" size='huge' inverted content='Register'/>
                    </Button.Group>
                </Container>     
            )}
        </Container>
    )
}

export default observer(HomePage);