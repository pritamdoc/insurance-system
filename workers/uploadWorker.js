const { parentPort, workerData } = require("worker_threads");
const xlsx = require("xlsx");
const fs = require("fs");
const mongoose = require("mongoose");
const connectDB = require("../config/db");

const User = require("../models/User");
const Policy = require("../models/Policy");
const Carrier = require("../models/Carrier");
const Category = require("../models/Category");
const Agent = require("../models/Agent");
const Account = require("../models/Account");

connectDB();

(async () => {
  try {
    const workbook = xlsx.readFile(workerData.filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (let row of data) {
      const user = await User.create({
        firstname: row.firstname,
        dob: row.dob,
        address: row.address,
        phone: row.phone,
        state: row.state,
        zip: row.zip,
        email: row.email,
        gender: row.gender,
        userType: row.userType,
        city: row.city,
        accountType: row.account_type,
      });

      const carrier = await Carrier.findOneAndUpdate(
        { companyName: row.company_name },
        { companyName: row.company_name },
        { upsert: true, new: true }
      );

      const category = await Category.findOneAndUpdate(
        { categoryName: row.category_name },
        { categoryName: row.category_name },
        { upsert: true, new: true }
      );

      const account = await Account.create({
        accountName: row.account_name,
        userId: user._id,
      });

      await Policy.create({
        policyNumber: row.policy_number,
        policyMode: row.policy_mode,
        premiumAmount: row.premium_amount,
        premiumAmountWritten: row.premium_amount_written,
        policyType: row.policy_type,
        startDate: row.policy_start_date,
        endDate: row.policy_end_date,
        producer: row.producer,
        csr: row.csr,
        primary: row.primary,
        applicantId: row["Applicant ID"],
        hasActiveClientPolicy: row.hasActiveClientPolicy,
        userId: user._id,
        carrierId: carrier._id,
        categoryId: category._id,
      });
    }

    parentPort.postMessage("Data upload completed");
  } catch (err) {
    parentPort.postMessage("Error: " + err.message);
  }
})();
