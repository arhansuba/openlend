// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IPoolConfigurator.sol";
import "@aave/core-v3/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@aave/core-v3/contracts/protocol/libraries/types/DataTypes.sol";
import "@aave/core-v3/contracts/libraries/math/Math.sol";

contract IsolatedLendingPool is Ownable {
    IPool public pool;
    IPoolConfigurator public poolConfigurator;

    struct IsolatedPool {
        address[] collateralAssets;
        uint256 totalCollateral;
        uint256 totalDebt;
        uint256 riskFactor; // Custom risk factor for the isolated pool
    }

    mapping(bytes32 => IsolatedPool) public isolatedPools; // Pool ID -> IsolatedPool
    mapping(address => mapping(bytes32 => uint256)) public userCollateral; // User -> Pool ID -> Collateral

    event IsolatedPoolCreated(bytes32 indexed poolId, address[] collateralAssets, uint256 riskFactor);
    event CollateralDeposited(address indexed user, bytes32 indexed poolId, address asset, uint256 amount);
    event CollateralWithdrawn(address indexed user, bytes32 indexed poolId, address asset, uint256 amount);
    event DebtBorrowed(address indexed user, bytes32 indexed poolId, uint256 amount);
    event DebtRepaid(address indexed user, bytes32 indexed poolId, uint256 amount);

    constructor(address _pool, address _poolConfigurator) {
        pool = IPool(_pool);
        poolConfigurator = IPoolConfigurator(_poolConfigurator);
    }

    /**
     * @dev Creates a new isolated lending pool
     * @param poolId The ID for the new isolated pool
     * @param collateralAssets The list of collateral assets for the pool
     * @param riskFactor Custom risk factor for the isolated pool
     */
    function createIsolatedPool(bytes32 poolId, address[] memory collateralAssets, uint256 riskFactor) external onlyOwner {
        require(isolatedPools[poolId].collateralAssets.length == 0, "Pool already exists");
        
        IsolatedPool memory newPool = IsolatedPool({
            collateralAssets: collateralAssets,
            totalCollateral: 0,
            totalDebt: 0,
            riskFactor: riskFactor
        });
        
        isolatedPools[poolId] = newPool;

        emit IsolatedPoolCreated(poolId, collateralAssets, riskFactor);
    }

    /**
     * @dev Deposits collateral into an isolated lending pool
     * @param poolId The ID of the pool
     * @param asset The address of the collateral asset
     * @param amount The amount of collateral to deposit
     */
    function depositCollateral(bytes32 poolId, address asset, uint256 amount) external {
        IsolatedPool storage poolInfo = isolatedPools[poolId];
        require(isValidCollateral(poolId, asset), "Invalid collateral asset");

        IERC20(asset).transferFrom(msg.sender, address(this), amount);
        userCollateral[msg.sender][poolId] += amount;
        poolInfo.totalCollateral += amount;

        emit CollateralDeposited(msg.sender, poolId, asset, amount);
    }

    /**
     * @dev Withdraws collateral from an isolated lending pool
     * @param poolId The ID of the pool
     * @param asset The address of the collateral asset
     * @param amount The amount of collateral to withdraw
     */
    function withdrawCollateral(bytes32 poolId, address asset, uint256 amount) external {
        IsolatedPool storage poolInfo = isolatedPools[poolId];
        require(userCollateral[msg.sender][poolId] >= amount, "Insufficient collateral");

        userCollateral[msg.sender][poolId] -= amount;
        poolInfo.totalCollateral -= amount;

        IERC20(asset).transfer(msg.sender, amount);

        emit CollateralWithdrawn(msg.sender, poolId, asset, amount);
    }

    /**
     * @dev Allows users to borrow against their collateral in an isolated pool
     * @param poolId The ID of the pool
     * @param amount The amount of debt to borrow
     */
    function borrowDebt(bytes32 poolId, uint256 amount) external {
        IsolatedPool storage poolInfo = isolatedPools[poolId];
        uint256 collateralValue = getCollateralValue(msg.sender, poolId);
        require(collateralValue * poolInfo.riskFactor >= poolInfo.totalDebt + amount, "Insufficient collateral");

        poolInfo.totalDebt += amount;
        pool.borrow(address(this), amount, msg.sender);

        emit DebtBorrowed(msg.sender, poolId, amount);
    }

    /**
     * @dev Allows users to repay borrowed debt in an isolated pool
     * @param poolId The ID of the pool
     * @param amount The amount of debt to repay
     */
    function repayDebt(bytes32 poolId, uint256 amount) external {
        IsolatedPool storage poolInfo = isolatedPools[poolId];
        require(poolInfo.totalDebt >= amount, "Repaying more than the debt");

        poolInfo.totalDebt -= amount;
        pool.repay(address(this), amount, msg.sender);

        emit DebtRepaid(msg.sender, poolId, amount);
    }

    /**
     * @dev Checks if the asset is valid collateral for a specific pool
     * @param poolId The ID of the pool
     * @param asset The collateral asset to check
     */
    function isValidCollateral(bytes32 poolId, address asset) public view returns (bool) {
        IsolatedPool storage poolInfo = isolatedPools[poolId];
        for (uint256 i = 0; i < poolInfo.collateralAssets.length; i++) {
            if (poolInfo.collateralAssets[i] == asset) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Calculates the total value of the user's collateral in the isolated pool
     * @param user The address of the user
     * @param poolId The ID of the isolated pool
     */
    function getCollateralValue(address user, bytes32 poolId) public view returns (uint256) {
        IsolatedPool storage poolInfo = isolatedPools[poolId];
        uint256 totalValue = 0;

        for (uint256 i = 0; i < poolInfo.collateralAssets.length; i++) {
            address asset = poolInfo.collateralAssets[i];
            uint256 collateralAmount = userCollateral[user][poolId];
            totalValue += getAssetValue(asset, collateralAmount);
        }

        return totalValue;
    }

    /**
     * @dev Fetches the value of an asset (placeholder function, replace with actual price oracle logic)
     * @param asset The address of the asset
     * @param amount The amount of the asset
     */
    function getAssetValue(address asset, uint256 amount) internal pure returns (uint256) {
        // Placeholder logic: Assume 1-to-1 value for all assets. Replace with price oracle logic.
        return amount;
    }
}
