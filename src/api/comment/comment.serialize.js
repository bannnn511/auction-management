exports.serializePost = (document) => {
  return {
    id: document.id,
    title: document.title,
  };
};
