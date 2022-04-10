import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Divider, Grid, Header, Item, Rail, Segment, Statistic, Sticky } from "semantic-ui-react";
import { history } from "../../..";
import agent from "../../api/agent";
import { useStore } from "../../stores/store";
import EmptyPage from "../components/EmptyPage";
import OrderListItem from "../components/OrderListItem";
import './gridCustomStyles.css';



 function ProductCart(){
    const {orderItemStore} = useStore()
    const {orderItemStore: {orderItems}} = useStore()
    const [disabled, setDisabled] = useState(false);

    
    var totalCost = orderItemStore.getTotalCost();
    useEffect(() => {
        if(totalCost <= 0 ){
            setDisabled(true)
        }
        else(
            setDisabled(false)
        )
    }, [totalCost])

    if(orderItems.length < 1 ){
        return (
            <EmptyPage message="You did not select any product from list"/>
        )
    }

    
    function handleOrderCreation(): void {
        agent.Order.create(orderItems);
        runInAction(() => orderItemStore.orderItems = []);
        history.push('/Products');
        toast.success('Products successfully purchased.')
    }

    return(
        <Grid columns={2}>
            <Grid.Column>
                <Header> Your products</Header>
                <Item.Group>
                    {orderItems.map((item) => (
                        <OrderListItem key={item.id} item={item}/>
                    ))}
                    
                </Item.Group>

                <Rail position='right'>
                    <Sticky offset={50} >
                    <Segment textAlign="center" inverted color="olive">
                        <Header as='h3'>Сумма заказа</Header>
                        <Statistic size="small">
                            <Statistic.Value content={`${orderItemStore.getTotalCost()} UAH`}/>
                            <Statistic.Label content='Total cost'/>
                        </Statistic>
                        <Divider/>
                        <Button positive disabled={disabled} content='Оформить заказ' onClick={() => handleOrderCreation()}/>
                    </Segment>
                    </Sticky>
                </Rail>
            </Grid.Column>
        </Grid>
    )

    
}

export default observer(ProductCart)


