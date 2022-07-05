import { Route, Routes, BrowserRouter } from "react-router-dom"

import Home from "./components/Home"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}