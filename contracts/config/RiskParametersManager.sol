// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IPoolConfigurator.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract RiskParametersManager is Ownable {
    using SafeMath for uint256;

    IPool public pool;
    IPoolConfigurator public poolConfigurator;

    // Struct to hold risk parameters for each pool
    struct RiskParams {
        uint256 liquidationThreshold;
        uint256 liquidationBonus;
        uint256 reserveFactor;
        uint256 borrowCap;
        uint256 supplyCap;
    }

    // Mapping to store risk parameters for each pool
    mapping(address => RiskParams) public riskParams;

    // Events
    event RiskParametersUpdated(
        address indexed asset,
        uint256 liquidationThreshold,
        uint256 liquidationBonus,
        uint256 reserveFactor,
        uint256 borrowCap,
        uint256 supplyCap
    );

    constructor(address _pool, address _poolConfigurator) {
        pool = IPool(_pool);
        poolConfigurator = IPoolConfigurator(_poolConfigurator);
    }

    /**
     * @dev Updates the risk parameters for a specific asset/pool.
     * @param asset The address of the asset
     * @param liquidationThreshold The new liquidation threshold
     * @param liquidationBonus The new liquidation bonus
     * @param reserveFactor The new reserve factor
     * @param borrowCap The new borrow cap
     * @param supplyCap The new supply cap
     */
    function updateRiskParameters(
        address asset,
        uint256 liquidationThreshold,
        uint256 liquidationBonus,
        uint256 reserveFactor,
        uint256 borrowCap,
        uint256 supplyCap
    ) external onlyOwner {
        // Validate input parameters
        require(asset != address(0), "Invalid asset address");
        require(liquidationThreshold <= 1e18, "Invalid liquidation threshold");
        require(liquidationBonus <= 1e18, "Invalid liquidation bonus");
        require(reserveFactor <= 1e18, "Invalid reserve factor");

        // Update parameters in storage
        riskParams[asset] = RiskParams({
            liquidationThreshold: liquidationThreshold,
            liquidationBonus: liquidationBonus,
            reserveFactor: reserveFactor,
            borrowCap: borrowCap,
            supplyCap: supplyCap
        });

        // Apply updated parameters to the pool configurator
        poolConfigurator.setReserveParams(
            asset,
            liquidationThreshold,
            liquidationBonus,
            reserveFactor
        );

        // Set borrow and supply caps
        poolConfigurator.setReserveCaps(
            asset,
            borrowCap,
            supplyCap
        );

        emit RiskParametersUpdated(asset, liquidationThreshold, liquidationBonus, reserveFactor, borrowCap, supplyCap);
    }

    /**
     * @dev Returns the current risk parameters for a specific asset.
     * @param asset The address of the asset
     * @return The risk parameters
     */
    function getRiskParameters(address asset) external view returns (RiskParams memory) {
        return riskParams[asset];
    }

    /**
     * @dev Adjusts risk parameters based on pool performance. This is a placeholder function.
     * @param asset The address of the asset
     * @param performanceMetric A performance metric to adjust parameters (e.g., utilization ratio)
     */
    function adjustRiskParametersBasedOnPerformance(address asset, uint256 performanceMetric) external onlyOwner {
        // Example adjustment logic (this should be customized based on specific criteria)
        RiskParams storage params = riskParams[asset];

        if (performanceMetric > 80e16) { // Example threshold for high performance
            params.liquidationThreshold = params.liquidationThreshold.add(0.05e18); // Increase threshold
            params.liquidationBonus = params.liquidationBonus.sub(0.02e18); // Decrease bonus
        } else if (performanceMetric < 20e16) { // Example threshold for low performance
            params.liquidationThreshold = params.liquidationThreshold.sub(0.05e18); // Decrease threshold
            params.liquidationBonus = params.liquidationBonus.add(0.02e18); // Increase bonus
        }

        // Update parameters in the pool configurator
        poolConfigurator.setReserveParams(
            asset,
            params.liquidationThreshold,
            params.liquidationBonus,
            params.reserveFactor
        );

        emit RiskParametersUpdated(
            asset,
            params.liquidationThreshold,
            params.liquidationBonus,
            params.reserveFactor,
            params.borrowCap,
            params.supplyCap
        );
    }
}
