import _ from "lodash";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Card, Container, Header, Icon } from "semantic-ui-react";
import DeleteButton from "../../common/DeleteButton";
import EditButton from "../../common/EditButton";
import { Product } from "../../models/product";
import { useStore } from "../../stores/store";
import EditProductItem from "../pages/Modals/EditProductItem";
import UserListItem from "./UserListItem";

interface Props{
    product : Product
}

function ProductItemCard( {product} : Props){
    const {orderItemStore: {orderItems}} = useStore()
    const {userStore} = useStore()
    const {productStore} = useStore()
    const {orderItemStore} = useStore();
    const [shouldUpdate, setUpdateList] = useState(false);


    if(userStore.isLoggedIn){
        var user =  userStore.user;
    }
    function handleProductBuying(e: SyntheticEvent<HTMLButtonElement>, product: Product){
        orderItemStore.createOrderItem(product);
    }

    function handleRemove(id: string){
        productStore.removeProduct(id);
        setUpdateList(true);
    }
    
    function renderControllButtons(product : Product){

        if(user!.roles.includes('Manager') || user!.roles.includes('Admin')){
            return(
                <>
                    <DeleteButton name={product.id} floated="right" onClick={() => handleRemove(product.id)}/>
                    <EditProductItem 
                        trigger={<EditButton floated='right'/>}
                        product = {product}
                        onApplyButtonClick={()=> setUpdateList(true)}/> 
                </>
            )
        }
    }
    
    return(
        <Card>
        <Card.Content textAlign="left">
            <Card.Header>
                <Header as={'h1'} content={product.title} />
            </Card.Header>
            <Container
                style={{
                    height: "150px",
                    backgroundImage: `url(/sources/img/products/${product.title.replace(' ', '')}.png)`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat"
                }} />

            <Card.Description>
                {product.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Header
                textAlign="center"
                color="green"
                content={product.count + ' шт.'} />
            <Button
                name={product.id}
                fluid
                positive
                icon={<Icon name="shop" />}
                position="right"
                content='Buy now!'
                onClick={(e) => handleProductBuying(e, product)} />
                {renderControllButtons(product)}

        </Card.Content>
    </Card>
    )
}


export default observer(ProductItemCard);
