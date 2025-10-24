"use server";

import { connectDB } from "@/lib/db";
import mongoose, { Types } from "mongoose";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    return { success: false, message: "No file provided" };
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const { gfs } = await connectDB();
  const uploadStream = gfs.openUploadStream(file.name, {
    contentType: file.type,
  });

  uploadStream.end(buffer);

  return { success: true, filename: file.name };
}

export async function deleteFileAction(fileId: string) {
  try {
    const { gfs } = await connectDB();

    // Ensure valid ObjectId
    const objectId = new Types.ObjectId(fileId);

    await gfs.delete(objectId);

    return { success: true };
  } catch (err) {
    console.error("Delete error:", err);
    return { success: false, error: "Failed to delete file" };
  }
}

export async function deleteFileByNameAction(filename: string) {
  try {
    const { gfs } = await connectDB();

    // Find file metadata by filename
    const filesCollection = mongoose.connection.db?.collection("uploads.files");
    const fileDoc = filesCollection
      ? await filesCollection.findOne({
          filename,
        })
      : null;

    if (!fileDoc?._id) {
      return { success: false, error: "File not found" };
    }

    // Delete file by _id
    await gfs.delete(fileDoc._id);

    return { success: true };
  } catch (err) {
    console.error("Delete error:", err);
    return { success: false, error: "Failed to delete file" };
  }
}
