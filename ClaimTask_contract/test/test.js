const { expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Test Contract", function () {
  let Test, test, MockToken, mockToken;
  let owner, addr1, addr2, addr3, addr4;
  let nonWhitelist1;

  before(async function () {
    MockToken = await ethers.getContractFactory("MockToken");
    Test = await ethers.getContractFactory("Test");
  });

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, addr4, nonWhitelist1] = await ethers.getSigners();
    mockToken = await MockToken.deploy();
    await mockToken.deployed();
    test = await Test.deploy(mockToken.address, [owner.address, addr1.address, addr2.address, addr3.address, addr4.address]);
    await test.deployed();
    await mockToken.connect(owner).approve(test.address, parseEther('100000000000000'));
  });

  describe("Deployments", function () {
    it("Should deposit for Owner", async function () {
      await expect(test.connect(nonWhitelist1).deposit(parseEther('100'))).to.be.revertedWith("Caller is not owner");
    });
    
    it("Amount Should greater than 0", async function () {
      await expect(test.connect(owner).deposit(parseEther('0'))).to.be.revertedWith("Infficient Amount");
    });
    
    it("Only Whitelist", async function () {
      await expect(test.connect(nonWhitelist1).claim(parseEther('100'))).to.be.revertedWith("Caller is not whitelisted");
    });
    
    it("MaxAmount", async function () {
      await expect(test.connect(owner).claim(parseEther('200000000'))).to.be.revertedWith("Infficient MaxValue");
    });
    
    it("Should be able to claim", async function () {
      const allowance = await mockToken.balanceOf(owner.address);
      await test.connect(owner).deposit(parseEther('100'))
      expect(await mockToken.balanceOf(owner.address)).to.equal(allowance.sub(parseEther('100')));

      await test.connect(addr1).claim(parseEther('20'));
      expect(await mockToken.balanceOf(test.address)).to.equal(parseEther('100').sub(parseEther('20')));
    });
  });
});
