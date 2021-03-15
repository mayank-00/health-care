import jobs from "api/jobs"
import jobsData from "data/jobs"
import mammothMock from "mocks/mammothSearchJobs"

describe("test jobs route", () => {

    let req, res;

    beforeEach(() => {
        req = {
            method: "GET",
            query: {
                search: ""
            }
        };
        res = {
            status: jest.fn(() => res),
            end: jest.fn(),
            json: jest.fn(),
        }
    })

    it("Should return 501 if the method is not GET", async () => {
        req.method = "POST";

        const response = await jobs(req, res);

        expect(res.status).toHaveBeenCalledWith(501);
        expect(res.end).toHaveBeenCalledTimes(1);
    });

    it("Should return jobsData if search Keyword is empty", async () => {

        const response = await jobs(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ jobs: jobsData }));
    })

    it("Should return 400 if search Keyword has malicious characters", async () => {

        req.query.search = "mammoth<"

        const response = await jobs(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.end).toHaveBeenCalledTimes(1);
    })

    it("should filter jobs if search keyword present", async () => {

        req.query.search = "mammoth"

        const response = await jobs(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ jobs: mammothMock }))
    })
});