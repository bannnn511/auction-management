import * as _ from 'lodash';
import { UserStatus, UserType } from '../../shared/helpers/constant';
import { safeParseInt } from '../../shared/helpers';

export function serializeBuyers(buyer, showPassword) {
  const data = {
    id: _.get(buyer, 'id', ''),
    email: _.get(buyer, 'email', ''),
    type: _.get(buyer, 'type', UserType.BUYER),
    status: _.get(buyer, 'status', UserStatus.ACTIVE),
    address: _.get(buyer, 'address', null),
    fullname: _.get(buyer, 'fullname', null),
    isSeller: _.get(buyer, 'isSeller', null),
    plusPoint: safeParseInt(_.get(buyer, 'plusPoint', 0)),
    minusPoint: safeParseInt(_.get(buyer, 'minusPoint', 0)),
    createdBy: _.get(buyer, 'createdBy', ''),
    updatedBy: _.get(buyer, 'updatedBy', ''),
  };
  if (showPassword) {
    data.password = _.get(buyer, 'password', null);
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
