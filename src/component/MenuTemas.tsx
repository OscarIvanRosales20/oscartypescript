import { useTheme } from "../context/ThemeContext"


const MenuTemas = ()=>{
    const {themeMode, setThemeMode} = useTheme()
    return(
        <>
        <label>Modo de tema:</label>
        <select value={themeMode} onChange={(e) => setThemeMode(e.target.value as any)}>
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
            <option value="system">Sistema</option>
        </select>

        </>
    )
}

export default MenuTemas