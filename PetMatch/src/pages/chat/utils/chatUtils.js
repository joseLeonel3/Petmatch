export const generateChatId = (user1, user2, petId) => {
  return [user1, user2].sort().join("_") + "_" + petId;
};