import Chat from "../models/Chat.js";

//API Controller for creationg a new chat

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id; //getting rhe userId using middlewire

    const chatData = {
      //creating the chat data to store in the database
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };

    await Chat.create(chatData);
    res.json({
      success: true,
      message: "Chat Created",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API for getting all chats
export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;

    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });

    res.json({ success: true, chats });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API for deleting a chat
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id; //getting rhe userId using middlewire

    const { chatId } = req.body;
    await Chat.deleteOne({ _id: chatId, userId });
    res.json({ success: true, message: "Chat Deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
