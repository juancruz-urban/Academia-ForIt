

import type React from "react"
import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "../styles/Register.css"

export const Register: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      })

      if (!response.ok) {
        throw new Error("Credenciales incorrectas")
      }

      const user = await response.json()
      login(user)
      navigate("/")
    } catch (error) {
      console.error("Error al registrarse:", error)
      alert("Error en el registro. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <div className="register-header">
          <h1 className="register-title">Crear Cuenta</h1>
          <p className="register-subtitle">Únete a nuestra comunidad</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-input-group">
            <label htmlFor="username" className="register-label">
              Nombre completo
            </label>
            <input
              id="username"
              type="text"
              className="register-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="email" className="register-label">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              className="register-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="password" className="register-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <button
            type="submit"
            className={`register-submit-button ${isLoading ? "register-loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Crear cuenta"}
          </button>
        </form>

        <div className="register-footer">
          <p className="register-footer-text">
            ¿Ya tienes una cuenta?{" "}
            <button type="button" onClick={() => navigate("/login")} className="register-link-button">
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
