import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalAddOffer from "./Modals/ModalAddOffer";
import ModalEditOffer from "./Modals/ModalEditOffer";
import ModalDeleteOffer from "./Modals/ModalDeleteOffer";
import OfferService from "../../../services/Offre.service";
import { toast } from "react-hot-toast";

const OfferListScreen = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [addOfferModalOpen, setAddOfferModalOpen] = useState(false);
  const [editOfferModalOpen, setEditOfferModalOpen] = useState(false);
  const [deleteOfferModalOpen, setDeleteOfferModalOpen] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = () => {
    OfferService.GetAllOffersByOwner(
      (res) => {
        setOffers(res);
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  const handleAddOfferModalOpen = () => {
    setAddOfferModalOpen(true);
  };

  const handleAddOfferModalClose = () => {
    setAddOfferModalOpen(false);
    fetchOffers();

  };

  const handleEditOfferModalOpen = (offer) => {
    setSelectedOffer(offer);
    setEditOfferModalOpen(true);
  };

  const handleEditOfferModalClose = () => {
    setSelectedOffer(null);
    setEditOfferModalOpen(false);
    fetchOffers();

  };

  const handleDeleteOfferModalOpen = (offer) => {
    setSelectedOffer(offer);
    setDeleteOfferModalOpen(true);
  };

  const handleDeleteOfferModalClose = () => {
    setSelectedOffer(null);
    setDeleteOfferModalOpen(false);
    fetchOffers();
  };

  const handleAddOffer = (offerData) => {
    OfferService.createOffreService(offerData)
      .then((response) => {
        toast.success("Offre créée avec succès.");
        fetchOffers();
        handleAddOfferModalClose();
      })
      .catch((error) => {
        toast.error("Échec de la création de l'offre.");
      });
  };

  const handleEditOffer = (offerData) => {
    fetchOffers();
    handleEditOfferModalClose();

  };

  const handleDeleteOffer = () => {
    fetchOffers();
    handleDeleteOfferModalClose();

  };

  return (
    <div>
      <Typography variant="h5" component="h5" gutterBottom>
        Mes Offres
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineOutlinedIcon />}
        onClick={handleAddOfferModalOpen}
      >
        Ajouter une Offre
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Emplacement</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell>{offer.offerName}</TableCell>
              <TableCell>{offer.offerType}</TableCell>
              <TableCell>{offer.description}</TableCell>
              <TableCell>{offer.location}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleEditOfferModalOpen(offer)}
                  color="primary"
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteOfferModalOpen(offer)}
                  color="secondary"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalAddOffer
        open={addOfferModalOpen}
        handleClose={handleAddOfferModalClose}
        handleAddOffer={handleAddOffer}
      />

      {selectedOffer && (
        <ModalEditOffer
          open={editOfferModalOpen}
          handleClose={handleEditOfferModalClose}
          handleEditOffer={handleEditOffer}
          offer={selectedOffer}
        />
      )}

      <ModalDeleteOffer
        open={deleteOfferModalOpen}
        handleClose={handleDeleteOfferModalClose}
        handleDeleteOffer={handleDeleteOffer}
        offer={selectedOffer}
      />
    </div>
  );
};

export default OfferListScreen;
