import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, Container, Grid, Header, Icon, Item, Label, List, Segment, Table } from "semantic-ui-react";

function OrdersAdminPage(){
    return(
        <>
            <Header>Заказы клиентов:</Header>

            
            <Item.Group divided>
                <Segment inverted color="olive" raised >
                    <Item as={Link} to={`/admin/orders/{1}`}>
                        <Grid columns={3} >
                        <Grid.Column width={1}>
                            <Icon name="check"/>
                        </Grid.Column>
                            <Grid.Column>
                                <Item.Content verticalAlign='middle'>
                                    <Header>
                                        # 123 435
                                    </Header>
                                </Item.Content>
                            </Grid.Column>
                            <Grid.Column>
                                <Item.Content verticalAlign='middle'>
                                    <Header>
                                        +38099-999-99-99
                                    </Header>
                                </Item.Content>
                            </Grid.Column>
                        </Grid>
                    </Item>
                </Segment>

                <Segment raised color="yellow">
                    <Item as={Link}>
                        <Grid columns={3} >
                        <Grid.Column width={1}>
                            <Icon name="exclamation"/>

                        </Grid.Column>
                            <Grid.Column>
                                <Item.Content verticalAlign='middle'>
                                    <Header>
                                        # 321 543
                                    </Header>
                                </Item.Content>
                            </Grid.Column>
                            <Grid.Column>
                                <Item.Content verticalAlign='middle'>
                                    <Header>
                                        +38099-555-55-55
                                    </Header>
                                </Item.Content>
                            </Grid.Column>
                        </Grid>
                    </Item>
                </Segment>
                  
                <Segment inverted color="olive" raised >

                    <Item as={Link}>
                        <Grid columns={3} >
                        <Grid.Column width={1}>
                            <Icon name="check"/>

                        </Grid.Column>
                            <Grid.Column>
                                <Item.Content verticalAlign='middle'>
                                    <Header>
                                        # 223 435
                                    </Header>
                                </Item.Content>
                            </Grid.Column>
                            <Grid.Column>
                                <Item.Content verticalAlign='middle'>
                                    <Header>
                                        +38099-333-99-99
                                    </Header>
                                </Item.Content>
                            </Grid.Column>
                        </Grid>
                    </Item>
                </Segment>
  
        </Item.Group>

        </>
    )
}

export default observer(OrdersAdminPage)