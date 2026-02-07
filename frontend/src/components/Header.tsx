import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {/* 1. Show this block if Logged In */}
          <SignedIn>
            <NavigationLink
              bg="#00fffc"
              to="/chat"
              text="Go To Chat"
              textColor="black"
            />
            
            {/* Standard Clerk User Button (Avatar)
               Includes: Profile Management, Security Settings, and Logout 
            */}
            <div style={{ display: "inline-block", marginLeft: "15px", verticalAlign: "middle" }}>
               <UserButton afterSignOutUrl="/" />
            </div>

            {/* (Optional) Your Custom Logout Button
               If you prefer this text button over the Avatar above, you can keep it.
               Otherwise, you can delete this NavigationLink.
            */}
            {/* <NavigationLink
              bg="#51538f"
              textColor="white"
              to="/"
              text="logout"
              onClick={() => signOut({ redirectUrl: '/' })}
            /> 
            */}
          </SignedIn>

          {/* 2. Show this block if Logged Out */}
          <SignedOut>
            <NavigationLink
              bg="rgb(255, 255, 255)"
              to="/login"
              text="Login"
              textColor="black"
            />
            <NavigationLink
              bg="#51538f"
              textColor="white"
              to="/signup"
              text="Signup"
            />
          </SignedOut>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;