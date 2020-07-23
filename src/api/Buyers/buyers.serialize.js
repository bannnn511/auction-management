import * as _ from 'lodash';
import { UserStatus, UserType } from '../../shared/helpers/constant';

export function serializeBuyers(buyer, showPassword) {
  const data = {
    id: _.get(buyer, 'id', ''),
    email: _.get(buyer, 'email', ''),
    type: _.get(buyer, 'type', UserType.BUYER),
    status: _.get(buyer, 'status', UserStatus.ACTIVE),
    address: _.get(buyer, 'address', ''),
    fullname: _.get(buyer, 'fullname', ''),
    isSeller: _.get(buyer, 'isSeller', 0),
    plusPoint: _.get(buyer, 'plusPoint', 0),
    minusPoint: _.get(buyer, 'minusPoint', 0),
    createdBy: _.get(buyer, 'createdBy', ''),
    updatedBy: _.get(buyer, 'updatedBy', ''),
  };
  if (showPassword) {
    data.password = _.get(buyer, 'password', '');
  }
  return data;
}

export function serializeAllBuyers(buyers) {
  const data = [];
  buyers.forEach((buyer) => {
    data.push(serializeBuyers(buyer));
  });
  return data;
}
