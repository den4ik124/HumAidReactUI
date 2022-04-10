import { observer } from "mobx-react-lite";
import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { Button, Label,  Container, Header, Card, Icon, Grid} from "semantic-ui-react";
import agent from "../../api/agent";
import DeleteButton from "../../common/DeleteButton";
import EditButton from "../../common/EditButton";
import { Product } from "../../models/product";
import { useStore } from "../../stores/store";
import LoadingComponent from "../components/LoadingComponents";
import RatingElement from "../components/RatingComponent";
import CreateNewProduct from "./Modals/CreateNewProduct";
import EditProductItem from "./Modals/EditProductItem";

function ProductsPage(){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [shouldUpdate, setUpdateList] = useState(false);

    const {userStore} = useStore()
    const {productStore} = useStore()
    const {orderItemStore} = useStore();


    if(userStore.isLoggedIn){
        var user =  userStore.user;
    }

    useEffect(() => {
        agent.Products.list().then(response => {
            setProducts(response);
            setLoading(false);
            setUpdateList(false)
        })
    }, [shouldUpdate])

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

    if(loading) return <LoadingComponent content="Loading products..."/>

    function handleRemove(id: string){
        productStore.removeProduct(id);
        setUpdateList(true);
    }


    function handleProductBuying(e: SyntheticEvent<HTMLButtonElement>, product: Product){
        orderItemStore.createOrderItem(product);
    }

return(
    <Fragment>
        <Label ribbon color="red" size="huge" content="Page is in design progress ..."/>
        {user!.roles.includes('Manager') || user!.roles.includes('Admin') ? (
            <>
                <CreateNewProduct trigger={<Button fluid positive content="Add new product"
                style={{marginBottom: "50px"}} />}/>
            </>
        ) : null}

        <Grid columns={4} relaxed stackable>
        {products.map((product) => {
            return (
                <Grid.Column key={product.id}>
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
                            <Card.Meta>
                                {/* TODO : add actual rating value instead of 0 */}
                                <RatingElement currentRating={0} /> 
                            </Card.Meta>
                            <Card.Description>
                                {product.description}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Header
                                textAlign="center"
                                color="green"
                                content={product.price + ' UAH'} />
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
                </Grid.Column>
            );
        })}
        </Grid>
    </Fragment>
)
}

export default observer(ProductsPage);

