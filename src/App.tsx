import './App.css';
import {Header} from "./layout/header/Header";
import {Navbar} from "./layout/navbar/Navbar";
import {Profile} from "./layout/profile/Profile";
import {Route, Routes} from "react-router-dom";
import {Settings} from "./layout/settings/Settings";
import {DialogsContainer} from "./layout/dialogs/DialogsContainer";
import {Users} from "./layout/users/Users";
import {News} from "./layout/News/News";
import {Music} from "./layout/Music/Music";
import {Login} from "./Login.tsx";

function App() {
    return (
        <div className={'container'}>
            <div className={'app-wrapper'}>
                <Header/>
                <Navbar/>
                <main className="main">
                    <Routes>
                        <Route path={'/'} element={<Profile/>}/>
                        <Route path={'/profile'} element={<Profile/>}>
                            <Route path={'/profile/:id'} element={<Profile/>}/>
                        </Route>
                        <Route path={'/dialogs/*'} element={<DialogsContainer/>}/>
                        <Route path={'/users'} element={<Users/>}/>
                        <Route path={'/news'} element={<News/>}/>
                        <Route path={'/music'} element={<Music/>}/>
                        <Route path={'/settings'} element={<Settings/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;
