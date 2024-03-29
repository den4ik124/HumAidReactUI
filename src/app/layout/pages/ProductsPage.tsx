import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Button, Container, Header, Card, Icon, Grid, Menu, Item, Rail, Segment, Sticky} from "semantic-ui-react";
import DeleteButton from "../../common/DeleteButton";
import EditButton from "../../common/EditButton";
import { Category } from "../../models/category";
import { Product } from "../../models/product";
import { useStore } from "../../stores/store";
import LoadingComponent from "../components/LoadingComponents";
import CreateNewProduct from "./Modals/CreateNewProduct";
import EditProductItem from "./Modals/EditProductItem";
import './sidebar.css';

function ProductsPage(){
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [shouldUpdate, setUpdateList] = useState(true);
    const [categoryName, setCategory] = useState<string>("All");
    
    const {userStore} = useStore();
    const {productStore} = useStore();
    const {categoryStore} = useStore();
    const {orderItemStore} = useStore();

    if(userStore.isLoggedIn){
        var user =  userStore.user;
    }

    useEffect(() => {
        productStore.getProducts(categoryName).then(() =>{
            setProducts(productStore.products);
        });
        categoryStore.getCategories().then(()=>{
            setCategories(categoryStore.categories);
        })
        setLoading(false);
        setUpdateList(false)
    }, [shouldUpdate])

function renderControllButtons(product : Product){

    if(user!.roles.includes('Manager') || user!.roles.includes('Admin')){
        return(
            <>
                <DeleteButton 
                    name={product.id} 
                    floated="right" 
                    onClick={() => handleRemove(product.id)}
                />
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

    function handleCategoryFilter(categoryName :string ){
            setCategory(categoryName);
            setUpdateList(true);
        };
    
return(
<Grid columns={1}>
    <Grid.Column>
        <Grid columns={4} relaxed stackable style={{marginTop: "3%"}}>
        {user!.roles.includes('Manager') || user!.roles.includes('Admin') ? (
        <>
            <Grid.Column>
                <CreateNewProduct 
                updateList={()=> setUpdateList(true)} 
                trigger={
                    <Card fluid 
                            positive 
                            compact
                            style={{marginBottom: "3%", height:"100%"}}>
                                <Button style={{height: "100%"}} >
                                    <Icon name="plus" size="huge" fitted/>
                                </Button>
                    </Card>
                }/>
            </Grid.Column>
        </>
        ) : null}

        {user!.roles.includes("Manager") && user!.roles.includes("Admin") ? (
        products.slice().sort((p1, p2) => p2.count - p1.count).map((product) => (
                CardRender(product)
        ))
        ) : (
            products.filter((product, index, array)=>(product.count !== 0)).slice().sort((p1, p2) => p2.count - p1.count).map((product) => (
                CardRender(product)
        )))}
        </Grid>

        <Rail position='left'>
        <Sticky offset={112} >
        <Segment textAlign="center">
            <Item.Group divided>
                {categories.map((category)=>(
                    <Grid columns={2}>
                        <Grid.Column width={10}>
                            <Menu.Item key={category.id} onClick = {() => handleCategoryFilter(category.name)}>
                                <Header size="large" content={category.name} />
                            </Menu.Item>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Header size="medium" content={"(5)"} />
                        </Grid.Column>
                    </Grid>
                ))}
            </Item.Group>
        </Segment>
        </Sticky>
        </Rail>     

    </Grid.Column>
</Grid>
)

    function CardRender(product: Product): JSX.Element {
        return <Grid.Column key={product.id}>
                    <Card
                        style={{ marginBottom: "3%", height: "100%" }}>

                        <Card.Content textAlign="left">
                            <Container
                                style={{
                                    height: "150px",
                                    backgroundImage: `url(${product.photoUrl})`,
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat"
                                }} />
                            <Card.Header>
                                <Header as={'h2'} content={product.title} />
                            </Card.Header>

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
                                onClick={(e) => handleProductBuying(e, product)}
                                disabled={product.count === 0} />
                            {renderControllButtons(product)}

                        </Card.Content>
                    </Card>
                </Grid.Column>;
    }
}

export default observer(ProductsPage);


