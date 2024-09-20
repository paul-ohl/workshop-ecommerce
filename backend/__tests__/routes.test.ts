import request from "supertest";
import app from "../src/app";
import { seedConfig } from "../src/services/config-seed";
import mongoose from "mongoose";

const MONGO_URI_TESTS = "mongodb://localhost:27017/test"

const connectToDatabase = async () => {
	try {
		await mongoose.connect(MONGO_URI_TESTS);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB", error);
		process.exit(1);  // Quitte l'application si la connexion échoue
	}
};

beforeAll(async () => {
	await connectToDatabase();
});

afterEach(async () => {
	await mongoose.connection.db?.dropDatabase();
});

afterAll(async () => {
	await mongoose.connection.close();
});

describe("Test app.ts", () => {
	test("health-check route", async () => {
		const res = await request(app).get("/health-check");
		expect(res.status).toBe(200);
		expect(res.text).toEqual("OK");
	});

	test("get config route", async () => {
		const res = await request(app).get("/config");
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("config");
		expect(JSON.stringify(res.body.config)).toBe("[]");

		await seedConfig();
		const seededRes = await request(app).get("/config");
		expect(seededRes.status).toBe(200);
		expect(seededRes.body.config[0]).toHaveProperty("colorsConfigs");
		expect(seededRes.body.config[0]).toHaveProperty("techConfigs");
	});

	test("post config route", async () => {
		const validConfig = {
			title: "Example Test",
			description: "TESTESTEST",
			refs: [{
				label: "TEST1",
				color: "#000000",
				pathToImg: "shell_000000.jpg",
				value: 0,
				isDefault: true,
			}, {
				label: "TEST2",
				color: "#0000FF",
				pathToImg: "shell_0000FF.jpg",
				value: 0,
				isDefault: false,
			}],
			isMultiSelection: false,
			isBase: false,
		};
		let res = await request(app).post("/config/colors").send(validConfig);
		expect(res.status).toBe(400);
		expect(res.body.error).toBe("Critical error: no config found");

		await seedConfig();
		res = await request(app).post("/config/colors").send(validConfig);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body.config.colorsConfigs)).toContain("Example Test");

		res = await request(app).post("/config/tech").send(validConfig);
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body.config.techConfigs)).toContain("Example Test");
	});

	test("post config route with invalid data", async () => {
		await seedConfig();

		let res = await request(app).post("/config/colors").send({
			description: "TESTESTEST",
			refs: [{
				label: "TEST1",
				color: "#000000",
				pathToImg: "shell_000000.jpg",
				value: 0,
				isDefault: true,
			}, {
				label: "TEST2",
				color: "#0000FF",
				pathToImg: "shell_0000FF.jpg",
				value: 0,
				isDefault: false,
			}],
			isMultiSelection: false,
			isBase: false,
		});
		expect(res.status).toBe(400);
		expect(res.body.error).toBe("Title is required");

		res = await request(app).post("/config/colors").send({
			title: "Example Test",
			description: "TESTESTEST",
			refs: [],
			isMultiSelection: false,
			isBase: false,
		});
		expect(res.status).toBe(400);
		expect(res.body.error).toBe("Refs is required");

		res = await request(app).post("/config/colors").send({
			title: "Example Test",
			description: "TESTESTEST",
			isMultiSelection: false,
			isBase: false,
		});
		expect(res.status).toBe(400);
		expect(res.body.error).toBe("Refs is required");

		res = await request(app).post("/config/colors").send({
			title: "Example Test",
			description: "TESTESTEST",
			refs: [{
				label: "TEST1",
				color: "#000000",
				pathToImg: "shell_000000.jpg",
				value: 0,
				isDefault: true,
			}],
			isBase: false,
		});
		expect(res.status).toBe(400);
		expect(res.body.error).toBe("IsMultiSelection is required");
	});

	test("patch config route", async () => {
		await seedConfig();
		// Find any element in the config
		const config = await request(app).get("/config");
		const id = config.body.config[0].colorsConfigs[0]._id;
		const oldTitle = config.body.config[0].colorsConfigs[0].title;
		let res = await request(app).patch(`/config/${id}`).send({
			title: "Example Test",
			description: "TESTESTEST",
			refs: [{
				label: "TEST1",
				color: "#000000",
				pathToImg: "shell_000000.jpg",
				value: 0,
				isDefault: true,
			}, {
				label: "TEST2",
				color: "#0000FF",
				pathToImg: "shell_0000FF.jpg",
				value: 0,
				isDefault: false,
			}],
			isMultiSelection: false,
			isBase: false,
		});
		expect(res.status).toBe(200);
		expect(JSON.stringify(res.body)).toContain("Example Test");
		expect(JSON.stringify(res.body)).not.toContain(oldTitle);
	});
});
