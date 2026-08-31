import axios from "axios"
import { useContext, useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import type Postagem from "../../../models/Postagem"
import type Tema from "../../../models/Tema"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function FormPostagem() {
	const navigate = useNavigate()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	// Armazena todos os Temas
	const [temas, setTemas] = useState<Tema[]>([])

	// Recebe o tema associado a Postagem
	const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" })

	const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

	const { usuario, handleLogout, isLogout } = useContext(AuthContext)
	const token = usuario.token

	const { id } = useParams<{ id: string }>()

	async function buscarPostagemPorId(id: string) {
		try {
			await buscar(`/postagens/${id}`, setPostagem, {
				headers: { Authorization: token },
			})
		} catch (error) {
			if (axios.isAxiosError(error)) {
				ToastAlerta(`Erro ao buscar a postagem (${error.response?.status})`, 'erro')
				if (error.response?.status === 401) {
					handleLogout()
				}
			}
		}
	}

	async function buscarTemaPorId(id: string) {
		try {
			await buscar(`/temas/${id}`, setTema, {
				headers: { Authorization: token },
			})
		} catch (error) {
			if (axios.isAxiosError(error)) {
				ToastAlerta(`Erro ao buscar o tema (${error.response?.status})`, 'erro')
				if (error.response?.status === 401) {
					handleLogout()
				}
			}
		}
	}

	// Busca todos os Temas que serão inseridos no Select
	async function buscarTemas() {
		try {
			await buscar("/temas", setTemas, {
				headers: { Authorization: token },
			})
		} catch (error) {
			if (axios.isAxiosError(error)) {
				ToastAlerta(`Erro ao buscar os temas (${error.response?.status})`, 'erro')
				if (error.response?.status === 401) {
					handleLogout()
				}
			}
		}
	}

	useEffect(() => {
		if (token === "") {
			if (!isLogout) {
				ToastAlerta("Você precisa estar logado", 'info')
			}
			navigate("/")
		}
	}, [token, isLogout])

	// Atualização da Postagem
	// Busca a Postagem pelo ID e Recarrega os Temas no Select
	useEffect(() => {
		buscarTemas()

		if (id !== undefined) {
			buscarPostagemPorId(id)
		}
	}, [id])

	// Atualiza o Tema da Postagem
	useEffect(() => {
		setPostagem({
			...postagem,
			tema: tema,
		})
	}, [tema])

	useEffect(() => {
		if (id !== undefined && postagem.tema && tema.id === 0) {
			setTema(postagem.tema)
		}
	}, [postagem.tema])

	// Adiciona o Tema selecionado no Select e o Usuário autenticado (context)
	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setPostagem({
			...postagem,
			[e.target.name]: e.target.value,
			tema: tema,
			usuario: usuario,
		})
	}

	function retornar() {
		navigate("/postagens")
	}

	async function gerarNovaPostagem(e: SyntheticEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)

		if (id !== undefined) {
			try {
				await atualizar(`/postagens`, postagem, setPostagem, {
					headers: {
						Authorization: token,
					},
				})

				ToastAlerta("Postagem atualizada com sucesso", 'sucesso')
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout()
				} else {
					ToastAlerta("Erro ao atualizar a Postagem", 'erro')
				}
			}
		} else {
			try {
				await cadastrar(`/postagens`, postagem, setPostagem, {
					headers: {
						Authorization: token,
					},
				})

				ToastAlerta("Postagem cadastrada com sucesso", 'sucesso')
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout()
				} else {
					ToastAlerta("Erro ao cadastrar a Postagem", 'erro')
				}
			}
		}

		setIsLoading(false)
		retornar()
	}

	const carregandoTema = tema.descricao === ""

	console.log(JSON.stringify(postagem))
	console.log(JSON.stringify(tema))

	return (
		<div className="container flex flex-col mx-auto items-center">
			<h1 className="text-4xl text-center my-8">
				{id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
			</h1>

			<form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
				<div className="flex flex-col gap-2">
					<label htmlFor="titulo">Título da Postagem</label>
					<input
						type="text"
						placeholder="Titulo"
						name="titulo"
						required
						className="border-2 border-slate-700 rounded p-2"
						value={postagem.titulo}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="titulo">Texto da Postagem</label>
					<input
						type="text"
						placeholder="Texto"
						name="texto"
						required
						className="border-2 border-slate-700 rounded p-2"
						value={postagem.texto}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<p>Tema da Postagem</p>
					<select
						name="tema"
						id="tema"
						value={tema.id || ""}
						className="border p-2 border-slate-800 rounded"
						onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
					>
						<option value="" selected disabled>
							Selecione um Tema
						</option>

						{temas.map((tema) => (
							<>
								<option value={tema.id}>{tema.descricao}</option>
							</>
						))}
					</select>
				</div>
				<button
					type="submit"
					className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
					disabled={carregandoTema}
				>
					{isLoading ? (
						<ClipLoader color="#ffffff" size={24} />
					) : (
						<span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
					)}
				</button>
			</form>
		</div>
	)
}

export default FormPostagem