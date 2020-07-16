import {
  getAllBuyers,
  createBuyer,
  deleteBuyer,
  requestToBeSeller,
  getRequestingBuyers,
  acceptBuyerReq,
  updateBuyerPassword,
} from './business/index';

module.exports = {
  // get buyer with status active
  async getAllBuyers(req, res, next) {
    try {
      const allBuyers = await getAllBuyers();
      res.status(200).json({ allBuyers });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  // register user as buyer
  async createBuyer(req, res, next) {
    try {
      const buyer = await createBuyer(req.body);
      res.status(200).json({ buyer });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  // update buyer status to deleted
  async deleteBuyer(req, res, next) {
    try {
      const buyer = await deleteBuyer(req.body);
      res.status(200).json({ buyer });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  // update buyer isSeller to true
  async requestToBeSeller(req, res, next) {
    try {
      const buyer = await requestToBeSeller(req.body);
      res.status(200).json({ buyer });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  // get buyer which isSeller is true
  async getRequestingBuyers(req, res, next) {
    try {
      const buyer = await getRequestingBuyers(req.body);
      res.status(200).json({ buyer });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  // update buyer type to seller
  async acceptBuyerReq(req, res, next) {
    try {
      const buyer = await acceptBuyerReq(req.body);
      res.status(200).json({ buyer });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },

  // update buyer password
  async updateBuyerPassword(req, res, next) {
    try {
      const buyer = await updateBuyerPassword(req.body);
      res.status(200).json({ buyer });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};
