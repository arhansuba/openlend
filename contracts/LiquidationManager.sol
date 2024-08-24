// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IPoolConfigurator.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract LiquidationManager is Ownable {
    using SafeMath for uint256;

    IPool public pool;
    IPoolConfigurator public poolConfigurator;
    
    // Mapping to track the efficiency mode status of users
    mapping(address => bool) public isEfficiencyModeActive;

    // Event emitted when a liquidation occurs
    event LiquidationExecuted(address indexed user, address indexed asset, uint256 amountLiquidated);

    constructor(address _pool, address _poolConfigurator) {
        pool = IPool(_pool);
        poolConfigurator = IPoolConfigurator(_poolConfigurator);
    }

    /**
     * @dev Executes liquidation of a user’s collateral if their health factor falls below the threshold
     * @param user The address of the user to be liquidated
     * @param asset The address of the asset to be liquidated
     * @param amount The amount of asset to liquidate
     */
    function executeLiquidation(address user, address asset, uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than zero");
        
        // Check the health factor of the user
        uint256 healthFactor = pool.getUserHealthFactor(user);
        require(healthFactor < 1e18, "User's health factor is sufficient");

        // Determine the collateral to be liquidated
        (uint256 userCollateralBalance, ) = pool.getUserReserveData(asset, user);
        require(userCollateralBalance >= amount, "Insufficient collateral balance");

        // Liquidate the user's collateral
        pool.liquidateBorrow(user, asset, amount);
        
        emit LiquidationExecuted(user, asset, amount);
    }

    /**
     * @dev Activates efficiency mode for a user, allowing them to be liquidated under efficiency mode rules
     * @param user The address of the user
     */
    function activateEfficiencyMode(address user) external onlyOwner {
        isEfficiencyModeActive[user] = true;
    }

    /**
     * @dev Deactivates efficiency mode for a user, reverting liquidation rules to standard mode
     * @param user The address of the user
     */
    function deactivateEfficiencyMode(address user) external onlyOwner {
        isEfficiencyModeActive[user] = false;
    }

    /**
     * @dev Calculates and returns the collateral liquidation threshold for a user
     * @param user The address of the user
     * @param asset The address of the asset
     * @return liquidationThreshold The collateral liquidation threshold
     */
    function getLiquidationThreshold(address user, address asset) public view returns (uint256 liquidationThreshold) {
        uint256 healthFactor = pool.getUserHealthFactor(user);
        if (isEfficiencyModeActive[user]) {
            // Apply custom threshold logic for efficiency mode
            liquidationThreshold = healthFactor.mul(90).div(100); // Example: reduce the threshold by 10%
        } else {
            // Standard threshold
            liquidationThreshold = healthFactor;
        }
    }

    /**
     * @dev Manually adjusts the liquidation parameters for a specific asset
     * @param asset The address of the asset
     * @param newLiquidationThreshold The new liquidation threshold
     */
    function adjustLiquidationParameters(address asset, uint256 newLiquidationThreshold) external onlyOwner {
        // Example implementation
        poolConfigurator.setLiquidationThreshold(asset, newLiquidationThreshold);
    }
}
