import React, { useState } from "react";
import Auth from "./auth";
import Chat from "./Chat";

const App = () => {
    const [user, setUser] = useState(null);

    return user ? <Chat user={user} /> : <Auth setUser={setUser} />;
};

export default App;
