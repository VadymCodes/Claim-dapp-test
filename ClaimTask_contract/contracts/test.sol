// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Test is ReentrancyGuard {
    using SafeMath for uint256;
    using Address for address;
    mapping(address => bool) public whitelist;
    mapping(address => uint256) public TokenPerWallet;
    address owner;
    IERC20 token;
    event Claim(address indexed account, uint256 amount);

    constructor(address tokenAddress, address[5] memory _whitelists) {
        owner = msg.sender;
        token = IERC20(tokenAddress);
        uint8 index = 0;
        uint256 maxAva = 20000000 * 1e18;//set available amount for each whitelist member
        for (; index < 5; index ++ ) {
            address indexAddr = address(_whitelists[index]);
            whitelist[indexAddr] = true;
            TokenPerWallet[indexAddr] = maxAva;
        }
    }

    function claim(uint256 amount) external {
        uint256 curAmt = TokenPerWallet[msg.sender];
        require(whitelist[msg.sender], "Caller is not whitelisted");
        require(curAmt >= amount, "Infficient MaxValue");
        token.transfer(msg.sender, amount);
        TokenPerWallet[msg.sender] = (curAmt - amount);
        assert(curAmt == TokenPerWallet[msg.sender] + amount);
        emit Claim(msg.sender, amount);
    }

    function deposit(uint256 amount) external {
        require(msg.sender == owner, "Caller is not owner");
        require(amount > 0, "Infficient Amount");
        token.transferFrom(msg.sender, address(this), amount);
    }
}
