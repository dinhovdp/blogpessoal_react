import axios from "axios";
import { createContext, useRef, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

//  Definir os Estados e Funções disponibilizadas pela Context
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogin(usuario: UsuarioLogin): void
    handleLogout(): void
    isLoading: boolean
    isLogout: boolean

}

// Quem irá consumir a context
interface AuthProviderProps {
    children: ReactNode
}

// Criar o contexto usando a tipagem AuthContextProps
// O contexto irá disponibilizar os estados e as funções globalmente
export const AuthContext = createContext({} as AuthContextProps)

// INicializar o provedor AuthProvider
// O provedor irá implementar as funções e inicializar os estados

export function AuthProvider({ children }: AuthProviderProps) {

    // inicializar o estado usuario, que é do tipo UsuarioLogin
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: '',
    })
    // Inicializar o estado isLoading
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isLogout = useRef(false)

    // Implementar a função handleLogin
    async function handleLogin(usuarioLogin: UsuarioLogin) {

        setIsLoading(true);

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            ToastAlerta("Usuário Autenticado com sucesso!", "sucesso")

            isLogout.current = false

        } catch (error) {
            if (axios.isAxiosError(error)) {
                ToastAlerta(`Erro ao autenticar o usuário (${error.response?.status})`, "erro")
                return
            }
        } finally {
            setIsLoading(false)
        }

    }
    // Implementar a função handleLogout (desconectar o Usuario)
    function handleLogout() {

        isLogout.current = true

        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: '',
        })

        ToastAlerta('Usuario desconectado com sucesso!', 'sucesso');

    }
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading, isLogout: isLogout.current }}>
            {children}
        </AuthContext.Provider>
    )


}