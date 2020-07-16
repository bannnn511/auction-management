module.exports = {
  serializeBuyers(doc) {
    return {
      id: doc.id,
      email: doc.email,
      type: doc.type,
      status: doc.status,
      address: doc.address,
      fullname: doc.fullname,
      isSeller: doc.isSeller,
      plusPoint: doc.plusPoint,
      minusPoint: doc.minusPoint,
    };
  },
};
