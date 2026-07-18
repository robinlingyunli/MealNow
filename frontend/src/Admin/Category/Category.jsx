import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryAction } from '../../State/Customers/Restaurant/restaurant.action';
import {
  Box, Button, Card, CardHeader, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, IconButton, Modal, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { Create } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateCategory from './CreateCategory';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Category = () => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  const [openCreateCategory, setOpenCreateCategory] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const handleDelete = async (categoryId) => {
    const result = await dispatch(deleteCategoryAction({ categoryId, jwt: auth.jwt || jwt }));
    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  return (
    <div>
      <Card className="mt-1">
        <CardHeader
          title="Categories"
          sx={{ pt: 2, alignItems: "center", "& .MuiCardHeader-action": { mt: 0.6 } }}
          action={<IconButton onClick={() => setOpenCreateCategory(true)}><Create /></IconButton>}
        />
        <TableContainer>
          <Table aria-label="categories table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((item) => (
                <TableRow hover key={item.id} sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal open={openCreateCategory} onClose={() => setOpenCreateCategory(false)}>
        <Box sx={style}>
          <CreateCategory handleClose={() => setOpenCreateCategory(false)} />
        </Box>
      </Modal>

      <Dialog open={!!errorMsg} onClose={() => setErrorMsg(null)}>
        <DialogTitle>Cannot Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorMsg(null)} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Category;
