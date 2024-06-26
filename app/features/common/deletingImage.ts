import fs from "fs/promises";
import path from "path";

export const deleteExistingImage = async (imageName: string) => {
  const imagePath = path.join("public/uploads", imageName);
  try {
    await fs.unlink(imagePath);
  } catch (error) {
    console.error("Error deleting image: ", error);
  }
};
