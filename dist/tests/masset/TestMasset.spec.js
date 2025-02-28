"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
const test_helpers_1 = require("@openzeppelin/test-helpers");
const constants_1 = require("@utils/constants");
const standardAccounts_1 = require("@utils/standardAccounts");
const env_setup_1 = __importDefault(require("@utils/env_setup"));
const { expect } = env_setup_1.default.configure();
const BasketManager = artifacts.require("BasketManager");
const Masset = artifacts.require("Masset");
const Token = artifacts.require("Token");
const MockERC20 = artifacts.require("MockERC20");
let standardAccounts;
contract("Masset", async (accounts) => {
    standardAccounts = new standardAccounts_1.StandardAccounts(accounts);
    before("before all", async () => { });
    describe("initialize", async () => {
        let masset;
        let basketManagerObj;
        let token;
        beforeEach(async () => {
            masset = await Masset.new();
            basketManagerObj = await createBasketManager(masset, [18, 18], [1, 1]);
            token = await createToken(masset);
        });
        context("should succeed", async () => {
            it("when given a valid basket manager", async () => {
                await masset.initialize(basketManagerObj.basketManager.address, token.address, false);
            });
        });
        context("should fail", async () => {
            it("when basket manager missing", async () => {
                await (0, test_helpers_1.expectRevert)(masset.initialize(constants_1.ZERO_ADDRESS, token.address, false), "VM Exception while processing transaction: reverted with reason string 'invalid basket manager'");
            });
            it("when token missing", async () => {
                await (0, test_helpers_1.expectRevert)(masset.initialize(basketManagerObj.basketManager.address, constants_1.ZERO_ADDRESS, false), "VM Exception while processing transaction: reverted with reason string 'invalid token'");
            });
            it("when already initialized", async () => {
                await masset.initialize(basketManagerObj.basketManager.address, token.address, false);
                await (0, test_helpers_1.expectRevert)(masset.initialize(basketManagerObj.basketManager.address, token.address, false), "VM Exception while processing transaction: reverted with reason string 'Initializable: contract is already initialized'");
            });
        });
    });
    describe("mint", async () => {
        let masset;
        let basketManagerObj;
        let token;
        let mockTokenDummy;
        beforeEach(async () => {
            masset = await Masset.new();
            token = await createToken(masset);
            basketManagerObj = await createBasketManager(masset, [18, 18], [1, 1]);
            await masset.initialize(basketManagerObj.basketManager.address, token.address, false);
            mockTokenDummy = await MockERC20.new("", "", 12, standardAccounts.dummy1, 1);
        });
        context("should succeed", () => {
            it("if all params are valid", async () => {
                const sum = "1000000000000000000";
                await basketManagerObj.mockToken1.approve(masset.address, sum, {
                    from: standardAccounts.dummy1,
                });
                const tx = await masset.mint(basketManagerObj.mockToken1.address, sum, {
                    from: standardAccounts.dummy1,
                });
                await (0, test_helpers_1.expectEvent)(tx.receipt, "Minted", {
                    minter: standardAccounts.dummy1,
                    recipient: standardAccounts.dummy1,
                    massetQuantity: sum,
                    bAsset: basketManagerObj.mockToken1.address,
                    bassetQuantity: sum,
                });
                const balance = await token.balanceOf(standardAccounts.dummy1);
                expect(balance.toString()).to.equal(`${sum}`);
            });
        });
        context("should fail", () => {
            it("if basset is invalid", async () => {
                await (0, test_helpers_1.expectRevert)(masset.mint(constants_1.ZERO_ADDRESS, 10), "VM Exception while processing transaction: reverted with reason string 'invalid basset'");
            });
            it("if basset is not in the basket", async () => {
                await (0, test_helpers_1.expectRevert)(masset.mint(mockTokenDummy.address, 10), "VM Exception while processing transaction: reverted with reason string 'invalid basset'");
            });
            it("if amount is greater than the balance", async () => {
                await basketManagerObj.mockToken1.approve(masset.address, 100000);
                await (0, test_helpers_1.expectRevert)(masset.mint(basketManagerObj.mockToken1.address, 100000), "VM Exception while processing transaction: reverted with reason string 'ERC20: transfer amount exceeds balance'");
            });
        });
    });
    describe("mintTo", async () => {
        let masset;
        let basketManagerObj;
        let token;
        beforeEach(async () => {
            masset = await Masset.new();
            basketManagerObj = await createBasketManager(masset, [18, 18], [1, 1]);
            token = await createToken(masset);
            await masset.initialize(basketManagerObj.basketManager.address, token.address, false);
        });
        context("should succeed", () => {
            it("if all params are valid", async () => {
                const sum = "100000000000000000";
                await basketManagerObj.mockToken1.approve(masset.address, sum, {
                    from: standardAccounts.dummy1,
                });
                const tx = await masset.mintTo(basketManagerObj.mockToken1.address, sum, standardAccounts.dummy4, {
                    from: standardAccounts.dummy1,
                });
                await (0, test_helpers_1.expectEvent)(tx.receipt, "Minted", {
                    minter: standardAccounts.dummy1,
                    recipient: standardAccounts.dummy4,
                    massetQuantity: sum,
                    bAsset: basketManagerObj.mockToken1.address,
                    bassetQuantity: sum,
                });
                const balance = await token.balanceOf(standardAccounts.dummy4);
                expect(balance.toString()).to.equal(`${sum}`);
            });
        });
    });
    describe("redeem", async () => {
        let masset;
        let basketManagerObj;
        let token;
        let mockTokenDummy;
        beforeEach(async () => {
            masset = await Masset.new();
            token = await createToken(masset);
            basketManagerObj = await createBasketManager(masset, [18, 18], [1, 1]);
            await masset.initialize(basketManagerObj.basketManager.address, token.address, false);
            mockTokenDummy = await MockERC20.new("", "", 12, standardAccounts.dummy1, 1);
        });
        context("should succeed", () => {
            it("if all params are valid", async () => {
                const sum = "100000000000000000";
                await basketManagerObj.mockToken1.approve(masset.address, sum, {
                    from: standardAccounts.dummy1,
                });
                await masset.mint(basketManagerObj.mockToken1.address, sum, {
                    from: standardAccounts.dummy1,
                });
                let balance = await token.balanceOf(standardAccounts.dummy1);
                expect(balance.toString()).to.equal(`${sum}`);
                balance = await basketManagerObj.mockToken1.balanceOf(standardAccounts.dummy1);
                expect(balance.toString()).to.equal("900000000000000000");
                const tx = await masset.redeem(basketManagerObj.mockToken1.address, sum, {
                    from: standardAccounts.dummy1,
                });
                await (0, test_helpers_1.expectEvent)(tx.receipt, "Redeemed", {
                    redeemer: standardAccounts.dummy1,
                    recipient: standardAccounts.dummy1,
                    massetQuantity: sum,
                    bAsset: basketManagerObj.mockToken1.address,
                    bassetQuantity: sum,
                });
                balance = await token.balanceOf(standardAccounts.dummy1);
                expect(balance.toString()).to.equal(`0`);
                balance = await basketManagerObj.mockToken1.balanceOf(standardAccounts.dummy1);
                expect(balance.toString()).to.equal("1000000000000000000"); // original sum
            });
        });
        context("should fail", () => {
            it("if basset is invalid", async () => {
                await (0, test_helpers_1.expectRevert)(masset.redeem(constants_1.ZERO_ADDRESS, 10), "VM Exception while processing transaction: reverted with reason string 'invalid basset'");
            });
            it("if basset is not in the basket", async () => {
                await (0, test_helpers_1.expectRevert)(masset.redeem(mockTokenDummy.address, 10), "VM Exception while processing transaction: reverted with reason string 'invalid basset'");
            });
            it("if amount is greater than the balance", async () => {
                await (0, test_helpers_1.expectRevert)(masset.redeem(basketManagerObj.mockToken1.address, 100000), "VM Exception while processing transaction: reverted with reason string 'ERC20: transfer amount exceeds balance'");
            });
        });
    });
    describe("precision conversion", async () => {
        let masset;
        let basketManagerObj;
        let token;
        beforeEach(async () => {
            masset = await Masset.new();
            token = await createToken(masset);
            basketManagerObj = await createBasketManager(masset, [20, 12], [100, -1000000]);
            await masset.initialize(basketManagerObj.basketManager.address, token.address, false);
        });
        it("works both ways", async () => {
            expect(await getBalance(basketManagerObj.mockToken1, standardAccounts.dummy1)).to.equal("100000000000000000000");
            expect(await getBalance(basketManagerObj.mockToken2, standardAccounts.dummy1)).to.equal("1000000000000");
            await basketManagerObj.mockToken1.approve(masset.address, "100000000000000000000", {
                from: standardAccounts.dummy1,
            });
            await masset.mint(basketManagerObj.mockToken1.address, "100000000000000000000", {
                from: standardAccounts.dummy1,
            });
            await basketManagerObj.mockToken2.approve(masset.address, "1000000000000", {
                from: standardAccounts.dummy1,
            });
            await masset.mint(basketManagerObj.mockToken2.address, "1000000000000", {
                from: standardAccounts.dummy1,
            });
            expect(await getBalance(token, standardAccounts.dummy1)).to.equal("2000000000000000000");
            expect(await getBalance(basketManagerObj.mockToken1, standardAccounts.dummy1)).to.equal("0");
            expect(await getBalance(basketManagerObj.mockToken2, standardAccounts.dummy1)).to.equal("0");
            await token.transfer(standardAccounts.dummy2, "1000000000000000000", {
                from: standardAccounts.dummy1,
            });
            expect(await getBalance(token, standardAccounts.dummy1)).to.equal("1000000000000000000");
            await masset.redeem(basketManagerObj.mockToken2.address, "1000000000000000000", {
                from: standardAccounts.dummy2,
            });
            expect(await getBalance(token, standardAccounts.dummy2)).to.equal("0");
            expect(await getBalance(basketManagerObj.mockToken2, standardAccounts.dummy2)).to.equal("1000000000000");
        });
    });
});
async function createBasketManager(masset, decimals, factors) {
    const mockToken1 = await MockERC20.new("", "", decimals[0], standardAccounts.dummy1, 1);
    const mockToken2 = await MockERC20.new("", "", decimals[1], standardAccounts.dummy1, 1);
    const bassets = [mockToken1.address, mockToken2.address];
    const bridges = [constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS];
    const basketManager = await BasketManager.new(bassets, factors, bridges);
    return {
        mockToken1,
        mockToken2,
        bassets,
        basketManager,
    };
}
async function createToken(masset) {
    const token = await Token.new("Mock1", "MK1", 18);
    token.transferOwnership(masset.address);
    return token;
}
async function getBalance(token, who) {
    return (await token.balanceOf(who)).toString(10);
}
//# sourceMappingURL=TestMasset.spec.js.map