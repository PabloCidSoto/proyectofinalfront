import React, { useState, useEffect } from "react"
import { Container, Menu, Grid, Icon, Label} from "semantic-ui-react"
import Link from "next/link"
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal/BasicModal"
import Auth from "../../Auth"
import useAuth from "../../../hooks/useAuth"
import useCart from "../../../hooks/useCart";
import { getMeApi } from "../../../api/user"
import { getCategoriesApi } from "../../../api/category"

export default function MenuWeb() {

    const [categories, setCategories] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("Iniciar Sesión")
    const [user, setUser] = useState(undefined)
    const { auth, logout } = useAuth();
    const onShowModal = () => setShowModal(true)
    const onCloseModal = () => setShowModal(false)

    useEffect(() => {
        (async () => {
            const response = await getMeApi(logout);
            setUser(response)
        })()
    
    }, [auth]);

    useEffect(() => {
        (async () => {
            const response = await getCategoriesApi();
            setCategories(response || []);
        })()
    
    }, [auth]);
    

  return (
      <div className="menu">
        <Container>
            <Grid>
                <Grid.Column className="menu__left" width={6}>
                    <MenuPlatforms categories={categories}/>
                </Grid.Column>
                <Grid.Column className="menu__right" width={10}>
                    {user !== undefined && <MenuOptions onShowModal={onShowModal} user={user} logout={logout}/>}                    
                     
                </Grid.Column>
            </Grid>
        </Container>
        <BasicModal show={showModal} setShow={setShowModal} title={titleModal} size="small">
            <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
        </BasicModal>

      </div>
  )
}

function MenuPlatforms(props){
    const { categories } = props;
    return(
        <Menu>
            {map(categories, (category)=>(
                <Link href={`/store/${category.url}`} key={category._id}>
                    <Menu.Item as="a" name={category.url}>
                      {category.category}
                    </Menu.Item> 
                </Link>
            ))}
        </Menu>
    )
}

function MenuOptions(props){
    const { onShowModal, user, logout } = props;
    const { productsCart } = useCart();
    return(
        <Menu>
            {user ? (
                <>
                    <Link href="/orders">
                        <Menu.Item as="a">
                            <Icon name="game"/>
                            Mis Pedidos
                        </Menu.Item>
                    </Link>
                    <Link href="/wishlist">
                        <Menu.Item as="a">
                            <Icon name="heart outline"/>
                            Wishlist
                        </Menu.Item>
                    </Link>
                    <Link href="/account">
                        <Menu.Item as="a">
                            <Icon name="user outline"/>
                            {user.name} {user.lastname}
                        </Menu.Item>
                    </Link>
                    <Link href="/cart">
                        <Menu.Item as="a" className="m-0">
                            <Icon name="cart"/>
                            {productsCart > 0 && (
                                <Label color="red" floating circular>
                                    {productsCart}
                                </Label>                
                            )}
                        </Menu.Item>
                    </Link>
                    <Menu.Item onClick={logout} className="m-0">
                        <Icon name="power off"/>
                    </Menu.Item>
                </>
            ):(
                <Menu.Item onClick={onShowModal}>
                    <Icon name="user outline"/>
                    Mi cuenta
                </Menu.Item>
            )}
        </Menu>
    )
}