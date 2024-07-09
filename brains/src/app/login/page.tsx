// login/page.tsx
// Component for login page
// Auteurs : Paul Agudze, Thomas Garneau

import React from 'react';
import LoginComponent from '../ui/login';
import {SessionProvider} from "next-auth/react";

const Login: React.FC = () => {
    return (
        <LoginComponent />
    );
};

export default Login;