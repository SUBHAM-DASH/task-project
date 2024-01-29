const express = require("express");
const router = express.Router();
const {
  addClientDetails,
  editClientDetails,
  getClientDetails,
  getClientDetailById,
  deleteClientDetail,
  importExcelSheet,
  dateRangeWisegettingData,
  deleteMultipleClient,
  filterDesignationClientDetails,
  searchClientInfo,
  getAllClients,
  getClientsMonthWise,
  getGroupbyDesignationDetails,
} = require("../controllers/client.controllers");
const { auth } = require("../middleware/auth");

// Add New Client Detail
router.post("/addClientDetails", auth, addClientDetails);
// Edit New Client Detail
router.put("/editClientDetails", auth, editClientDetails);
// Get Client Details
router.get("/getClientDetails", auth, getClientDetails);
// Get Client Detail By Id
router.get("/getClientDetailById/:id", auth, getClientDetailById);
// Delete Client Detail
router.delete("/deleteClientDetail/:id", auth, deleteClientDetail);
// import Excel Sheet
router.post("/importExcelSheet", auth, importExcelSheet);
// date range data
router.post("/dateRangeWisegettingData", auth, dateRangeWisegettingData);
// Delete Multiple Client
router.post("/deleteMultipleClient", auth, deleteMultipleClient);
// Filter By Designation
router.post(
  "/filterDesignationClientDetails",
  auth,
  filterDesignationClientDetails
);
// Search Client Information
router.post("/searchClientInfo", auth, searchClientInfo);
// No Of Clients
router.get("/getAllClients", auth, getAllClients);
// No of CLients Month Wise
router.get("/getClientsMonthWise", auth, getClientsMonthWise);
// No of clients By designation wise
router.get("/getGroupbyDesignationDetails", auth, getGroupbyDesignationDetails);

module.exports = router;
