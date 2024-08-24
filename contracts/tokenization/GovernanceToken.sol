// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract GovernanceToken is ERC20, ERC20Burnable, ERC20Votes, Ownable, Pausable {
    using SafeMath for uint256;

    // Staking mechanism
    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public lastClaimed;
    uint256 public rewardRate; // Reward rate per block

    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 reward);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) ERC20Votes() {}

    // Override required by ERC20Votes
    function _afterTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    // Override required by ERC20Votes
    function _mint(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._mint(account, amount);
    }

    // Override required by ERC20Votes
    function _burn(address account, uint256 amount) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }

    /**
     * @dev Allows users to stake tokens, accruing rewards over time.
     * @param amount The amount of tokens to stake
     */
    function stake(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _transfer(msg.sender, address(this), amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender].add(amount);
        lastClaimed[msg.sender] = block.number;

        emit Staked(msg.sender, amount);
    }

    /**
     * @dev Allows users to unstake tokens, redeeming their staked balance.
     * @param amount The amount of tokens to unstake
     */
    function unstake(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");
        require(stakingBalance[msg.sender] >= amount, "Insufficient staked balance");

        claimRewards(); // Claim any pending rewards before unstaking

        stakingBalance[msg.sender] = stakingBalance[msg.sender].sub(amount);
        _transfer(address(this), msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    /**
     * @dev Claims rewards for the user based on their staked balance.
     */
    function claimRewards() public whenNotPaused {
        uint256 reward = calculateRewards(msg.sender);
        require(reward > 0, "No rewards to claim");

        lastClaimed[msg.sender] = block.number;
        _mint(msg.sender, reward);

        emit RewardsClaimed(msg.sender, reward);
    }

    /**
     * @dev Calculates the rewards for a user based on their staked balance and time.
     * @param user The address of the user
     * @return The calculated reward amount
     */
    function calculateRewards(address user) public view returns (uint256) {
        uint256 stakedAmount = stakingBalance[user];
        uint256 blocksStaked = block.number.sub(lastClaimed[user]);
        uint256 reward = stakedAmount.mul(rewardRate).mul(blocksStaked).div(1e18);

        return reward;
    }

    /**
     * @dev Sets the reward rate for staking rewards.
     * @param _rewardRate The reward rate per block
     */
    function setRewardRate(uint256 _rewardRate) external onlyOwner {
        rewardRate = _rewardRate;
    }

    /**
     * @dev Pauses the contract in case of emergencies.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses the contract.
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
