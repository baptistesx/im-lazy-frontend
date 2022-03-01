import { LoadingButton } from "@mui/lab";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  FormControlLabel,
  TextField,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiUsers from "../../api/users";
import { useAuth } from "../../hooks/useAuth";
import useSnackbars from "../../hooks/useSnackbars";

function EditUserDialog(props) {
  const auth = useAuth();

  const { addAlert } = useSnackbars();

  const { onClose, open, user, ...other } = props;
  const [currentUser, setUser] = useState(user);
  // const radioGroupRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      setUser(user);
    }
  }, [user, open]);

  const handleEntering = () => {
    // if (radioGroupRef.current != null) {
    //   radioGroupRef.current.focus();
    // }
  };

  const handleSaveClick = async (data) => {
    setIsSaving(true);

    // If updating user
    if (currentUser?.id) {
      apiUsers.updateUserById(
        {
          id: currentUser.id,
          email: data.email,
          isAdmin: data.isAdmin,
          isPremium: data.isPremium,
          name: data.name,
        },
        () => {
          setIsSaving(false);

          onClose({ modified: true });

          addAlert({
            message: "User well updated",
            severity: "success",
          });
        }
      );
    } else {
      // If creating user
      apiUsers.createUser(
        {
          email: data.email,
          isAdmin: data.isAdmin,
          isPremium: data.isPremium,
          name: data.name,
        },
        () => {
          setIsSaving(false);

          onClose({ modified: true });

          addAlert({
            message: "User well created",
            severity: "success",
          });
        }
      );
    }
  };

  return (
    <Dialog
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <form onSubmit={handleSubmit(handleSaveClick)}>
        <DialogTitle>
          {/* <Typography variant="h3"> */}
          {currentUser?.id ? "Edit" : "Create"} user
          {/* </Typography> */}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            fullWidth
            placeholder="Name"
            {...register("name")}
            required
            sx={{ m: 1 }}
            defaultValue={currentUser?.name}
          />
          <TextField
            fullWidth
            placeholder="Email"
            {...register("email")}
            required
            sx={{ m: 1 }}
            defaultValue={currentUser?.email}
          />
          <FormControlLabel
            disabled={auth.user?.isAdmin && currentUser.id === auth.user.id}
            control={<Checkbox defaultChecked={currentUser?.isAdmin} />}
            label="Is Admin"
            {...register("isAdmin")}
            sx={{ m: 1 }}
            value
          />
          <FormControlLabel
            control={<Checkbox defaultChecked={currentUser?.isPremium} />}
            label="Is premium"
            {...register("isPremium")}
            sx={{ m: 1 }}
            value
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose({ modified: false })}>Cancel</Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSaving}
            sx={{
              m: 1,
            }}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditUserDialog;

EditUserDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};
