import React from "react";

function Login() {
    return (
        <div className="relative flex flex-col min-h-screen justify-center items-center">
            <img src="https://placehold.co/350x350" alt="BCA" className="h-72 w-72"/>
            <h1>Login</h1>
            <p>Welcome</p>
            <div className="flex flex-col justify-center p-10 bg-gray-200 border-solid border-2 border-gray-300">
            <p className="mb-4 flex justify-center">Please log in</p>
            <form action="" className="flex flex-col gap-2">
                <label>
                    <input placeholder="Username" type="text" />
                </label>
                <label>
                    <input placeholder="Password" type="password" />
                </label>
                <button type="submit">Login</button>
            </form>
            </div>
        </div>
    );
}

export default Login;