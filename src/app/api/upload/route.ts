import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { writeFile } from "fs/promises";

cloudinary.config({
  cloud_name: "dvow7hj3z",
  api_key: "418218761311566",
  api_secret: "npu1jDcnTurBN-27jnSxpCdiHW0",
});

export async function upload(request) {
  const data = await request.formData();
  const image = data.get("image");

  if (!image) {
    return NextResponse.json("No Image", {
      status: 400,
    });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", image.name);
  await writeFile(filePath, buffer);
  await cloudinary.uploader.upload(filePath);
  return NextResponse.json("Image has been uploaded");
}

// const upload = async () => {
//   const preset_key = "g2vxs5jy";
//   const cloud_name = "dvow7hj3z";
//   const data = new FormData();
//   data.append("file", file!);
//   data.append("upload_preset", preset_key);

//   const res = await fetch(
//     `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "multipart/form-data",
//         "Access-Control-Allow-Origin": "http://localhost:3000",
//       },
//       body: data,
//     }
//   );

//   const resData = await res.json();
//   console.log(resData);
//   return resData.url;
// };
