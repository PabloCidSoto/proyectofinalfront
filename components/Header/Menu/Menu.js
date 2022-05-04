import { useState } from "react"
import { Container, Menu, Grid, Icon, Label, GridColumn} from "semantic-ui-react"
import Link from "next/link"
import BasicModal from "../../Modal/BasicModal/BasicModal"
import Auth from "../../Auth"

export default function MenuWeb() {

    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState("Iniciar Sesión")
    const onShowModal = () => setShowModal(true)
    const onCloseModal = () => setShowModal(false)

  return (
      <div className="menu">
        <Container>
            <Grid>
                <Grid.Column className="menu__left" width={6}>
                    <MenuPlatforms/>
                </Grid.Column>
                <Grid.Column className="menu__right" width={10}>
                    <MenuOptions onShowModal={onShowModal}/>

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
    const { onShowModal } = props
    return(
        <Menu>
            <Menu.Item onClick={onShowModal}>
                <Icon name="user outline"/>
                Mi cuenta
            </Menu.Item>
        </Menu>
    )
}