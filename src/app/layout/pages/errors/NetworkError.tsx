import React from "react";
import { Header, Icon, Message, Segment } from "semantic-ui-react";
import './errorButtons.css'

export default function NetworkError(){

    return(
        <Segment placeholder>
                <Header textAlign="center" as={'h1'} size="huge" icon>
                    <Icon style={{marginTop: "30px"}} name='info' size="huge" />
                    <Message size="huge" error>
                        Site is not working at this moment
                    </Message>
                </Header >
      </Segment>
    )
}