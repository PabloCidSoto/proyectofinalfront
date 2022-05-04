import React, { useState, useEffect } from "react"
import { Container, Menu, Grid, Icon, Label, GridColumn} from "semantic-ui-react"
import Link from "next/link"
import BasicModal from "../../Modal/BasicModal/BasicModal"
import Auth from "../../Auth"
import useAuth from "../../../hooks/useAuth"
import { getMeApi } from "../../../api/user"

export default function MenuWeb() {

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
    
    }, [auth])
    

  return (
      <div className="menu">
        <Container>
            <Grid>
                <Grid.Column className="menu__left" width={6}>
                    <MenuPlatforms/>
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

function MenuPlatforms(){
    return(
        <Menu>
            <Link href="/anime">
                <Menu.Item as="a">
                    Anime
                </Menu.Item>                
            </Link>
            <Link href="/manga">
                <Menu.Item as="a">
                    Manga
                </Menu.Item>                
            </Link>
            <Link href="/videojuegos">
                <Menu.Item as="a">
                    Videojuegos
                </Menu.Item>                
            </Link>
            <Link href="/figuras">
                <Menu.Item as="a">
                    Figuras
                </Menu.Item>                
            </Link>
            <Link href="/cosplay">
                <Menu.Item as="a">
                    Cosplay
                </Menu.Item>                
            </Link>
        </Menu>
    )
}

function MenuOptions(props){
    const { onShowModal, user, logout } = props
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