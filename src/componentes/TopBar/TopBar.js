import style from "./TopBar.module.css";

export function TopBar({children}){
    return(
        <div>
            <div className={style.topbar_conteudo}>
            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}