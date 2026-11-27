import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../componentes/SideBar/Sidebar";
import { TopBar } from "../../componentes/TopBar/TopBar";
import style from "./EditarUsuario.module.css"
import { useEffect, useState } from "react";
import UsuarioAPI from "../../services/usuarioAPI";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/esm/Button"

export function EditarUsuario() {
    const location = useLocation();
    const navigate = useNavigate();

    const [id] = useState(location.state);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [tipoUsuarios, setTipoUsuarios] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            await UsuarioAPI.atualizarAsync(id, nome, email, tipoUsuario);
            navigate('/usuarios')
        } else {
            alert('Por favor, preencha todos os campos');
        }
    };

    useEffect(() => {
        const buscarTiposUsuarios = async () => {
            try {
                const tipos = await UsuarioAPI.listarTiposUsuariosAsync();
                setTipoUsuarios(tipos);
            } catch (error) {
                console.log('Erro ao buscar tipos de usuarios: ', error);
            }
        };

        const buscarDadosUsuario = async () => {
            try {
                const usuario = await UsuarioAPI.obterAsync(id);
                setTipoUsuario(String(usuario.tipo))
                setNome(usuario.nome)
                setEmail(usuario.email)
            } catch (error) {
                console.error('Erro ao buscar dados do usuario: ', error);
            }
        }

        buscarDadosUsuario();
        buscarTiposUsuarios();
    }, [])

    const isFormValid = () => {
        return nome && email && tipoUsuario;
    };

    return (
        <Sidebar>
            <TopBar>
                <div className={style.pagina_conteudo}>
                    <h3>Editar Usuário</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTipoUsuario" className="mb-3">
                            <Form.Label>Tipo de Usuário</Form.Label>
                            <Form.Control
                                as="select"
                                name="tipoUsuario"
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                                required
                            >

                                <option value="">Selecione o tipo de usuário</option>
                                {tipoUsuarios.map((tipo) => (
                                    <option key={tipo.id} value={String(tipo.id)}>
                                        {tipo.nome}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>



                        <Button variant="primary" type="submit" disabled={!isFormValid()}>
                            Salvar
                        </Button>
                    </Form>
                </div>
            </TopBar>
        </Sidebar>
    )
}