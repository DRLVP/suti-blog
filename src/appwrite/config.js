import conf from "../conf/conf";
import { Databases, Storage, Query, Client, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Create post method
    async createPost({ title, content, featuredImage, status, userId }) {
        try {
            const newPost = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(), // Use ID.unique() to generate a unique ID
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status,
                }
            );

            return newPost;
        } catch (error) {
            throw error;
        }
    }

    // Update post method
    async updatePost($id, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                $id,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            throw error;
        }
    }

    // Delete post method
    async deletePost($id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                $id
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Get post method
    async getPost($id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                $id
            );
        } catch (error) {
            throw error;
        }
    }

    // Get all posts method
    async getAllPost() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status", "active")]
            );
        } catch (error) {
            throw error;
        }
    }

    // File upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    }

    // Delete file method
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // File preview method
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();

export default service;