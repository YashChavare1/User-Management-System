import { SignupForm } from "../Components/Signup Form/SignupForm";
import { UserList } from "../Components/UserList/UserList";
import "./Home.css";

export const Home = () => {
    const userToken = localStorage.getItem("token");

    return(
        <div className="homepage">
            { !userToken && <SignupForm />}
            <UserList />    
        </div>
    );
}
