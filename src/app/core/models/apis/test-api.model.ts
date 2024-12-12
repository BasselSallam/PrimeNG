import { TestData } from "../test.model";
import { BaseAPIResponse } from "./api-mock.model";

export interface TestAPI extends BaseAPIResponse {
    data: TestData;
}
