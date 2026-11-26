import path from "path";
import multer from "multer";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const upload = multer({ storage: multer.memoryStorage() });

const BUCKET_NAME = process.env.R2_BUCKET_NAME;

const streamToString = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf-8");
};

export const createFile = async (req, res) => {
  const { folder, fileName, content } = req.body;

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${folder}/${fileName}`,
    Body: JSON.stringify(content),
    ContentType: "application/json",
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    res.status(201).send({ message: "File created successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteFile = async (req, res) => {
  const { folder, fileName } = req.body;

  const params = {
    Bucket: BUCKET_NAME,
    Key: `${folder}/${fileName}`,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    res.status(200).send({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const updateFile = async (req, res) => {
    const { folder, fileName, content } = req.body;

    const params = {
        Bucket: BUCKET_NAME,
        Key: `${folder}/${fileName}`,
        Body: JSON.stringify(content),
        ContentType: "application/json",
    };

    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);
        res.status(200).send({ message: "File updated successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const readFile = async (req, res) => {
    const { folder, fileName } = req.query;

    const params = {
        Bucket: BUCKET_NAME,
        Key: `${folder}/${fileName}`,
    };

    try {
        const command = new GetObjectCommand(params);
        const data = await s3.send(command);
        const content = await streamToString(data.Body);
        res.status(200).send(JSON.parse(content));
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const listFiles = async (req, res) => {
    const { folder } = req.query;

    const params = {
        Bucket: BUCKET_NAME,
        Prefix: `${folder}/`,
    };

    try {
        const command = new ListObjectsV2Command(params);
        const data = await s3.send(command);

        const files = data.Contents?.map((item) => item.Key) || [];
        res.status(200).send(files);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const listAllFolders = async (req, res) => {
    const params = {
        Bucket: BUCKET_NAME,
        Delimiter: "/",
    };

    try {
        const command = new ListObjectsV2Command(params);
        const data = await s3.send(command);

        const folders =
            data.CommonPrefixes?.map((prefix) => prefix.Prefix) || [];
        res.status(200).send(folders);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const uploadFiles = async (req, res) => {
    const folder = req.body.folder || "uploads";
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).send({ message: "No files uploaded" });
    }

    try {
        const uploadPromises = files.map((file) => {
            const params = {
                Bucket: BUCKET_NAME,
                Key: `${folder}/${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            const command = new PutObjectCommand(params);
            return s3.send(command);
        });

        await Promise.all(uploadPromises);
        res.status(201).send({
            message: "Files uploaded successfully",
            fileNames: files.map((file) => file.originalname),
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};