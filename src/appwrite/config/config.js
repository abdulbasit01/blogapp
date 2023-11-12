import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../../conf/conf";

export class Service {
    client = new Client();
    database;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }
    async createPost(slug, { title, content, featuredimage, status, userId }) {
        // TODO: featuredImage <==> featuredimage due to the db key name issue 
        // console.log(slug, { title, content, featuredimage, status, userId });
        try {
            return this.database.createDocument(conf.appwriteDBId, conf.appwriteCollectionId, slug, { title, content, featuredimage, status, userId })
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            this.database.updateDocument(conf.appwriteDBId, conf.appwriteCollectionId, slug, { title, content, featuredImage, status, userId })
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async deletePost(slug) {
        try {
            await this.database.deleteDocument(conf.appwriteDBId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async getPost(slug) {
        try {
            return await this.database.getDocument(conf.appwriteDBId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async getPosts() {
        try {
            return await this.database.listDocuments(conf.appwriteDBId, conf.appwriteCollectionId, [Query.equal('status', 'active')])
        } catch (error) {
            console.log(error);
            return false
        }
    }
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log(error);
            return { error }
        }
    }
    async deleteFile(fileId) {
        try {
            this.client.bucket.deleteFile(conf.appwriteBucketId, fileId)
        } catch (error) {
            console.log(error);
            return false
        }
    }
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service();
export default service

