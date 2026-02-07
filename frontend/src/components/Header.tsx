import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  return (
    <AppBar
      sx={{
        bgcolor: "transparent",
        position: "static",
        boxShadow: "none",
        // 1. Ensure Header stays ON TOP of the Home page
        zIndex: 50, 
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* 2. Logo Wrapper: Invert colors if needed to make it black */}
        <Box sx={{ 
          filter: "invert(1)", // Makes white logo black. Remove this line if your Logo is already black.
          display: "flex", 
          alignItems: "center" 
        }}>
          <Logo />
        </Box>

        <div>
          <SignedIn>
            <NavigationLink
              bg="#000" // Black button
              to="/chat"
              text="Go To Chat"
              textColor="white" 
            />
            
            <div style={{ display: "inline-block", marginLeft: "15px", verticalAlign: "middle" }}>
               <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <NavigationLink
              bg="#000" // Black button
              to="/login"
              text="Login"
              textColor="white"
            />
            <NavigationLink
              bg="#fff"
              textColor="black"
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