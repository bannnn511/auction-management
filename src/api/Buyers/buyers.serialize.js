export function serializeBuyers(buyer) {
  return {
    id: buyer.id,
    email: buyer.email,
    type: buyer.type,
    status: buyer.status,
    address: buyer.address,
    fullname: buyer.fullname,
    isSeller: buyer.isSeller,
    plusPoint: buyer.plusPoint,
    minusPoint: buyer.minusPoint,
  };
}

export function serializedCreatedBuyer(buyer) {
  return {
    id: buyer.id,
    email: buyer.email,
    password: buyer.password,
    type: buyer.type,
    status: buyer.status,
    address: buyer.address,
    fullname: buyer.fullname,
    isSeller: buyer.isSeller,
    plusPoint: buyer.plusPoint,
    minusPoint: buyer.minusPoint,
    createdBy: buyer.currentUser.id,
    updatedBy: buyer.currentUser.id,
  };
}
