import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
import Punks from "./views/punks";
import Punk from "./views/punk";
import MainLayout from "./layouts/main";

function App() {

    return (
        <MainLayout>
            < Routes >
                <Route path="/" element={<Home />} />
                <Route path="/punks" element={<Punks />} />
                <Route path="/punk/:tokenId" element={<Punk />} />
            </Routes >
        </MainLayout>

    );
}

export default App;