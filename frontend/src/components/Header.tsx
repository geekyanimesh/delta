import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavigationLink from "./shared/NavigationLink";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link for hyperlinking

const Header = () => {
  return (
    <AppBar
      sx={{
        bgcolor: "#000000",
        position: "static",
        boxShadow: "none",
        height: "70px", 
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          minHeight: "70px !important",
          px: "20px" 
        }}
      >
        {/* LOGO: Wrapped in a Link to make it a hyperlink to the homepage */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img 
              src="/detlaLogo.png" 
              alt="Delta" 
              style={{ 
                height: "150px", 
                width: "auto",
                filter: "invert(1)", // Ensures visibility on black header
                display: "block",
                cursor: "pointer"
              }} 
            />
          </Link>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <SignedIn>
            <NavigationLink
              bg="#ffffff"
              to="/chat"
              text="Go To Chat"
              textColor="black"
            />
            <div style={{ display: "inline-block", marginLeft: "15px", verticalAlign: "middle" }}>
               <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <NavigationLink
              bg="#ffffff"
              to="/login"
              text="Login"
              textColor="black"
            />
            <NavigationLink
              bg="#ffffff"
              to="/signup"
              text="Signup"
              textColor="black"
            />
          </SignedOut>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;