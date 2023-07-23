import { describe, it } from "mocha";
import assert from "power-assert";
import config from "../src/config";
import Stroke from "../src/Stroke"

config.width = 320
config.height = 240

describe("Stroke", function(){
	it("handles span merging", function()
	{
        const stroke = new Stroke()

		stroke.insert(10,0,20)

		assert.deepEqual(stroke.spanLines[0], [10,20])

		stroke.insert(5,0,15)
		assert.deepEqual(stroke.spanLines[0], [5,20])

		stroke.insert(15,0,25)
		assert.deepEqual(stroke.spanLines[0], [5,25])

		stroke.insert(30,0,40)
		assert.deepEqual(stroke.spanLines[0], [5,25,30,40])

		stroke.insert(50,0,60)
		assert.deepEqual(stroke.spanLines[0], [5,25,30,40, 50, 60])

		stroke.insert(28,0,80)
		assert.deepEqual(stroke.spanLines[0], [5,25,28,80])

		stroke.insert(1,0,3)
		assert.deepEqual(stroke.spanLines[0], [1, 3, 5,25,28,80])

	});
});
