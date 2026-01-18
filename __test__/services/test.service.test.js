import request from 'supertest';
import app from '../../src/app.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Загальні хуки для всіх тестів
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri);
});

afterEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
    await mongo.stop();
  });

describe("Task API", () => {

    describe("Create Task", () => {
        it("should create a task", async () => {
            const response = await request(app)
            .post('/api/tasks')
            .send({
                author: "Test Author",
                title: "Test Title",
                description: "Test Description",
                status: "pending",
                picture: "Test Picture",
            })
            .expect(201);
            
            expect(response.body.author).toBe("Test Author");
            expect(response.body.title).toBe("Test Title");
            expect(response.body.description).toBe("Test Description");
            expect(response.body.status).toBe("pending");
            expect(response.body.picture).toBe("Test Picture");
            expect(response.body.id).toBeDefined();
        });
    });

    describe("Get All Tasks", () => {
        it("should get all tasks", async () => {
            const response = await request(app)
            .get('/api/tasks')
            .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe("Get One Task", () => {
        it("should get one task", async () => {
            const createResponse = await request(app)
            .post('/api/tasks')
            .send({
                author: "Get Test Author",
                title: "Get Test Title",
                description: "Get Test Description",
                status: "pending",
            })
            .expect(201);

            const taskId = createResponse.body.id;
            
            const response = await request(app)
            .get(`/api/tasks/${taskId}`)
            .expect(200);
            
            expect(response.body.id).toBe(taskId);
            expect(response.body.title).toBe("Get Test Title");
        });
    });

    describe("Update Task", () => {
        it("should update a task", async () => {
            const createResponse = await request(app)
            .post('/api/tasks')
            .send({
                author: "Update Test Author",
                title: "Original Title",
                description: "Update Test Description",
                status: "pending",
            })
            .expect(201);

            const taskId = createResponse.body.id;
            
            const response = await request(app)
            .put(`/api/tasks/${taskId}`)
            .send({
                title: "Updated Title",
            })
            .expect(200);
            
            expect(response.body.title).toBe("Updated Title");
            expect(response.body.id).toBe(taskId);
        });
    });

    describe("Delete Task", () => {
        it("should delete a task", async () => {
            const createResponse = await request(app)
            .post('/api/tasks')
            .send({
                author: "Delete Test Author",
                title: "Delete Test Title",
                description: "Delete Test Description",
                status: "pending",
            })
            .expect(201);

            const taskId = createResponse.body.id;
            
            const response = await request(app)
            .delete(`/api/tasks/${taskId}`)
            .expect(200);
            
            expect(response.body.id).toBe(taskId);
            
            await request(app)
            .get(`/api/tasks/${taskId}`)
            .expect(404);
        });
    });
});