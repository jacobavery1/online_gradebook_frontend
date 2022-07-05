import { Route, Routes, BrowserRouter } from "react-router-dom"

import Home from "./components/Home"
import Individual from './components/Individual'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Individual />} />
            </Routes>
        </BrowserRouter>
    )
}