export function serializeUser(doc) {
  return {
    id: doc.id,
    email: doc.email,
  };
}
