
import { useEffect, useState } from "react";
import { Sidebar } from "../../componentes/SideBar/Sidebar";
import { TopBar } from "../../componentes/TopBar/TopBar";
import style from "./NovoUsuario.module.css";
import { useNavigate } from "react-router-dom";
import UsuarioAPI from "../../services/usuarioAPI";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function NovoUsuario() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [tipoUsuarios, setTipoUsuarios] = useState([]);

    const navigate = useNavigate();

useEffect(() => {
    const fetchTiposUsuarios = async () => {
        try {
            const tipos = await UsuarioAPI.listarTiposUsuariosAsync();

            console.log(tipos);

            setTipoUsuarios(tipos);
        } catch (error) {
            console.log('Erro ao buscar tipos de usuários: ', error);
        }
    };

    fetchTiposUsuarios();
}, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            try {
                await UsuarioAPI.criarAsync(nome, email, senha, tipoUsuario);
                navigate("/usuarios");
            } catch (error) {
                console.log("Erro ao cadastrar usuário:", error);
            }
        } else {
            alert("Por favor preencha todos os campos.");
        }
    };

    const isFormValid = () => {
        return nome && email && senha && tipoUsuario;
    };

    return (
        <Sidebar>
            <TopBar>
                <div className={style.pagina_conteudo}>
                    <h3>Novo usuário</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formSenha" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTipoUsuario" className="mb-3">
                            <Form.Label>Tipo de usuário</Form.Label>

                            <Form.Select
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                                required
                            >
                                <option value="">
                                    Selecione o tipo de usuário
                                </option>

                                {tipoUsuarios.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>
                                        {tipo.nome}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={!isFormValid()}>
                            Salvar
                        </Button>
                    </Form>
                </div>
            </TopBar>
        </Sidebar>
    );
}
