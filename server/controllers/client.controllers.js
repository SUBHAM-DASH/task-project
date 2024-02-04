const { executeQuery, executeQueryWithParams } = require("../db");
const { v4: uuidv4 } = require("uuid");
const {
  insertClientQuery,
  updateClientQuery,
  searchClientDetailQuery,
  clientDetailsMonthWise,
  clientDetailsDesignationWise
} = require("../sql/client.sql");

// Add Client Details
exports.addClientDetails = async (req, res) => {
  try {
    const {
      name,
      designation,
      country,
      industry,
      emailId,
      phoneNumber,
      website,
      linkedin,
    } = req.body;

    const [existEmail] = await executeQueryWithParams(
      `SELECT * from "client" WHERE emailId = $1`,
      [emailId]
    );

    if (existEmail) {
      return res.status(409).json({
        status: "failed",
        message: "Email is already exists.please try with new mail.",
      });
    }
    const data = [
      uuidv4(),
      name,
      designation,
      country,
      industry,
      emailId,
      phoneNumber,
      website,
      linkedin,
    ];

    await executeQueryWithParams(insertClientQuery, data);
    res.status(201).json({ status: "success", message: "Client Created." });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "failed", message: "Internal server error." });
  }
};

// Edit Client Details
exports.editClientDetails = async (req, res) => {
  try {
    const {
      id,
      name,
      designation,
      country,
      industry,
      emailId,
      phoneNumber,
      website,
      linkedin,
    } = req.body;

    const data = [
      id,
      name,
      designation,
      country,
      industry,
      emailId,
      phoneNumber,
      website,
      linkedin,
    ];

    const [isAvailable] = await executeQueryWithParams(
      `SELECT * FROM "client" WHERE id = $1`,
      [id]
    );

    if (!isAvailable) {
      return res.status(404).json({
        status: "failed",
        message: "Sorry invalid credentials.please try again.",
      });
    }
    console.log("check 3");
    await executeQueryWithParams(updateClientQuery, data);
    console.log("check 4");
    res
      .status(200)
      .json({ status: "success", message: "Updated Successfully." });
  } catch (error) {
    console.log("error", error);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};

//Get Client Details
exports.getClientDetails = async (req, res) => {
  try {
    const clients = await executeQuery(`SELECT * FROM  "client"`);
    res.status(200).json({ status: "success", results: clients });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "failed", message: "Internal server error." });
  }
};

// Get Client By Id
exports.getClientDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const [isExistClient] = await executeQueryWithParams(
      `SELECT * FROM "client" WHERE id = $1`,
      [id]
    );
    if (!isExistClient) {
      return res.status(404).json({
        status: "failed",
        message: "Invalid credentials.please try again.",
      });
    }
    res.status(200).json({ status: "success", result: isExistClient });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "failed", message: "Internal server error." });
  }
};

// Delete Client Detail
exports.deleteClientDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const [isExistClient] = await executeQueryWithParams(
      `SELECT * FROM "client" WHERE id = $1`,
      [id]
    );
    if (!isExistClient) {
      return res.status(404).json({
        status: "failed",
        message: "Invalid credentials.please try again.",
      });
    }
    await executeQueryWithParams(`DELETE FROM "client" WHERE id = $1`, [id]);
    res
      .status(200)
      .json({ status: "success", message: "Deleted Successfuly." });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "failed", message: "Internal server error." });
  }
};

// Import Excel Sheet
exports.importExcelSheet = async (req, res) => {
  try {
    const { jsonData } = req.body;
    const afterParse = JSON.parse(jsonData);
    afterParse.forEach(async (element) => {
      await executeQueryWithParams(insertClientQuery, [uuidv4(), ...element]);
    });
    res
      .status(200)
      .json({ status: "success", message: "Imported Successfully." });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "failed", message: "Internal server error." });
  }
};

// Start Date and End Date
exports.dateRangeWisegettingData = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const clients = await executeQueryWithParams(
      `SELECT * FROM "client" WHERE created_at BETWEEN $1 AND $2`,
      [startDate, endDate]
    );
    res.status(200).json({ status: "success", clients });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "failed", message: "Internal server error." });
  }
};

// Delete multiple clients
exports.deleteMultipleClient = async (req, res) => {
  try {
    const { payload } = req.body;
    for (let i = 0; i < payload.length; i++) {
      const element = payload[i];
      await executeQueryWithParams(`DELETE FROM "client" WHERE id = $1`, [
        element,
      ]);
    }
    res
      .status(200)
      .json({ status: "success", message: "Deleted Successfully." });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "failed", message: "Internal server error." });
  }
};

// Filter Client Details
exports.filterDesignationClientDetails = async (req, res) => {
  try {
    const { designation } = req.body;
    const results = await executeQueryWithParams(
      `SELECT * FROM "client" WHERE designation = $1`,
      [designation]
    );
    res.status(200).json({ status: "success", results });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};
exports.searchClientInfo = async (req, res) => {
  try {
    const { searchval } = req.body;
    const results = await executeQueryWithParams(searchClientDetailQuery, [
      searchval,
      searchval,
      searchval,
      searchval,
    ]);
    res.status(200).json({ status: "success", results });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const results = await executeQuery(`SELECT * FROM "client"`);
    res.status(200).json({ status: "success", results });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};

exports.getClientsMonthWise = async (req, res) => {
  try {
    const results = await executeQuery(clientDetailsMonthWise);
    res.status(200).json({ status: "success", results });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};

exports.getGroupbyDesignationDetails = async (req, res) => {
  try {
    const results = await executeQuery(clientDetailsDesignationWise);
    res.status(200).json({ status: "success", results });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};
