import { Button, Typography } from "@mui/material";
import React from "react";
import { useSigninCheck } from "reactfire";
import CustomAppBar from "../components/CustomAppBar";
import CustomBodyLayout from "../components/CustomBodyLayout";

function NotFound() {
  const { data: signInCheckResult } = useSigninCheck();

  return (
    <div>
      <CustomAppBar />

      <CustomBodyLayout>
        <Typography variant="h1">Error 404</Typography>

        {!signInCheckResult?.signedIn ? (
          <Button variant="contained" href="/">
            Back home
          </Button>
        ) : (
          <Button variant="contained" href="/dashboard">
            Back home
          </Button>
        )}
      </CustomBodyLayout>
    </div>
  );
}

export default NotFound;
