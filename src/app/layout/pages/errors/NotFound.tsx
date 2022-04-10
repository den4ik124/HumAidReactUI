import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Message, Segment } from "semantic-ui-react";
import { history } from "../../../..";
import './errorButtons.css'

export default function NotFound(){

    function handleUndoButtonClick(){
        history.goBack();   
    }

    return(
        <Segment placeholder>
                <Header textAlign="center" as={'h1'} size="huge" icon>
                    <Icon style={{marginTop: "30px"}} name='search' size="huge" loading />
                    <Message size="huge" warning>
                        Page was not found or not exists yet.
                    </Message>
                </Header >
                <Segment.Inline>
                    <Button onClick={handleUndoButtonClick} icon>
                        <Icon name="arrow left"/>
                        Go back
                    </Button>
                    <Button as={Link} to={'/Products'} icon>
                        Products
                        <Icon name="hand point left"/>
                    </Button>
                    <Button as={Link} to={'/'}  icon>
                        Home
                        <Icon name="hand point left"/>
                    </Button>
                </Segment.Inline>

      </Segment>
        // <Segment>
        //     <Header as='h1'>Page is not found</Header>
        // </Segment>
    )
}