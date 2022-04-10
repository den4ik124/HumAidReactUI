import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useState } from "react"
import { Button, Form, Grid, Icon, Input, Item, Label, Segment } from "semantic-ui-react"
import { OrderItem } from "../../models/orderItem"
import { useStore } from "../../stores/store";
import RatingElement from "./RatingComponent";

interface Props{
    item : OrderItem
}

function OrderListItem({item} : Props){
    const {orderItemStore} = useStore()
    const [disabled, setDisable] = useState(false);

    function decreaseCount(orderItem : OrderItem){
        runInAction(() => {orderItem.productAmount--
        if(orderItem.productAmount < 1){
           orderItem.productAmount =1;
        }
    });
    }
    
    function increaseCount(orderItem : OrderItem){
        runInAction(() => orderItem.productAmount++);
    }
    
function handleRemoveItemFromCart(e:  React.MouseEvent<HTMLElement, MouseEvent>,
     item : OrderItem){

    runInAction(() => item.isActive = false) ;
    setDisable(true);
}

function handleFinalRemoveItemFromCart(item : OrderItem){
    runInAction(() => {
    const index = orderItemStore.orderItems.indexOf(item);
    if (index > -1) {
        orderItemStore.orderItems.splice(index, 1);
    }
    })
}

function handleRestoreItem(e: React.MouseEvent<HTMLElement, MouseEvent> , item : OrderItem){
    runInAction(() => item.isActive = true) ;
    // setTarget(e.currentTarget.tagName);
    setDisable(false);
}

    return(
        <Item key={item.id} >
        <>
        {item.isActive ? null : (
            renderRestoreRemoveButtons(item)
        )}
        <Segment
            
            floated="left"
            style={{margin : "0px"}} 
            //name={item.id} 
            disabled={disabled}>
        <Label circular style={{border: "none", margin: '0px', background: '#fff0'}} attached="top left" basic onRemove={(e) => handleRemoveItemFromCart(e, item)}/>
        <Grid className=".no-grid-magrin-top" stretched relaxed='very' style={{marginTop: "0px !important"}} columns={5}>
            <Grid.Column width={4}>
                <Item.Image 
                    size='tiny' 
                    src={`/sources/img/products/${item.product.title.replace(' ','')}.png`}
                />
            </Grid.Column>
            <Grid.Column width={5}>
                <Item.Header>{item.product.title}</Item.Header>
                {/* TODO: заменить на реальный рейтинг */}
                <Item.Meta><RatingElement currentRating={0}/></Item.Meta> 
                <Item.Meta>{item.product.description}</Item.Meta>
            </Grid.Column>
            <Grid.Column width={3}>
            <Form >
                    <Button disabled={disabled} icon='arrow up' size="mini" onClick={() => increaseCount(item)}/>
                    <Input
                    transparent
                    disabled={disabled}
                        // style ={{minWidth: "50px"}}
                        fluid
                        name='productCount'
                        placeholder='1'
                        value={item.productAmount}
                        
                    />
                    <Button disabled={disabled} icon='arrow down' size="mini" onClick={() => decreaseCount(item)}/>
            </Form>
            </Grid.Column>
            <Grid.Column width={3}>
                <Item.Content verticalAlign="middle" content={`${item.product.price} UAH`}/>
            </Grid.Column>
        </Grid>
        </Segment>
    </>
    </Item>
    )


    function renderRestoreRemoveButtons(item: OrderItem): React.ReactNode {
        return <Button.Group style={{outline: 'none'}} compact vertical>
            <Button 
            compact
            basic
            disabled={!disabled} 
            color="green"
            icon 
            onClick={(e) => handleRestoreItem(e, item)}
            >
                Restore
                <Icon name='check' />
            </Button>
            <Button 
            compact 
            basic 
            disabled={!disabled} 
            color="red" 
            icon 
            onClick={() => handleFinalRemoveItemFromCart(item)}
            >
                <Icon name='trash' />
            </Button>
        </Button.Group>;
    }

}

export default observer(OrderListItem)
