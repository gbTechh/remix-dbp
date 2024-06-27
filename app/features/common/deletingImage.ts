import fs from "fs/promises";
import path from "path";

export const deleteExistingImage = async (imageName: string, pathFile = 'public/uploads') => {
  const imagePath = path.join(`${pathFile}`, imageName);
  try {
    await fs.unlink(imagePath);
  } catch (error) {
    console.error("Error deleting image: ", error);
  }
};
