export function sequelizeUser(doc) {
  return {
    id: doc.id,
    email: doc.email,
  };
}
