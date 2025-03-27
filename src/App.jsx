import { ThemeProvider } from "../src/context/theme";
import AllRoute from "./components/AllRoute";

function App() {
    return (
        <ThemeProvider storageKey="theme">
            <AllRoute />
        </ThemeProvider>
    );
}

export default App;
