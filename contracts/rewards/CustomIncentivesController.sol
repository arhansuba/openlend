// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/rewards/RewardsController.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomIncentivesController is RewardsController, Ownable {
    IPool public pool;
    IERC20 public rewardToken;

    // Isolated Lending Pool Reward Distribution Configuration
    struct IsolatedPoolRewards {
        uint256 totalRewards; // Total rewards allocated for the isolated pool
        uint256 rewardRate;   // Rate of rewards distribution per block
        uint256 lastUpdated;  // Last time rewards were distributed
        uint256 accumulatedRewardsPerToken; // Accumulated rewards per collateral token
    }

    mapping(bytes32 => IsolatedPoolRewards) public poolRewards; // Pool ID to reward configuration
    mapping(bytes32 => mapping(address => uint256)) public userRewards; // Pool ID to user rewards

    // Events to track reward updates and claims
    event RewardsAllocated(bytes32 indexed poolId, uint256 totalRewards, uint256 rewardRate);
    event RewardClaimed(address indexed user, bytes32 indexed poolId, uint256 rewardAmount);

    constructor(address _rewardToken, address _pool) {
        rewardToken = IERC20(_rewardToken);
        pool = IPool(_pool);
    }

    /**
     * @dev Allocates rewards to a specific isolated lending pool.
     * @param poolId The ID of the isolated pool
     * @param totalRewards The total rewards allocated for this pool
     * @param rewardRate The rate of reward distribution per block
     */
    function allocateRewards(bytes32 poolId, uint256 totalRewards, uint256 rewardRate) external onlyOwner {
        IsolatedPoolRewards storage poolRewardData = poolRewards[poolId];
        require(poolRewardData.totalRewards == 0, "Rewards already allocated");

        poolRewardData.totalRewards = totalRewards;
        poolRewardData.rewardRate = rewardRate;
        poolRewardData.lastUpdated = block.number;
        poolRewardData.accumulatedRewardsPerToken = 0;

        emit RewardsAllocated(poolId, totalRewards, rewardRate);
    }

    /**
     * @dev Updates the reward distribution for a specific isolated pool
     * @param poolId The ID of the isolated pool
     */
    function updatePoolRewards(bytes32 poolId) internal {
        IsolatedPoolRewards storage poolRewardData = poolRewards[poolId];
        uint256 totalCollateral = pool.getTotalCollateralInPool(poolId); // Custom function in Isolated Lending Pool

        if (totalCollateral > 0) {
            uint256 blocksPassed = block.number - poolRewardData.lastUpdated;
            uint256 newRewards = blocksPassed * poolRewardData.rewardRate;

            poolRewardData.accumulatedRewardsPerToken += (newRewards * 1e18) / totalCollateral;
        }

        poolRewardData.lastUpdated = block.number;
    }

    /**
     * @dev Calculates the claimable rewards for a user in a specific isolated pool
     * @param user The address of the user
     * @param poolId The ID of the isolated pool
     * @return claimableRewards The rewards the user can claim
     */
    function calculateClaimableRewards(address user, bytes32 poolId) public view returns (uint256 claimableRewards) {
        IsolatedPoolRewards storage poolRewardData = poolRewards[poolId];
        uint256 userCollateral = pool.getUserCollateralInPool(user, poolId); // Custom function in Isolated Lending Pool

        uint256 accumulatedReward = (userCollateral * poolRewardData.accumulatedRewardsPerToken) / 1e18;
        claimableRewards = accumulatedReward - userRewards[poolId][user];
    }

    /**
     * @dev Claims rewards for the user in a specific isolated pool
     * @param poolId The ID of the isolated pool
     */
    function claimRewards(bytes32 poolId) external {
        updatePoolRewards(poolId);

        uint256 claimable = calculateClaimableRewards(msg.sender, poolId);
        require(claimable > 0, "No rewards to claim");

        userRewards[poolId][msg.sender] += claimable;

        rewardToken.transfer(msg.sender, claimable);
        emit RewardClaimed(msg.sender, poolId, claimable);
    }

    /**
     * @dev Fetches total claimable rewards for a user across multiple isolated pools
     * @param user The address of the user
     * @param poolIds The list of isolated pool IDs
     * @return totalRewards The total claimable rewards across all pools
     */
    function getTotalClaimableRewards(address user, bytes32[] memory poolIds) external view returns (uint256 totalRewards) {
        totalRewards = 0;

        for (uint256 i = 0; i < poolIds.length; i++) {
            totalRewards += calculateClaimableRewards(user, poolIds[i]);
        }
    }

    /**
     * @dev Emergency withdrawal of rewards from the contract (onlyOwner)
     * This function can be used in case of unexpected issues with reward distribution.
     * @param amount The amount of reward tokens to withdraw
     */
    function emergencyWithdrawRewards(uint256 amount) external onlyOwner {
        rewardToken.transfer(msg.sender, amount);
    }
}
