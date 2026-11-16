import { Sidebar } from "../../componentes/SideBar/Sidebar"
import { TopBar } from "../../componentes/TopBar/TopBar"
import style from "./Home.module.css"

export function Home() {
    return (
        <div className={style.conteudo}>
            <Sidebar>
                <TopBar>
                    <div className={style.pagina_conteudo}>
                        <h3>Home</h3>
                    </div>
                </TopBar>
            </Sidebar>
        </div>
    )
}